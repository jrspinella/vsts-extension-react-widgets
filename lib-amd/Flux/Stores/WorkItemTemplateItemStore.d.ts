import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTemplateItemStore extends BaseStore<WorkItemTemplate[], WorkItemTemplate, string> {
    private _itemsIdMap;
    constructor();
    getItem(id: string): WorkItemTemplate;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
