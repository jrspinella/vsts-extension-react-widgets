import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { ActionsHub } from "../Actions/ActionsCreator";

export interface IWorkItemTemplateItemStore {
    itemExists(id: string): boolean;
    getItem(id: string): WorkItemTemplate;
}

export class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {

    constructor(actions: ActionsHub) {
        super(actions);

        this.items = [];    
    }

    protected registerListeners(actions: ActionsHub): void {
        actions.WorkItemTemplateItemAdded.addListener((items: WorkItemTemplate | WorkItemTemplate[]) => {
            this._onAdd(items);
        });
    }
    
    protected getItemByKey(id: string): WorkItemTemplate {
         return Utils_Array.first(this.items, (item: WorkItemTemplate) => Utils_String.equals(item.id, id, true));
    }

    private _onAdd(items: WorkItemTemplate | WorkItemTemplate[]): void {
        if (!items) {
            return;
        }

        if (!this.items) {
            this.items = [];
        }

        if (Array.isArray(items)) {
            for (let item of items) {
                this._addItem(item);
            }
        }
        else {
            this._addItem(items);
        }

        this.emitChanged();
    }

    private _addItem(item: WorkItemTemplate): void {
        let existingItemIndex = Utils_Array.findIndex(this.items, (existingItem: WorkItemTemplate) => Utils_String.equals(item.id, existingItem.id, true));
        if (existingItemIndex != -1) {
            // Overwrite the item data
            this.items[existingItemIndex] = item;
        }
        else {
            this.items.push(item);
        }
    }
}