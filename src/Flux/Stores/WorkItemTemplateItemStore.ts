import { WorkItemTemplateItemActionsHub } from "../Actions/ActionsHub";
import { BaseStore } from "./BaseStore";

import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";

export class WorkItemTemplateItemStore extends BaseStore<IDictionaryStringTo<WorkItemTemplate>, WorkItemTemplate, string> {
    constructor() {
        super();
        this.items = {};   
    }

    public getItem(id: string): WorkItemTemplate {
        const key = (id || "").toLowerCase();
        return this.items[key];
    }

    protected initializeActionListeners() {
        WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.subscribe((template: WorkItemTemplate) => {
            if (template) {
                this.items[template.id.toLowerCase()] = template;
            }

            this.notify(null, null);
        });
    }

    public getKey(): string {
        return "WorkItemTemplateItemStore";
    }  
    
    protected convertItemKeyToString(key: string): string {
        return key;
    }      
}