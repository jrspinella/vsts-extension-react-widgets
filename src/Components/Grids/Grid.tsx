import "./Grid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu } from "OfficeFabric/ContextualMenu";
import { MessageBar, MessageBarType } from "OfficeFabric/MessageBar";

import Utils_String = require("VSS/Utils/String");

import { BaseComponent } from "../Common/BaseComponent"; 
import { IGridProps, IGridState, SortOrder, GridColumn } from "./Grid.Props";

export abstract class Grid extends BaseComponent<IGridProps, IGridState> {
    private _selection: Selection;

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
            items: this._sortAndFilterItems(this.props.items, this.props.columns, null, SortOrder.ASC, this.props.filterText),
            sortColumn: null,
            sortOrder: SortOrder.ASC
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IGridProps>): void {
        this.updateState({
            items: this._sortAndFilterItems(nextProps.items, nextProps.columns, this.state.sortColumn, this.state.sortOrder, nextProps.filterText),
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

    private _renderGrid(): JSX.Element {
        if (this.state.items.length === 0) {
            return <MessageBar className="grid-message-bar" messageBarType={MessageBarType.info}>
                {this.props.noResultsText || "No results."}
            </MessageBar>;
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
                    items={this.state.items}
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
            const sortedItems = this._sortAndFilterItems(this.state.items, this.props.columns, column, sortOrder);
            this.updateState({sortColumn: column, sortOrder: sortOrder, items: sortedItems});
        }
    }

    @autobind
    private _showContextMenu(_item?: any, index?: number, e?: MouseEvent) {
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

    private _sortAndFilterItems(items: any[], columns: GridColumn[], sortColumn: GridColumn, sortOrder: SortOrder, filterText?: string): any[] {
        let filteredItems = (items || []).slice();
        if (filterText != null && filterText.trim() !== "") {
            filteredItems = filteredItems.filter((item: any) => {
                for (let column of columns) {
                    if (column.filterFunction && column.filterFunction(item, filterText)) {
                        return true;
                    }
                }
 
                return false;
            });
        }
        
        if (sortColumn && sortColumn.sortFunction) {
            filteredItems = filteredItems.sort((item1: any, item2: any) => sortColumn.sortFunction(item1, item2, sortOrder));
        }

        return filteredItems;
    }
}