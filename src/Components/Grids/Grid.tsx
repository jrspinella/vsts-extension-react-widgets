import "./Grid.scss";

import * as React from "react";

import { DetailsList, IDetailsListProps, IColumn } from "OfficeFabric/DetailsList";
import { Selection, ISelection } from "OfficeFabric/utilities/selection";
import { autobind } from "OfficeFabric/Utilities";
import { ContextualMenu, IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { MessageBar, MessageBarType } from "OfficeFabric/MessageBar";

import { StringUtils } from "../../Utils/String";
import { BaseComponent, IBaseComponentState } from "../BaseComponent"; 

export interface IGridProps<TItem> extends IDetailsListProps {
    items: TItem[];
    columns?: IGridColumn<TItem>[];
    noResultsText?: string;
    getContextMenuItems?: (selectedItems: TItem[]) => IContextualMenuItem[];
}

export interface IGridState<TItem> extends IBaseComponentState {
    items?: TItem[];
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: IGridColumn<TItem>;
    sortOrder?: SortOrder;
}

export interface IGridColumn<TItem> extends IColumn {    
    comparer?: (item1: TItem, item2: TItem, sortOrder: SortOrder) => number;
}

export enum SortOrder {
    ASC,
    DESC
}

export class Grid<TItem> extends BaseComponent<IGridProps<TItem>, IGridState<TItem>> {
    private _selection: ISelection;

    constructor(props: IGridProps<TItem>, context?: any) {
        super(props, context);
        this._selection = props.selection || new Selection();
    }    

    protected initializeState() {
        this.state = {
            items: this._sortItems(this.props.items, null, SortOrder.ASC),
            sortColumn: null,
            sortOrder: SortOrder.ASC
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IGridProps<TItem>>): void {        
        this.setState({
            items: this._sortItems(nextProps.items, this.state.sortColumn, this.state.sortOrder),
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
        const overrideProps: IDetailsListProps = {
            columns: this._prepareColumns(),
            items: this.state.items,
            className: "grid-list",
            selection: this._selection,
            onItemContextMenu: this._showContextMenu
        };

        const props: IDetailsListProps = {...this.props as IDetailsListProps, ...overrideProps};

        if (this.state.items.length === 0) {
            return <MessageBar className="grid-message-bar" messageBarType={MessageBarType.info}>
                {this.props.noResultsText || "No results."}
            </MessageBar>;
        }
        else {
            return <div className="grid-container">
                <DetailsList {...props} />
            </div>;
        }
    }

    private _prepareColumns(): IColumn[] {
        return this.props.columns.map(column => {
            return {
                ...column as IColumn,
                isSorted: column.comparer && this.state.sortColumn && StringUtils.equals(this.state.sortColumn.key, column.key, true),
                isSortedDescending: column.comparer && this.state.sortOrder === SortOrder.DESC,
                onColumnClick: () => {
                    this._onColumnHeaderClick(column);

                    if (column.onColumnClick) {
                        column.onColumnClick();
                    }
                }
            } as IColumn;
        });
    }

    @autobind
    private _onColumnHeaderClick(column: IGridColumn<TItem>) {
        if (column.comparer) {
            const sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
            const sortedItems = this._sortItems(this.state.items, column, sortOrder);
            this.setState({sortColumn: column, sortOrder: sortOrder, items: sortedItems});
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
            this.setState({contextMenuTarget: e, isContextMenuVisible: true});
        }
    }

    @autobind
    private _hideContextMenu() {
        this.setState({contextMenuTarget: null, isContextMenuVisible: false});
    }

    private _sortItems(items: TItem[], sortColumn: IGridColumn<TItem>, sortOrder: SortOrder): TItem[] {
        let sortedItems = (items || []).slice();
         
        if (sortColumn && sortColumn.comparer) {
            sortedItems.sort((item1: TItem, item2: TItem) => sortColumn.comparer(item1, item2, sortOrder));
        }
        
        return sortedItems;
    }
}