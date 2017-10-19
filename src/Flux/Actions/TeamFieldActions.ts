import { StoreFactory } from "../Stores/BaseStore";
import { TeamFieldStore } from "../Stores/TeamFieldStore";
import { TeamFieldActionsHub } from "./ActionsHub";

import { TeamContext } from "TFS/Core/Contracts";
import * as WorkClient from "TFS/Work/RestClient";


export module TeamFieldActions {
    var teamFieldStore: TeamFieldStore = StoreFactory.getInstance<TeamFieldStore>(TeamFieldStore);

    export async function initializeTeamFields(teamId: string) {
        if (teamFieldStore.isLoaded(teamId)) {
            TeamFieldActionsHub.InitializeTeamFieldItem.invoke(null);
        }
        else if (!teamFieldStore.isLoading(teamId)) {
            teamFieldStore.setLoading(true, teamId);
            try {
                const teamContext: TeamContext = {
                    project: "",
                    projectId: VSS.getWebContext().project.id,
                    team: "",
                    teamId: teamId
                };
                
                const teamFieldValues = await WorkClient.getClient().getTeamFieldValues(teamContext);
                TeamFieldActionsHub.InitializeTeamFieldItem.invoke({teamId: teamId, teamFieldValues: teamFieldValues});
                teamFieldStore.setLoading(false, teamId);
            }
            catch (e) {
                teamFieldStore.setLoading(false, teamId);
                throw e.message;
            }
        }
    }
}