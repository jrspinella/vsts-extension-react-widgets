import * as React from "react";

import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");
import * as EventsService from "VSS/Events/Services";

import { autobind } from "OfficeFabric/Utilities";

import { Loading } from "../../Common/Loading";
import { BaseComponent } from "../../Common/BaseComponent"; 
import { WorkItemGrid } from "./WorkItemGrid";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";

export module QueryResultGridEvents {
    export var RefreshQueryInGrid = "refresh-query-grid";
}

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    public componentDidMount() {
        super.componentDidMount();
        this._runQuery(this.props);

        EventsService.getService().attachEvent(QueryResultGridEvents.RefreshQueryInGrid, this._refreshQuery);
    }

    protected getDefaultClassName(): string {
        return "query-results-grid";
    }

    public componentWillReceiveProps(nextProps: Readonly<IQueryResultGridProps>): void {
        if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true) || 
            !Utils_String.equals(this.props.project, nextProps.project, true) || 
            this.props.top !== nextProps.top) {

            this._runQuery(nextProps);
        }
    }

    public componentWillUnmount() {
        super.componentWillMount();
        EventsService.getService().detachEvent(QueryResultGridEvents.RefreshQueryInGrid, this._refreshQuery);
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
                    contextMenuProps={this.props.contextMenuProps}
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