import { TeamActionsHub } from "../Actions/ActionsHub";
import { BaseStore } from "./BaseStore";

import { WebApiTeam } from "TFS/Core/Contracts";


export class TeamStore extends BaseStore<WebApiTeam[], WebApiTeam, string> {
    private _itemsIdMap: IDictionaryStringTo<WebApiTeam>;
    private _itemsNameMap: IDictionaryStringTo<WebApiTeam>;

    constructor() {
        super();
        this._itemsIdMap = {};
        this._itemsNameMap = {};
    }

    public getItem(idOrName: string): WebApiTeam {
        const key = (idOrName || "").toLowerCase();
        return this._itemsIdMap[key] || this._itemsNameMap[key];
    }    

    protected initializeActionListeners() {
        TeamActionsHub.InitializeTeams.addListener((teams: WebApiTeam[]) => {
            if (teams) {
                this.items = teams;
                this._itemsIdMap = {};
                this._itemsNameMap = {};

                for (const item of this.items) {
                    this._itemsIdMap[item.id.toLowerCase()] = item;
                    this._itemsNameMap[item.name.toLowerCase()] = item;
                }
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