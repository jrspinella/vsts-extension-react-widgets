import { BaseStore } from "./BaseStore";
import { WebApiTeam } from "TFS/Core/Contracts";
export declare class TeamStore extends BaseStore<WebApiTeam[], WebApiTeam, string> {
    private _itemsIdMap;
    private _itemsNameMap;
    constructor();
    getItem(idOrName: string): WebApiTeam;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
