import * as React from "react";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";

import * as WitClient from "TFS/WorkItemTracking/RestClient";
import Utils_String = require("VSS/Utils/String");

import { Loading } from "../../Common/Loading";
import { BaseComponent } from "../../Common/BaseComponent"; 
import { WorkItemGrid } from "./WorkItemGrid";
import { IQueryResultGridProps, IQueryResultGridState } from "./WorkItemGrid.Props";
import { ICommandBarProps } from "../Grid.Props";

export class QueryResultGrid extends BaseComponent<IQueryResultGridProps, IQueryResultGridState> {
    public componentDidMount() {
        super.componentDidMount();
        this._runQuery(this.props);
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

    public render(): JSX.Element {
        if (!this._isDataLoaded()) {
            return <Loading />;
        }
        else {                    
            return (
                <WorkItemGrid 
                    className={this.getClassName()}
                    workItemIds={this.state.workItemIds}
                    fieldRefNames={this.state.fieldRefNames}
                    commandBarProps={this._getCommandBarProps()}
                    contextMenuProps={this.props.contextMenuProps}
                    selectionMode={this.props.selectionMode}
                    extraColumns={this.props.extraColumns}
                    setKey={this.props.setKey}
                    selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                    noResultsText={this.props.noResultsText || "Query returned no results."}
                />                        
            );
        }
    }

    private _getCommandBarProps(): ICommandBarProps {        
        let menuItems: IContextualMenuItem[] = [             
            {
                key: "refresh", name: "Refresh", title: "Refresh items", iconProps: {iconName: "Refresh"},
                onClick: () => {
                    this._runQuery(this.props);
                }
            }
        ];
                
        if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
            menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
        }
        
        return {
            hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
            hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
            menuItems: menuItems,
            farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
        };
    }

    private async _runQuery(props: IQueryResultGridProps) {
        this.updateState({workItemIds: null, fieldRefNames: null});

        let queryResult = await WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top);
        let workItemIds = queryResult.workItems.map(workItem => workItem.id);
        
        this.updateState({workItemIds: workItemIds, fieldRefNames: queryResult.columns.map(fr => fr.referenceName)});
    }    

    private _isDataLoaded(): boolean {
        return this.state.workItemIds != null && this.state.fieldRefNames != null;
    }
}