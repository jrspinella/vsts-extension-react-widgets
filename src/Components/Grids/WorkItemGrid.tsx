import "./WorkItemsGrid.scss";

import * as React from "react";

import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { autobind } from "OfficeFabric/Utilities";

import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { BaseComponent, IBaseComponentState } from "../BaseComponent"; 
import { Loading } from "../Loading"; 
import { Grid, SortOrder, IGridColumn, IGridProps } from "./Grid";
import * as WorkItemHelpers from "../../Utils/WorkItemGridHelpers";
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore"; 
import { WorkItemStore } from "../../Flux/Stores/WorkItemStore"; 
import { WorkItemFieldStore } from "../../Flux/Stores/WorkItemFieldStore"; 
import { WorkItemActions } from "../../Flux/Actions/WorkItemActions"; 
import { WorkItemFieldActions } from "../../Flux/Actions/WorkItemFieldActions"; 

export interface IWorkItemGridProps extends IGridProps<WorkItem> {
    workItemIds?: number[];
    fieldRefNames?: string[];
    extraColumns?: IExtraWorkItemGridColumn[];
}

export interface IWorkItemGridState extends IBaseComponentState {    
    workItems: WorkItem[];
    fieldsMap: IDictionaryStringTo<WorkItemField>;
}

export interface IExtraWorkItemGridColumn {
    column: IGridColumn<WorkItem>;
    position?: ColumnPosition;
}

export enum ColumnPosition {
    FarLeft,
    FarRight
}

class WIGrid extends Grid<WorkItem> {}

export class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IWorkItemGridState> {
    private _workItemStore = StoreFactory.getInstance<WorkItemStore>(WorkItemStore);
    private _workItemFieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    protected initializeState(): void {
        this.state = {
            workItems: this.props.items,
            loading: this.props.items == null,
            fieldsMap: null
        };
    }

    public componentDidMount() {
        super.componentDidMount();

        WorkItemFieldActions.initializeWorkItemFields();

        if (!this.props.items && this.props.workItemIds) {
            WorkItemActions.initializeWorkItems(this.props.workItemIds);
        }
    }

    public componentWillReceiveProps(nextProps: IWorkItemGridProps) {
        if (!nextProps.items && nextProps.workItemIds) {
            for (const id of nextProps.workItemIds) {
                if (!this._workItemStore.isLoaded(id)) {
                    WorkItemActions.initializeWorkItems(nextProps.workItemIds);
                    return;
                }
            }
        }
        
        this.setState({
            workItems: nextProps.items || this._workItemStore.getItems(nextProps.workItemIds).filter(w => w.rev !== -1),
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
                fieldsMap[field.referenceName.toLowerCase()] = field;
            }
        }

        return {
            loading: this._workItemFieldStore.isLoading() || this._workItemStore.isLoading(),
            fieldsMap: fieldsMap,
            workItems: this.props.items || this._workItemStore.getItems(this.props.workItemIds).filter(w => w.rev !== -1)
        } as IWorkItemGridState;
    }

    protected getDefaultClassName(): string {
        return "work-item-grid";
    }

    public render(): JSX.Element {
        if (this.state.loading) {
            return <Loading />;
        }

        const props: any = {
            ...this.props,
            columns: this.props.columns || this._mapFieldRefNamesToColumn(),
            items: this.state.workItems,
            className: this.getClassName(),
            getContextMenuItems: this._getContextMenuItems,
            onItemInvoked: (workItem: WorkItem, _index?: number, ev?: any) => this._onItemInvoked(workItem, ev),
            getKey: (workItem: WorkItem) => `${workItem.id}`
        } as IGridProps<WorkItem>;

        return <WIGrid {...props} />;
    }

    private _mapFieldRefNamesToColumn(): IGridColumn<WorkItem>[] {
        let columns: IGridColumn<WorkItem>[] = this.props.fieldRefNames.map(fieldRefName => {
            const field = this.state.fieldsMap[fieldRefName.toLowerCase()];
            const columnSize = WorkItemHelpers.getColumnSize(field);

            return {
                key: field.referenceName,
                name: field.name,
                minWidth: columnSize.minWidth,
                maxWidth: columnSize.maxWidth,
                isResizable: true,
                comparer: (workItem1: WorkItem, workItem2: WorkItem, sortOrder: SortOrder) => WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, field, sortOrder),
                onRender: (workItem: WorkItem) => WorkItemHelpers.workItemFieldCellRenderer(workItem, field, field.referenceName === "System.Title" ? {onClick: (ev: React.MouseEvent<HTMLElement>) => this._onItemInvoked(workItem, ev)} : null)
            } as IGridColumn<WorkItem>;
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

    @autobind
    private _getContextMenuItems(selectedWorkItems: WorkItem[]): IContextualMenuItem[] {
        let contextMenuItems: IContextualMenuItem[] = [{
            key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
            disabled: selectedWorkItems.length == 0,
            onClick: () => {                    
                const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql(selectedWorkItems))}`;
                window.open(url, "_blank");
            }
        }];

        if (this.props.getContextMenuItems) {
            let extraMenuItems = this.props.getContextMenuItems(selectedWorkItems);
            if (extraMenuItems && extraMenuItems.length > 0) {
                contextMenuItems = contextMenuItems.concat(extraMenuItems);
            }
        }

        return contextMenuItems;
    }

    @autobind
    private async _onItemInvoked(workItem: WorkItem, ev?: React.MouseEvent<HTMLElement>) {
        // fire a workitem changed event here so parent can listen to it to update work items
        const updatedWorkItem: WorkItem = await WorkItemHelpers.openWorkItemDialog(ev, workItem);
        if (updatedWorkItem.rev > workItem.rev) {            
            WorkItemActions.refreshWorkItemInStore([updatedWorkItem]);
        }
    }

    private _getWiql(workItems?: WorkItem[]): string {
        const fieldStr = this.props.fieldRefNames.join(",");
        const ids = (workItems || this.state.workItems).map(w => w.id).join(",");

        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.ID] IN (${ids})`;
    }
}