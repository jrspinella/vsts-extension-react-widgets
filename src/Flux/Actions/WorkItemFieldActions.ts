import * as WitClient from "TFS/WorkItemTracking/RestClient";
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
import * as Utils_String from "VSS/Utils/String";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemFieldStore } from "../Stores/WorkItemFieldStore";
import { WorkItemFieldActionsHub } from "./ActionsHub";

export module WorkItemFieldActions {
    var workItemFieldStore: WorkItemFieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    export async function initializeWorkItemFields() {
        if (workItemFieldStore.isLoaded()) {
            WorkItemFieldActionsHub.InitializeWorkItemFields.invoke(null);
        }
        else if (!workItemFieldStore.isLoading()) {
            workItemFieldStore.setLoading(true);
            try {
                const workItemFields = await WitClient.getClient().getFields(VSS.getWebContext().project.id);
                workItemFields.sort((a: WorkItemField, b: WorkItemField) => Utils_String.localeIgnoreCaseComparer(a.name, b.name));
                WorkItemFieldActionsHub.InitializeWorkItemFields.invoke(workItemFields);
                workItemFieldStore.setLoading(false);
            }
            catch (e) {
                workItemFieldStore.setLoading(false);
                throw e.message;
            }
        }
    }
}