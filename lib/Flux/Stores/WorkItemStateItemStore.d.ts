import { BaseStore } from "./BaseStore";
import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
export declare class WorkItemStateItemStore extends BaseStore<IDictionaryStringTo<WorkItemStateColor[]>, WorkItemStateColor[], string> {
    constructor();
    getItem(witName: string): WorkItemStateColor[];
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
