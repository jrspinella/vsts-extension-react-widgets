/// <reference types="react" />
import "./Grid.scss";
import { BaseComponent } from "../Common/BaseComponent";
import { IGridProps, IGridState } from "./Grid.Props";
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
    private _sortItems(items, sortColumn, sortOrder);
}
