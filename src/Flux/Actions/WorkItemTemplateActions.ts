import * as WitClient from "TFS/WorkItemTracking/RestClient";
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import * as Utils_String from "VSS/Utils/String";

import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateActionsHub } from "./ActionsHub";

export module WorkItemTemplateActions {
    var workItemTemplateStore: WorkItemTemplateStore = StoreFactory.getInstance<WorkItemTemplateStore>(WorkItemTemplateStore);

    export async function initializeWorkItemTemplates() {
        if (workItemTemplateStore.isLoaded()) {
            WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke(null);
        }
        else if (!workItemTemplateStore.isLoading()) {
            workItemTemplateStore.setLoading(true);
            try {
                const workItemTemplates = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, VSS.getWebContext().team.id);
                workItemTemplates.sort((a: WorkItemTemplateReference, b: WorkItemTemplateReference) => Utils_String.localeIgnoreCaseComparer(a.name, b.name));

                WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke(workItemTemplates);
                workItemTemplateStore.setLoading(false);
            }
            catch (e) {
                workItemTemplateStore.setLoading(false);
                throw e.message;
            }
        }
    }
}