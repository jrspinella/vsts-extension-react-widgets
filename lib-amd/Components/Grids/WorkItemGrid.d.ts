/// <reference types="react" />
import "./WorkItemsGrid.scss";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { BaseComponent, IBaseComponentState } from "../BaseComponent";
import { IGridColumn, IGridProps } from "./Grid";
import { BaseStore } from "../../Flux/Stores/BaseStore";
export interface IWorkItemGridProps extends IGridProps<WorkItem> {
    workItemIds?: number[];
    fieldRefNames?: string[];
    extraColumns?: IExtraWorkItemGridColumn[];
}
export interface IWorkItemGridState extends IBaseComponentState {
    workItems: WorkItem[];
    fieldsMap: IDictionaryStringTo<WorkItemField>;
}
export interface IExtraWorkItemGridColumn {
    column: IGridColumn<WorkItem>;
    position?: ColumnPosition;
}
export declare enum ColumnPosition {
    FarLeft = 0,
    FarRight = 1,
}
export declare class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    private _workItemStore;
    private _workItemFieldStore;
    protected initializeState(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IWorkItemGridProps): void;
    protected getStores(): BaseStore<any, any, any>[];
    protected getStoresState(): IWorkItemGridState;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _mapFieldRefNamesToColumn();
    private _getContextMenuItems(selectedWorkItems);
    private _onItemInvoked(workItem, ev?);
    private _getWiql(workItems?);
}
