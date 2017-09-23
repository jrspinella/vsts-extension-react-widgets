/// <reference types="react" />
import "./WorkItemsGrid.scss";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
import { GridColumn } from "./Grid";
import { BaseStore } from "../Flux/Stores/BaseStore";
export interface BaseWorkItemGridProps extends IBaseComponentProps {
    extraColumns?: IExtraWorkItemGridColumn[];
    selectionMode?: SelectionMode;
    getContextMenuItems?: (selectedItems: WorkItem[]) => IContextualMenuItem[];
    noResultsText?: string;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
    compact?: boolean;
}
export interface IWorkItemGridProps extends BaseWorkItemGridProps {
    workItemIds?: number[];
    workItems?: WorkItem[];
    fieldRefNames: string[];
}
export interface IWorkItemGridState extends IBaseComponentState {
    workItems: WorkItem[];
    fieldsMap: IDictionaryStringTo<WorkItemField>;
}
export interface IExtraWorkItemGridColumn {
    column: GridColumn<WorkItem>;
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
    private _filterItems(workItems, filterText, fieldRefNames);
    private _mapFieldsToColumn();
    private _getContextMenuItems(selectedWorkItems);
    private _onItemInvoked(workItem, _index?, ev?);
    private _getWiql(workItems?);
}
