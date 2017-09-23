import * as React from "react";

import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { autobind } from "OfficeFabric/Utilities";

import { StringUtils } from "../Utils/String";
import { Loading } from "./Loading";
import { BaseComponent, IBaseComponentState } from "./BaseComponent"; 
import { WorkItemGrid, BaseWorkItemGridProps } from "./WorkItemGrid";
import { UIActionsHub } from ".././Flux/Actions/ActionsHub";

export interface IQueryResultGridProps extends BaseWorkItemGridProps {
    wiql: string;
    top?: number;
    project?: string;
}

export interface IQueryResultGridState extends IBaseComponentState {
    workItemIds: number[]; 
    fieldRefNames: string[]; 
}


export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    public componentDidMount() {
        super.componentDidMount();
        this._runQuery(this.props);

        UIActionsHub.RefreshQueryInGrid.addListener(this._refreshQuery);
    }

    protected getDefaultClassName(): string {
        return "query-results-grid";
    }

    public componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void {
        if (!StringUtils.equals(this.props.wiql, nextProps.wiql, true) || 
            !StringUtils.equals(this.props.project, nextProps.project, true) || 
            this.props.top !== nextProps.top) {

            this._runQuery(nextProps);
        }
    }

    public componentWillUnmount() {
        super.componentWillUnmount();
        UIActionsHub.RefreshQueryInGrid.removeListener(this._refreshQuery);
    }

    public render(): JSX.Element {
        if (this.state.workItemIds == null || this.state.fieldRefNames == null) {
            return <Loading />;
        }
        else {                    
            return (
                <WorkItemGrid 
                    className={this.getClassName()}
                    filterText={this.props.filterText}
                    workItemIds={this.state.workItemIds}
                    fieldRefNames={this.state.fieldRefNames}
                    getContextMenuItems={this.props.getContextMenuItems}
                    selectionMode={this.props.selectionMode}
                    extraColumns={this.props.extraColumns}
                    setKey={this.props.setKey}
                    selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                    noResultsText={this.props.noResultsText || "Query returned no results."}
                    compact={this.props.compact}
                />                        
            );
        }
    }

    @autobind
    private _refreshQuery() {
        this._runQuery(this.props);
    }

    private async _runQuery(props: IQueryResultGridProps) {
        this.updateState({workItemIds: null, fieldRefNames: null});

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        
        this.updateState({workItemIds: workItemIds, fieldRefNames: queryResult.columns.map(fr => fr.referenceName)});
    }    
}