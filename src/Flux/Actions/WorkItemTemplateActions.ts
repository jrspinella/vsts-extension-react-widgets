import * as WitClient from "TFS/WorkItemTracking/RestClient";
import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";

import { StringUtils } from "../../Utils/String";
import { StoreFactory } from "../Stores/BaseStore";
import { WorkItemTemplateStore } from "../Stores/WorkItemTemplateStore";
import { WorkItemTemplateActionsHub } from "./ActionsHub";

export module WorkItemTemplateActions {
    var workItemTemplateStore: WorkItemTemplateStore = StoreFactory.getInstance<WorkItemTemplateStore>(WorkItemTemplateStore);

    export async function initializeWorkItemTemplates(teamId: string) {
        if (workItemTemplateStore.isLoaded(teamId)) {
            WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke(null);
        }
        else if (!workItemTemplateStore.isLoading(teamId)) {
            workItemTemplateStore.setLoading(true, teamId);
            try {
                const workItemTemplates = await WitClient.getClient().getTemplates(VSS.getWebContext().project.id, teamId);
                workItemTemplates.sort((a: WorkItemTemplateReference, b: WorkItemTemplateReference) => StringUtils.localeIgnoreCaseComparer(a.name, b.name));

                WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke({teamId: teamId, templates: workItemTemplates});
                workItemTemplateStore.setLoading(false, teamId);
            }
            catch (e) {
                workItemTemplateStore.setLoading(false, teamId);
                throw e.message;
            }
        }
    }
}