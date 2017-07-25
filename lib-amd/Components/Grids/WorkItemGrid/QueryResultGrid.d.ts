/// <reference types="react" />
import { BaseComponent } from "../../Common/BaseComponent";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
export declare class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    componentDidMount(): void;
    protected getDefaultClassName(): string;
    componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void;
    render(): JSX.Element;
    private _getCommandBarProps();
    private _runQuery(props);
    private _isDataLoaded();
}
