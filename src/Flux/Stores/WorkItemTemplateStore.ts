import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemTemplateActionsHub } from "../Actions/ActionsHub";

export class WorkItemTemplateStore extends BaseStore<WorkItemTemplateReference[], WorkItemTemplateReference, string> {
    public getItem(id: string): WorkItemTemplateReference {  
        return Utils_Array.first(this.items || [], (item: WorkItemTemplateReference) => Utils_String.equals(item.id, id, true));
    }    

    protected initializeActionListeners() {
        WorkItemTemplateActionsHub.InitializeWorkItemTemplates.addListener((templates: WorkItemTemplateReference[]) => {
            if (templates) {
                this.items = templates;
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