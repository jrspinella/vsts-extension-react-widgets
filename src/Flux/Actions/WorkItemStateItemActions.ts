import * as WitClient from "TFS/WorkItemTracking/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemStateItemStore } from "../Stores/WorkItemStateItemStore";
import { WorkItemStateItemActionsHub } from "./ActionsHub";

export module WorkItemStateItemActions {
    var workItemStateItemStore: WorkItemStateItemStore = StoreFactory.getInstance<WorkItemStateItemStore>(WorkItemStateItemStore);

    export async function initializeWorkItemStates(workItemTypeName: string) {
        if (workItemStateItemStore.isLoaded(workItemTypeName)) {
            WorkItemStateItemActionsHub.InitializeWorkItemStateItems.invoke(null);
        }
        else if (!workItemStateItemStore.isLoading(workItemTypeName)) {
            workItemStateItemStore.setLoading(true, workItemTypeName);
            try {
                const workItemTypeStates = await WitClient.getClient().getWorkItemTypeStates(VSS.getWebContext().project.id, workItemTypeName);
                WorkItemStateItemActionsHub.InitializeWorkItemStateItems.invoke({witName: workItemTypeName, states: workItemTypeStates});
                workItemStateItemStore.setLoading(false, workItemTypeName);
            }
            catch (e) {
                workItemStateItemStore.setLoading(false, workItemTypeName);
                throw e.message;
            }
        }
    }
}