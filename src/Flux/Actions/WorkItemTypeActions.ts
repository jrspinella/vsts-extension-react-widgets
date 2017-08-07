import * as WitClient from "TFS/WorkItemTracking/RestClient";
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import * as Utils_String from "VSS/Utils/String";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTypeStore } from "../Stores/WorkItemTypeStore";
import { WorkItemTypeActionsHub } from "./ActionsHub";

export module WorkItemTypeActions {
    var workItemTypeStore: WorkItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    export async function initializeWorkItemTypes() {
        if (workItemTypeStore.isLoaded()) {
            WorkItemTypeActionsHub.InitializeWorkItemTypes.invoke(null);
        }
        else if (!workItemTypeStore.isLoading()) {
            workItemTypeStore.setLoading(true);
            try {
                const workItemTypes = await WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id);
                workItemTypes.sort((a: WorkItemType, b: WorkItemType) => Utils_String.localeIgnoreCaseComparer(a.name, b.name));

                WorkItemTypeActionsHub.InitializeWorkItemTypes.invoke(workItemTypes);
                workItemTypeStore.setLoading(false);
            }
            catch (e) {
                workItemTypeStore.setLoading(false);
                throw e.message;
            }
        }
    }
}