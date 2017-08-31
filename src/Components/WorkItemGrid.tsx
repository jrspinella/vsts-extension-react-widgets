import "./WorkItemsGrid.scss";

import * as React from "react";

import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { autobind } from "OfficeFabric/Utilities";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";

import Utils_String = require("VSS/Utils/String");
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent"; 
import { Loading } from "./Loading"; 
import { Grid, SortOrder, GridColumn, IContextMenuProps } from "./Grid";
import * as WorkItemHelpers from "../Utilities/WorkItemGridHelpers";
import { BaseStore, StoreFactory } from "../Flux/Stores/BaseStore"; 
import { WorkItemStore } from "../Flux/Stores/WorkItemStore"; 
import { WorkItemFieldStore } from "../Flux/Stores/WorkItemFieldStore"; 
import { WorkItemActions } from "../Flux/Actions/WorkItemActions"; 
import { WorkItemFieldActions } from "../Flux/Actions/WorkItemFieldActions"; 

export interface BaseWorkItemGridProps extends IBaseComponentProps {
    extraColumns?: IExtraWorkItemGridColumn[];
    selectionMode?: SelectionMode;
    contextMenuProps?: IContextMenuProps;
    noResultsText?: string;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
    compact?: boolean;
}

export interface IWorkItemGridProps extends BaseWorkItemGridProps {    
    workItemIds: number[]; 
    fieldRefNames: string[];    
}

export interface IWorkItemGridState extends IBaseComponentState {    
    workItems: WorkItem[];
    fieldsMap: IDictionaryStringTo<WorkItemField>;
}

export interface IExtraWorkItemGridColumn {
    column: GridColumn
    position?: ColumnPosition;
}

export enum ColumnPosition {
    FarLeft,
    FarRight
}

export class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    private _workItemStore = StoreFactory.getInstance<WorkItemStore>(WorkItemStore);
    private _workItemFieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    public componentDidMount() {
        super.componentDidMount();

        WorkItemFieldActions.initializeWorkItemFields();

        if (this.props.workItemIds && this.props.workItemIds.length > 0) {
            WorkItemActions.initializeWorkItems(this.props.workItemIds);
        }
    }

    public componentWillReceiveProps(nextProps: IWorkItemGridProps) {
        for (const id of nextProps.workItemIds) {
            if (!this._workItemStore.isLoaded(id)) {
                WorkItemActions.initializeWorkItems(nextProps.workItemIds);
                return;
            }
        }
        
        this.updateState({
            workItems: this._workItemStore.getItems(nextProps.workItemIds),
            loading: this._workItemFieldStore.isLoading() || this._workItemStore.isLoading()
        } as IWorkItemGridState);
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemStore, this._workItemFieldStore];
    }

    protected getStoresState(): IWorkItemGridState {
        const allFields = this._workItemFieldStore.getAll();
        let fieldsMap = this.state.fieldsMap;
        if (fieldsMap == null && allFields != null) {
            fieldsMap = {};
            for (const field of allFields) {
                fieldsMap[field.referenceName] = field;
            }
        }

        return {
            loading: this._workItemFieldStore.isLoading() || this._workItemStore.isLoading(),
            fieldsMap: fieldsMap,
            workItems: this._workItemStore.getItems(this.props.workItemIds)
        } as IWorkItemGridState;
    }

    protected initializeState(): void {
        this.state = {
            workItems: null,
            loading: true,
            fieldsMap: null
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-grid";
    }

    public render(): JSX.Element {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <Grid
                setKey={this.props.setKey}
                filterText={this.props.filterText}
                selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                className={this.getClassName()}
                items={this.state.workItems}
                columns={this._mapFieldsToColumn()}
                selectionMode={this.props.selectionMode}
                contextMenuProps={this._getContextMenuProps()}
                onItemInvoked={this._onItemInvoked}
                noResultsText={this.props.noResultsText}
                compact={this.props.compact}
            />
        );    
    }

    private _itemFilter(workItem: WorkItem, filterText: string, field: WorkItemField): boolean {
        return Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] == null ? "" : `${workItem.fields[field.referenceName]}`, filterText);
    }

    private _mapFieldsToColumn(): GridColumn[] {
        let columns = this.props.fieldRefNames.map(fieldRefName => {
            const field = this.state.fieldsMap[fieldRefName];
            const columnSize = WorkItemHelpers.getColumnSize(field);

            return {
                key: field.referenceName,
                name: field.name,
                minWidth: columnSize.minWidth,
                maxWidth: columnSize.maxWidth,                
                resizable: true,
                sortFunction: (item1: WorkItem, item2: WorkItem, sortOrder: SortOrder) => this._itemComparer(item1, item2, field, sortOrder),
                filterFunction: (item: WorkItem, filterText: string) => `${item.id}` === filterText || this._itemFilter(item, filterText, field),
                data: {field: field},
                onRenderCell: (item: WorkItem) => WorkItemHelpers.workItemFieldCellRenderer(item, field, field.referenceName === "System.Title" ? {onClick: (ev: React.MouseEvent<HTMLElement>) => this._onItemInvoked(item, 0, ev)} : null)
            } as GridColumn
        });

        const extraColumns = this.props.extraColumns || [];
        const leftColumns = extraColumns.filter(c => c.position === ColumnPosition.FarLeft).map(c => c.column);
        const rightColumns = extraColumns.filter(c => c.position !== ColumnPosition.FarLeft).map(c => c.column);

        if (leftColumns.length > 0) {
            columns = leftColumns.concat(columns);
        }
        if (rightColumns.length > 0) {
            columns = columns.concat(rightColumns);
        }

        return columns;
    }

    private _getContextMenuProps(): IContextMenuProps {
        return {
            menuItems: (selectedWorkItems: WorkItem[]) => {
                let contextMenuItems: IContextualMenuItem[] = [{
                    key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                    disabled: selectedWorkItems.length == 0,
                    onClick: () => {                    
                        const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql(selectedWorkItems))}`;
                        window.open(url, "_blank");
                    }
                }];

                if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
                    let extraMenuItems = this.props.contextMenuProps.menuItems(selectedWorkItems);
                    if (extraMenuItems && extraMenuItems.length > 0) {
                        contextMenuItems = contextMenuItems.concat(extraMenuItems);
                    }
                }

                return contextMenuItems;
            }
        }
    }

    @autobind
    private async _onItemInvoked(workItem: WorkItem, _index?: number, ev?: React.MouseEvent<HTMLElement>) {
        // fire a workitem changed event here so parent can listen to it to update work items
        const updatedWorkItem: WorkItem = await WorkItemHelpers.openWorkItemDialog(ev, workItem);
        if (updatedWorkItem.rev > workItem.rev) {            
            WorkItemActions.refreshWorkItemInStore([updatedWorkItem]);
        }
    }

    private _itemComparer(workItem1: WorkItem, workItem2: WorkItem, field: WorkItemField, sortOrder: SortOrder): number {
        return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, field, sortOrder);
    }

    private _getWiql(workItems?: WorkItem[]): string {
        const fieldStr = this.props.fieldRefNames.join(",");
        const ids = (workItems || this.state.workItems).map(w => w.id).join(",");

        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.ID] IN (${ids})`;
    }
}