import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { WebApiTeam } from "TFS/Core/Contracts";

import { BaseStore } from "./BaseStore";
import { TeamActionsHub } from "../Actions/ActionsHub";

export class TeamStore extends BaseStore<WebApiTeam[], WebApiTeam, string> {
    public getItem(idOrName: string): WebApiTeam {
        return Utils_Array.first(this.items || [], (team: WebApiTeam) => Utils_String.equals(team.id, idOrName, true) || Utils_String.equals(team.name, idOrName, true));
    }    

    protected initializeActionListeners() {
        TeamActionsHub.InitializeTeams.addListener((teams: WebApiTeam[]) => {
            if (teams) {
                this.items = teams;
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "TeamStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}