/// <reference types="react" />
import "./Grid.scss";
import { IDetailsListProps, IColumn } from "OfficeFabric/DetailsList";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { BaseComponent, IBaseComponentState } from "./BaseComponent";
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
export declare enum SortOrder {
    ASC = 0,
    DESC = 1,
}
export declare class Grid<TItem> extends BaseComponent<IGridProps<TItem>, IGridState<TItem>> {
    private _selection;
    constructor(props: IGridProps<TItem>, context?: any);
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: Readonly<IGridProps<TItem>>): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _renderGrid();
    private _prepareColumns();
    private _onColumnHeaderClick(column);
    private _showContextMenu(_item?, index?, e?);
    private _hideContextMenu();
    private _sortItems(items, sortColumn, sortOrder);
}
