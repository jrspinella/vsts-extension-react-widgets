import * as CoreClient from "TFS/Core/RestClient";

import { StoreFactory } from "../Stores/BaseStore";
import { TeamStore } from "../Stores/TeamStore";
import { TeamActionsHub } from "./ActionsHub";

export module TeamActions {
    var teamStore: TeamStore = StoreFactory.getInstance<TeamStore>(TeamStore);

    export async function initializeTeams() {
        if (teamStore.isLoaded()) {
            TeamActionsHub.InitializeTeams.invoke(null);
        }
        else if (!teamStore.isLoading()) {
            teamStore.setLoading(true);
            try {
                const teams =  await CoreClient.getClient().getTeams(VSS.getWebContext().project.id, 300);
                TeamActionsHub.InitializeTeams.invoke(teams);
                teamStore.setLoading(false);
            }
            catch (e) {
                teamStore.setLoading(false);
                throw e.message;
            }
        }
    }
}