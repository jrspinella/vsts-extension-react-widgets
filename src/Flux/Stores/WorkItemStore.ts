import { WorkItemActionsHub } from "../Actions/ActionsHub";
import { BaseStore } from "./BaseStore";

import { WorkItem } from "TFS/WorkItemTracking/Contracts";


export class WorkItemStore extends BaseStore<IDictionaryNumberTo<WorkItem>, WorkItem, number> {
    constructor() {
        super();
        this.items = {};    
    }

    public getItem(workItemId: number): WorkItem {
         return this.items[workItemId];
    }

    public getItems(workItemIds: number[]): WorkItem[] {
        let workItems: WorkItem[] = [];
        for (const workItemId of workItemIds) {
            if (this.items[workItemId]) {
                workItems.push(this.items[workItemId]);
            }
        }
        
        return workItems;
    }

    protected initializeActionListeners() {
        WorkItemActionsHub.AddOrUpdateWorkItems.addListener((workItems: WorkItem[]) => {
            if (workItems) {
                for (const workItem of workItems) {
                    this._addWorkItem(workItem);
                }
            }

            this.emitChanged();
        });

        WorkItemActionsHub.DeleteWorkItems.addListener((workItemIds: number[]) => {
            if (workItemIds) {
                for (const id of workItemIds) {
                    this._removeWorkItem(id);
                }
            }

            this.emitChanged();
        });

        WorkItemActionsHub.ClearWorkItems.addListener(() => {
            this.clearStore();
            this.emitChanged();
        });

    } 

    public getKey(): string {
        return "WorkItemStore";
    }

    public clearStore() {
        this.items = {};
    }

    protected convertItemKeyToString(key: number): string {
        return "" + key;
    }

    private _addWorkItem(workItem: WorkItem): void {
        if (!workItem) {
            return;
        }
        this.items[workItem.id] = workItem;
    }

    private _removeWorkItem(workItemId: number): void {
        delete this.items[workItemId];
    }
}