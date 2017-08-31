/// <reference types="react" />
import "./Grid.scss";
import { SelectionMode } from "OfficeFabric/utilities/selection";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
export interface IGridProps extends IBaseComponentProps {
    items: any[];
    columns: GridColumn[];
    noResultsText?: string;
    selectionMode?: SelectionMode;
    contextMenuProps?: IContextMenuProps;
    onItemInvoked?: (item: any, index: number) => void;
    events?: IGridEvents;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
    compact?: boolean;
}
export interface IGridState extends IBaseComponentState {
    items?: any[];
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: GridColumn;
    sortOrder?: SortOrder;
}
export interface GridColumn {
    key: string;
    name: string;
    minWidth: number;
    maxWidth?: number;
    resizable?: boolean;
    sortFunction?: (item1: any, item2: any, sortOrder: SortOrder) => number;
    filterFunction?: (item: any, filterText: string) => boolean;
    onRenderCell?: (item?: any, index?: number) => JSX.Element;
    data?: any;
}
export interface IContextMenuProps {
    menuItems?: (selectedItems: any[]) => IContextualMenuItem[];
}
export interface IGridEvents {
    onSelectionChanged?: (selectedItems: any[]) => void;
}
export declare enum SortOrder {
    ASC = 0,
    DESC = 1,
}
export declare abstract class Grid extends BaseComponent<IGridProps, IGridState> {
    private _selection;
    constructor(props: IGridProps, context?: any);
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: Readonly<IGridProps>): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _renderGrid();
    private _onItemInvoked(item, index);
    private _prepareColumns();
    private _onColumnHeaderClick(column);
    private _showContextMenu(_item?, index?, e?);
    private _hideContextMenu();
    private _sortAndFilterItems(items, columns, sortColumn, sortOrder, filterText?);
}
