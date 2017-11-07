import { WorkItemTypeActionsHub } from "../Actions/ActionsHub";
import { BaseStore } from "./BaseStore";

import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

export class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    private _itemsIdMap: IDictionaryStringTo<WorkItemType>;

    constructor() {
        super();
        this._itemsIdMap = {};
    }

    public getItem(typeName: string): WorkItemType {
        const key = (typeName || "").toLowerCase();
        return this._itemsIdMap[key];
    }    

    protected initializeActionListeners() {
        WorkItemTypeActionsHub.InitializeWorkItemTypes.addListener((workItemTypes: WorkItemType[]) => {
            if (workItemTypes) {
                this.items = workItemTypes;
                this._itemsIdMap = {};

                for (const item of this.items) {
                    this._itemsIdMap[item.name.toLowerCase()] = item;
                }
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "WorkItemTypeStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}