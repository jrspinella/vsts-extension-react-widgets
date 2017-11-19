import { StringUtils } from "../../Utilities/String";
import { StoreFactory } from "../Stores/BaseStore";
import { TeamStore } from "../Stores/TeamStore";
import { TeamActionsHub } from "./ActionsHub";

import { WebApiTeam } from "TFS/Core/Contracts";
import * as CoreClient from "TFS/Core/RestClient";

export module TeamActions {
    var teamStore: TeamStore = StoreFactory.getInstance<TeamStore>(TeamStore);

    export async function initializeTeams() {
        if (teamStore.isLoaded()) {
            TeamActionsHub.InitializeTeams.invoke(null);
        }
        else if (!teamStore.isLoading()) {
            teamStore.setLoading(true);
            try {
                const teams = await getTeams();
                teams.sort((a: WebApiTeam, b: WebApiTeam) => StringUtils.localeIgnoreCaseComparer(a.name, b.name));
                TeamActionsHub.InitializeTeams.invoke(teams);
                teamStore.setLoading(false);
            }
            catch (e) {
                teamStore.setLoading(false);
                throw e.message;
            }
        }
    }

    async function getTeams(): Promise<WebApiTeam[]> {
        const teams: WebApiTeam[] = [];
        const top: number = 300;
        const client = CoreClient.getClient();
        const project = VSS.getWebContext().project.id;

        const getTeamDelegate = async (skip: number) => {
            let result: WebApiTeam[] = await client.getTeams(project, top, skip);
            if (result.length > 0) {
                teams.push(...result);
            }            
            if (result.length === top) {
                await getTeamDelegate(skip + top);
            }
            return;
        };

        await getTeamDelegate(0);
        return teams;
    }
}