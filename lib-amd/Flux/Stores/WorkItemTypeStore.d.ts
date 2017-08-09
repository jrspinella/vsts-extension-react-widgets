import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTypeStore extends BaseStore<WorkItemType[], WorkItemType, string> {
    private _itemsIdMap;
    constructor();
    getItem(typeName: string): WorkItemType;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
