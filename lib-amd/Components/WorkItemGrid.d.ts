/// <reference types="react" />
import "./WorkItemsGrid.scss";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
import { GridColumn, IContextMenuProps } from "./Grid";
import { BaseStore } from "../Flux/Stores/BaseStore";
export interface BaseWorkItemGridProps extends IBaseComponentProps {
    extraColumns?: IExtraWorkItemGridColumn[];
    selectionMode?: SelectionMode;
    contextMenuProps?: IContextMenuProps;
    noResultsText?: string;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
    compact?: boolean;
}
export interface IWorkItemGridProps extends BaseWorkItemGridProps {
    workItemIds: number[];
    fieldRefNames: string[];
}
export interface IWorkItemGridState extends IBaseComponentState {
    workItems: WorkItem[];
    fieldsMap: IDictionaryStringTo<WorkItemField>;
}
export interface IExtraWorkItemGridColumn {
    column: GridColumn;
    position?: ColumnPosition;
}
export declare enum ColumnPosition {
    FarLeft = 0,
    FarRight = 1,
}
export declare class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    private _workItemStore;
    private _workItemFieldStore;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IWorkItemGridProps): void;
    protected getStores(): BaseStore<any, any, any>[];
    protected getStoresState(): IWorkItemGridState;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _itemFilter(workItem, filterText, field);
    private _mapFieldsToColumn();
    private _getContextMenuProps();
    private _onItemInvoked(workItem, _index?, ev?);
    private _itemComparer(workItem1, workItem2, field, sortOrder);
    private _getWiql(workItems?);
}
