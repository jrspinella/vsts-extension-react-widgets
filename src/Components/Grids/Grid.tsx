import "./Grid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { CommandBar } from "OfficeFabric/CommandBar";
import { SearchBox } from "OfficeFabric/SearchBox";

import Utils_String = require("VSS/Utils/String");

import { MessagePanel, MessageType } from "../Common/MessagePanel";
import { BaseComponent } from "../Common/BaseComponent"; 
import { IGridProps, IGridState, SortOrder, GridColumn } from "./Grid.Props";

export abstract class Grid extends BaseComponent<IGridProps, IGridState> {
    private _selection: Selection;
    private _searchTimeout: any

    constructor(props: IGridProps, context?: any) {
        super(props, context);
        this._selection = new Selection({
            onSelectionChanged: () => {
                if (props.events && props.events.onSelectionChanged) {
                    props.events.onSelectionChanged(this._selection.getSelection());
                }
            }
        });
    }    

    protected initializeState() {
        this.state = {
            filteredItems: this.props.items.slice(),
            sortColumn: null,
            sortOrder: SortOrder.ASC,
            filterText: ""
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IGridProps>, nextContext: any): void {
        this.updateState({
            filteredItems: this._sortAndFilterWorkItems(nextProps.items, this.state.sortColumn, this.state.sortOrder, this.state.filterText),
            isContextMenuVisible: false,
            contextMenuTarget: null
        })
    }

    protected getDefaultClassName(): string {
        return "base-grid";
    }

    public render(): JSX.Element {
        return (
            <div className={this.getClassName()}>
                {this._renderCommandBar()}
                {this._renderGrid()}
                {this.state.isContextMenuVisible && this.props.contextMenuProps && this.props.contextMenuProps.menuItems && (
                    <ContextualMenu
                        className="context-menu"
                        items={this.props.contextMenuProps.menuItems(this._selection.getSelection())}
                        target={this.state.contextMenuTarget}
                        shouldFocusOnMount={true}
                        onDismiss={this._hideContextMenu}
                    />
                )}
            </div>
        );
    }

    private _renderCommandBar(): JSX.Element {
        if (!this.props.commandBarProps || (this.props.commandBarProps.hideSearchBox && this.props.commandBarProps.hideCommandBar)) {
            return null;
        }

        return (
            <div className="menu-bar-container">
                {!this.props.commandBarProps.hideSearchBox && (
                    <SearchBox 
                        className="searchbox"
                        value={this.state.filterText || ""}
                        onSearch={this._updateFilterText}
                        onChange={this._updateFilterText} />
                )}

                {!this.props.commandBarProps.hideCommandBar && (
                    <CommandBar 
                        className="menu-bar"
                        items={this.props.commandBarProps.menuItems || []} 
                        farItems={this._getFarCommandMenuItems()} />
                )}
            </div>
        );
    }

    private _getFarCommandMenuItems(): IContextualMenuItem[] {
        let menuItems: IContextualMenuItem[] = [
            {
                key: "resultCount", 
                name: `${this.state.filteredItems.length} results`, 
                className: "result-count"
            }
        ];

        if (this.props.commandBarProps && this.props.commandBarProps.farMenuItems && this.props.commandBarProps.farMenuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.farMenuItems);
        }

        return menuItems;
    }

    private _renderGrid(): JSX.Element {
        if (this.state.filteredItems.length === 0) {
            return <MessagePanel messageType={MessageType.Info} message={this.props.noResultsText || "No results."} />
        }
        else {
            return <div className="grid-container">
                <DetailsList 
                    setKey={this.props.setKey}
                    selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.horizontalConstrained}
                    selectionMode={this.props.selectionMode || SelectionMode.multiple}
                    isHeaderVisible={true}
                    checkboxVisibility={this.props.selectionMode === SelectionMode.none ? CheckboxVisibility.hidden : CheckboxVisibility.onHover}
                    columns={this._prepareColumns()}
                    items={this.state.filteredItems}
                    className="grid-list"
                    onItemInvoked={this._onItemInvoked}
                    selection={this._selection}
                    onItemContextMenu={this._showContextMenu}
                />
            </div>;
        }
    }

    @autobind
    private _onItemInvoked(item: any, index: number) {
        if (this.props.onItemInvoked) {
            this.props.onItemInvoked(item, index);
        }
    }

    private _prepareColumns(): IColumn[] {
        return this.props.columns.map(column => {
            return {
                key: column.key,
                fieldName: column.key,
                name: column.name,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                isResizable: column.resizable,
                onRender: (item?: any, index?: number) => column.onRenderCell(item, index),
                isSorted: column.sortFunction && this.state.sortColumn && Utils_String.equals(this.state.sortColumn.key, column.key, true),
                isSortedDescending: column.sortFunction && this.state.sortOrder === SortOrder.DESC,
                onColumnClick: () => this._onColumnHeaderClick(column)
            }
        });
    }

    @autobind
    private _onColumnHeaderClick(column: GridColumn) {
        if (column.sortFunction) {
            const sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
            const filteredItems = this._sortAndFilterWorkItems(this.props.items, column, sortOrder, this.state.filterText);
            this.updateState({sortColumn: column, sortOrder: sortOrder, filteredItems: filteredItems});

            if (this.props.events && this.props.events.onSearch) {
                this.props.events.onSort(column, sortOrder, filteredItems);
            }
        }
    }

    @autobind
    private _updateFilterText(filterText: string): void {
        if (this._searchTimeout) {
            clearTimeout(this._searchTimeout);
            this._searchTimeout = null;
        }

        this._searchTimeout = setTimeout(() => {
            this._searchTimeout = null;
            const filteredItems = this._sortAndFilterWorkItems(this.props.items, this.state.sortColumn, this.state.sortOrder, filterText);
            this.updateState({filterText: filterText, filteredItems: filteredItems});

            if (this.props.events && this.props.events.onSearch) {
                this.props.events.onSearch(filterText, filteredItems);
            }
        }, 200)
    }

    @autobind
    private _showContextMenu(item?: any, index?: number, e?: MouseEvent) {
        if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
            if (!this._selection.isIndexSelected(index)) {
                // if not already selected, unselect every other row and select this one
                this._selection.setAllSelected(false);
                this._selection.setIndexSelected(index, true, true);
            }        
            this.updateState({contextMenuTarget: e, isContextMenuVisible: true});
        }
    }

    @autobind
    private _hideContextMenu() {
        this.updateState({contextMenuTarget: null, isContextMenuVisible: false});
    }

    private _sortAndFilterWorkItems(items: any[], sortColumn: GridColumn, sortOrder: SortOrder, filterText: string): any[] {
        let filteredItems = (items || []).slice();
        if (sortColumn && sortColumn.sortFunction) {
            filteredItems = filteredItems.sort((item1: any, item2: any) => sortColumn.sortFunction(item1, item2, sortOrder));
        }

        if (filterText == null || filterText.trim() === "") {
            return filteredItems;
        }
        else {
            return filteredItems.filter((item: any) => {
                for (let column of this.props.columns) {
                    if (column.filterFunction && column.filterFunction(item, filterText)) {
                        return true;
                    }
                }

                return false;
            });
        }
    }
}