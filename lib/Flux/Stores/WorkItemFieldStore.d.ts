import { BaseStore } from "./BaseStore";
import { WorkItemField } from "TFS/WorkItemTracking/Contracts";
export declare class WorkItemFieldStore extends BaseStore<WorkItemField[], WorkItemField, string> {
    private _itemsRefNameMap;
    private _itemsNameMap;
    constructor();
    getItem(fieldRefName: string): WorkItemField;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
