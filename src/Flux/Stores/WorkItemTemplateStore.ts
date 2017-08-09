import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemTemplateActionsHub } from "../Actions/ActionsHub";

export class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    private _itemsIdMap: IDictionaryStringTo<WorkItemTemplateReference>;

    constructor() {
        super();
        this._itemsIdMap = {};
    }

    public getItem(id: string): WorkItemTemplateReference {
        const key = (id || "").toLowerCase();
        return this._itemsIdMap[key];
    }

    protected initializeActionListeners() {
        WorkItemTemplateActionsHub.InitializeWorkItemTemplates.addListener((templates: WorkItemTemplateReference[]) => {
            if (templates) {
                this.items = templates;
                this._itemsIdMap = {};

                for (const item of this.items) {
                    this._itemsIdMap[item.id.toLowerCase()] = item;
                }
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "WorkItemTemplateStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}