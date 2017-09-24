import "./Grid.scss";

import * as React from "react";

import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility, ConstrainMode } from "OfficeFabric/DetailsList";
import { Selection, SelectionMode, ISelection } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { MessageBar, MessageBarType } from "OfficeFabric/MessageBar";

import { StringUtils } from "../Utils/String";
import { CoreUtils } from "../Utils/Core";
import { UIActions } from "../Flux/Actions/UIActions";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent"; 

export interface IGridProps<TItem> extends IBaseComponentProps {
    items: TItem[];
    columns: GridColumn<TItem>[];
    noResultsText?: string;
    selectionMode?: SelectionMode;
    getContextMenuItems?: (selectedItems: TItem[]) => IContextualMenuItem[];
    onItemInvoked?: (item: TItem, index: number) => void;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
    compact?: boolean;
    getKey?: (item: TItem, index?: number) => string;
    selection?: ISelection;
}

export interface IGridState<TItem> extends IBaseComponentState {
    items?: TItem[];
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: GridColumn<TItem>;
    sortOrder?: SortOrder;
}

export interface GridColumn<TItem> {
    key: string;
    name: string;
    minWidth: number;
    maxWidth?: number;
    resizable?: boolean;
    comparer?: (item1: TItem, item2: TItem, sortOrder: SortOrder) => number;
    filterFunction?: (item: TItem, filterText: string) => boolean;
    onRenderCell?: (item?: TItem, index?: number) => JSX.Element;
}

export enum SortOrder {
    ASC,
    DESC
}

export class Grid<TItem> extends BaseComponent<IGridProps<TItem>, IGridState<TItem>> {
    private _selection: ISelection;
    private _delayedFunction: CoreUtils.DelayedFunction;

    constructor(props: IGridProps<TItem>, context?: any) {
        super(props, context);
        this._selection = props.selection || new Selection();
    }    

    protected initializeState() {
        this.state = {
            items: this._sortAndFilterItems(this.props.items, this.props.columns, null, SortOrder.ASC, this.props.filterText),
            sortColumn: null,
            sortOrder: SortOrder.ASC
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IGridProps<TItem>>): void {        
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
                {this.state.isContextMenuVisible && this.props.getContextMenuItems && (
                    <ContextualMenu
                        className="context-menu"
                        items={this.props.getContextMenuItems(this._selection.getSelection() as TItem[])}
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
                    getKey={this.props.getKey}
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
                    compact={this.props.compact}
                />
            </div>;
        }
    }

    @autobind
    private _onItemInvoked(item: TItem, index: number) {
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
                onRender: (item?: TItem, index?: number) => column.onRenderCell(item, index),
                isSorted: column.comparer && this.state.sortColumn && StringUtils.equals(this.state.sortColumn.key, column.key, true),
                isSortedDescending: column.comparer && this.state.sortOrder === SortOrder.DESC,
                onColumnClick: () => this._onColumnHeaderClick(column)
            }
        });
    }

    @autobind
    private _onColumnHeaderClick(column: GridColumn<TItem>) {
        if (column.comparer) {
            const sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
            const sortedItems = this._sortAndFilterItems(this.state.items, this.props.columns, column, sortOrder);
            this.updateState({sortColumn: column, sortOrder: sortOrder, items: sortedItems});
        }
    }

    @autobind
    private _showContextMenu(_item?: TItem, index?: number, e?: MouseEvent) {
        if (this.props.getContextMenuItems) {
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

    private _sortAndFilterItems(items: TItem[], columns: GridColumn<TItem>[], sortColumn: GridColumn<TItem>, sortOrder: SortOrder, filterText?: string): TItem[] {
        let filteredItems = (items || []).slice();
        if (filterText != null && filterText.trim() !== "") {		
            filteredItems = filteredItems.filter((item: TItem) => {		
                for (let column of columns) {		
                    if (column.filterFunction && column.filterFunction(item, filterText)) {		
                        return true;		
                    }		
                }		
        
                return false;		
            });		
        }		
                            
        if (sortColumn && sortColumn.comparer) {
            filteredItems.sort((item1: TItem, item2: TItem) => sortColumn.comparer(item1, item2, sortOrder));
        }
            
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
        this._delayedFunction = CoreUtils.delay(this, 10, () => {
            UIActions.onGridItemCountChanged(filteredItems.length);
        })
        
        return filteredItems;
    }
}