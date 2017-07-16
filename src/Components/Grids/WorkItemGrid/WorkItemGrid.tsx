import "./WorkItemsGrid.scss";

import * as React from "react";

import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { autobind } from "OfficeFabric/Utilities";

import Utils_String = require("VSS/Utils/String");
import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { IBaseComponentState } from "../../Common/BaseComponent"; 
import { IWorkItemGridProps, ColumnPosition } from "./WorkItemGrid.Props";
import { Grid } from "../Grid";
import { SortOrder, GridColumn, ICommandBarProps, IContextMenuProps } from "../Grid.Props";
import * as WorkItemHelpers from "./WorkItemGridHelpers";
import { BaseComponent } from "../../Common/BaseComponent"; 

export class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IBaseComponentState> {
    protected initializeState(): void {
        this.state = {
            
        };
    }

    protected getDefaultClassName(): string {
        return "work-item-grid";
    }

    public render(): JSX.Element {
        return (
            <Grid
                setKey={this.props.setKey}
                selectionPreservedOnEmptyClick={this.props.selectionPreservedOnEmptyClick || false}
                className={this.getClassName()}
                items={this.props.workItems}
                columns={this._mapFieldsToColumn(this.props.fields)}
                selectionMode={this.props.selectionMode}
                commandBarProps={this._getCommandBarProps()}
                contextMenuProps={this._getContextMenuProps()}
                onItemInvoked={this._onItemInvoked}
                noResultsText={this.props.noResultsText}
            />
        );    
    }

    private _mapFieldsToColumn(fields: WorkItemField[]): GridColumn[] {
        let columns = fields.map(field => {
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

    private _getCommandBarProps(): ICommandBarProps {        
        let menuItems: IContextualMenuItem[] = [{
            key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
            disabled: !this.props.workItems || this.props.workItems.length === 0,
            onClick: async (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {
                const url = `${VSS.getWebContext().host.uri}/${VSS.getWebContext().project.id}/_workitems?_a=query&wiql=${encodeURIComponent(this._getWiql())}`;
                window.open(url, "_blank");
            }
        }];
                
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

    private _getContextMenuProps(): IContextMenuProps {
        return {
            menuItems: (selectedWorkItems: WorkItem[]) => {
                let contextMenuItems: IContextualMenuItem[] = [{
                    key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                    disabled: selectedWorkItems.length == 0,
                    onClick: (event?: React.MouseEvent<HTMLElement>, menuItem?: IContextualMenuItem) => {                    
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
    private async _onItemInvoked(workItem: WorkItem, index?: number, ev?: React.MouseEvent<HTMLElement>) {
        // fire a workitem changed event here so parent can listen to it to update work items
        const updatedWorkItem: WorkItem = await WorkItemHelpers.openWorkItemDialog(ev, workItem);
        if (updatedWorkItem.rev > workItem.rev && this.props.onWorkItemUpdated) {
            this.props.onWorkItemUpdated(updatedWorkItem);
        }
    }

    private _itemComparer(workItem1: WorkItem, workItem2: WorkItem, field: WorkItemField, sortOrder: SortOrder): number {
        return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, field, sortOrder);
    }

    private _itemFilter(workItem: WorkItem, filterText: string, field: WorkItemField): boolean {
        return Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] == null ? "" : `${workItem.fields[field.referenceName]}`, filterText);
    }

    private _getWiql(workItems?: WorkItem[]): string {
        const fieldStr = this.props.fields.map(f => `[${f.referenceName}]`).join(",");
        const ids = (workItems || this.props.workItems).map(w => w.id).join(",");

        return `SELECT ${fieldStr}
                 FROM WorkItems 
                 WHERE [System.ID] IN (${ids})`;
    }
}