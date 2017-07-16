/// <reference types="react" />
import "./Grid.scss";
import { BaseComponent } from "../Common/BaseComponent";
import { IGridProps, IGridState } from "./Grid.Props";
export declare abstract class Grid extends BaseComponent<IGridProps, IGridState> {
    private _selection;
    private _searchTimeout;
    constructor(props: IGridProps, context?: any);
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: Readonly<IGridProps>, nextContext: any): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _renderCommandBar();
    private _getFarCommandMenuItems();
    private _renderGrid();
    private _onItemInvoked(item, index);
    private _prepareColumns();
    private _onColumnHeaderClick(column);
    private _updateFilterText(filterText);
    private _showContextMenu(item?, index?, e?);
    private _hideContextMenu();
    private _sortAndFilterWorkItems(items, sortColumn, sortOrder, filterText);
}
