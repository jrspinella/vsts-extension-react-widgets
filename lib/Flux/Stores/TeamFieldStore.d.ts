import { TeamFieldValues } from "TFS/Work/Contracts";
import { BaseStore } from "./BaseStore";
export declare class TeamFieldStore extends BaseStore<IDictionaryStringTo<TeamFieldValues>, TeamFieldValues, string> {
    constructor();
    getItem(teamId: string): TeamFieldValues;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
