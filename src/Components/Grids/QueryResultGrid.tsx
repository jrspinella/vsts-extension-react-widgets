import * as React from "react";

import * as WitClient from "TFS/WorkItemTracking/RestClient";
import { WorkItem } from "TFS/WorkItemTracking/Contracts";

import { StringUtils } from "../../Utils/String";
import { Loading } from "../Loading";
import { BaseComponent, IBaseComponentState } from "../BaseComponent"; 
import { IGridProps } from "./Grid";
import { WorkItemGrid, IExtraWorkItemGridColumn } from "./WorkItemGrid";
import { WorkItemActions } from "../../Flux/Actions/WorkItemActions";

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

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    public componentDidMount() {
        super.componentDidMount();
        this._runQuery(this.props);
    }

    protected getDefaultClassName(): string {
        return "query-results-grid";
    }

    public componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void {
        if (!StringUtils.equals(this.props.wiql, nextProps.wiql, true) || 
            !StringUtils.equals(this.props.project, nextProps.project, true) || 
            this.props.top !== nextProps.top ||
            this.props.queryKey !== nextProps.queryKey) {

            this._runQuery(nextProps);
        }
    }

    public render(): JSX.Element {
        if (this.state.workItemIds == null || this.state.fieldRefNames == null) {
            return <Loading />;
        }
        else {    
            const props: any = {
                ...this.props,
                className: this.getClassName(),
                workItemIds: this.state.workItemIds,
                items: null,
                fieldRefNames: this.state.fieldRefNames,
                noResultsText: this.props.noResultsText ||  "Query returned no results."
            };

            return <WorkItemGrid {...props} />;
        }
    }

    private async _runQuery(props: IQueryResultGridProps) {
        this.setState({workItemIds: null, fieldRefNames: null});

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        await WorkItemActions.refreshWorkItems(workItemIds);
        
        this.setState({workItemIds: workItemIds, fieldRefNames: queryResult.columns.map(fr => fr.referenceName)});
    }    
}