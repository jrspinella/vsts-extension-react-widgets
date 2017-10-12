/// <reference types="react" />
import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import { BaseComponent, IBaseComponentState } from "../BaseComponent";
import { IGridProps } from "./Grid";
import { IExtraWorkItemGridColumn } from "./WorkItemGrid";
export interface IQueryResultGridProps extends IGridProps<WorkItem> {
    wiql: string;
    top?: number;
    project?: string;
    queryKey?: number;
    extraColumns?: IExtraWorkItemGridColumn[];
}
export interface IQueryResultGridState extends IBaseComponentState {
    workItemIds: number[];
    fieldRefNames: string[];
}
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    componentDidMount(): void;
    protected getDefaultClassName(): string;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void;
    render(): JSX.Element;
    private _runQuery(props);
}
