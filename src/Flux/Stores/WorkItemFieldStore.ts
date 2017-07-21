import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemFieldActionsHub } from "../Actions/ActionsHub";

export class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    public getItem(fieldRefName: string): WorkItemField {
        return Utils_Array.first(this.items || [], (item: WorkItemField) => Utils_String.equals(item.referenceName, fieldRefName, true) || Utils_String.equals(item.name, fieldRefName, true));
    }    

    protected initializeActionListeners() {
        WorkItemFieldActionsHub.InitializeWorkItemFields.addListener((fields: WorkItemField[]) => {
            if (fields) {
                this.items = fields;
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "WorkItemFieldStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}