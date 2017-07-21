import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemTemplateItemActionsHub } from "../Actions/ActionsHub";

export class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    constructor() {
        super();
        this.items = [];    
    }

    public getItem(id: string): WorkItemTemplate {
         return Utils_Array.first(this.items, (item: WorkItemTemplate) => Utils_String.equals(item.id, id, true));
    }

    protected initializeActionListeners() {
        WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.addListener((template: WorkItemTemplate) => {
            if (template) {               
                const index = Utils_Array.findIndex(this.items, item => Utils_String.equals(item.id, template.id, true));
                if (index === -1) {
                    this.items.push(template);
                }
                else {
                    this.items[index] = template;
                }
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "WorkItemTemplateItemStore";
    }  
    
    protected convertItemKeyToString(key: string): string {
        return key;
    }      
}