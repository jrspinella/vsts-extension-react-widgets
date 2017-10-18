import { WorkItemTemplateReference } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTemplateStore extends BaseStore<IDictionaryStringTo<WorkItemTemplateReference[]>, WorkItemTemplateReference[], string> {
    private _itemsIdMap;
    constructor();
    getItem(teamId: string): WorkItemTemplateReference[];
    getTemplate(id: string): WorkItemTemplateReference;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
