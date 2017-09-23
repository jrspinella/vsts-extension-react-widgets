/// <reference types="react" />
import "./Grid.scss";
import { SelectionMode, ISelection } from "OfficeFabric/utilities/selection";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
export interface IGridProps<TItem> extends IBaseComponentProps {
    items: TItem[];
    columns: GridColumn<TItem>[];
    noResultsText?: string;
    selectionMode?: SelectionMode;
    getContextMenuItems?: (selectedItems: TItem[]) => IContextualMenuItem[];
    onItemInvoked?: (item: TItem, index: number) => void;
    setKey?: string;
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
    onRenderCell?: (item?: TItem, index?: number) => JSX.Element;
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
    private _onItemInvoked(item, index);
    private _prepareColumns();
    private _onColumnHeaderClick(column);
    private _showContextMenu(_item?, index?, e?);
    private _hideContextMenu();
    private _sortItems(items, sortColumn, sortOrder);
}
