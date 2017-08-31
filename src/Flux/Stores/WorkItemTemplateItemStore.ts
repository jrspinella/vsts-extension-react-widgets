import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";

import { StringUtils } from "../../Utils/String";
import { ArrayUtils } from "../../Utils/Array";
import { BaseStore } from "./BaseStore";
import { WorkItemTemplateItemActionsHub } from "../Actions/ActionsHub";

export class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    private _itemsIdMap: IDictionaryStringTo<WorkItemTemplate>;

    constructor() {
        super();
        this.items = [];   
        this._itemsIdMap = {}; 
    }

    public getItem(id: string): WorkItemTemplate {
        const key = (id || "").toLowerCase();
        return this._itemsIdMap[key];
    }

    protected initializeActionListeners() {
        WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.addListener((template: WorkItemTemplate) => {
            if (template) {               
                const index = ArrayUtils.findIndex(this.items, item => StringUtils.equals(item.id, template.id, true));
                if (index === -1) {
                    this.items.push(template);
                }
                else {
                    this.items[index] = template;
                }

                this._itemsIdMap[template.id.toLowerCase()] = template;
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