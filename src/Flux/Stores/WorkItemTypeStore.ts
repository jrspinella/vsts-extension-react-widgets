import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

import { BaseStore } from "./BaseStore";
import { WorkItemTypeActionsHub } from "../Actions/ActionsHub";

export class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    public getItem(typeName: string): WorkItemType {
        return Utils_Array.first(this.items || [], (item: WorkItemType) => Utils_String.equals(item.name, typeName, true));
    }    

    protected initializeActionListeners() {
        WorkItemTypeActionsHub.InitializeWorkItemTypes.addListener((workItemTypes: WorkItemType[]) => {
            if (workItemTypes) {
                this.items = workItemTypes;
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