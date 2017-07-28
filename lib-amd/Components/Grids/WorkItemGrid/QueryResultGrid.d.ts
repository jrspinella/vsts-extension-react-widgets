/// <reference types="react" />
import { BaseComponent } from "../../Common/BaseComponent";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare module QueryResultGridEvents {
    var RefreshQueryInGrid: string;
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
