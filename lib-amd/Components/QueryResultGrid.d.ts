/// <reference types="react" />
import { BaseComponent, IBaseComponentState } from "./BaseComponent";
import { BaseWorkItemGridProps } from "./WorkItemGrid";
export interface IQueryResultGridProps extends BaseWorkItemGridProps {
    wiql: string;
    top?: number;
    project?: string;
}
export interface IQueryResultGridState extends IBaseComponentState {
    workItemIds: number[];
    fieldRefNames: string[];
}
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    componentDidMount(): void;
    protected getDefaultClassName(): string;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _refreshQuery();
    private _runQuery(props);
}
