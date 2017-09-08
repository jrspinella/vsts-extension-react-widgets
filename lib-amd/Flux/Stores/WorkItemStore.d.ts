import { BaseStore } from "./BaseStore";
import { WorkItem } from "TFS/WorkItemTracking/Contracts";
export declare class WorkItemStore extends BaseStore<IDictionaryNumberTo<WorkItem>, WorkItem, number> {
    constructor();
    getItem(workItemId: number): WorkItem;
    getItems(workItemIds: number[]): WorkItem[];
    protected initializeActionListeners(): void;
    getKey(): string;
    clearStore(): void;
    protected convertItemKeyToString(key: number): string;
    private _addWorkItem(workItem);
    private _removeWorkItem(workItemId);
}
