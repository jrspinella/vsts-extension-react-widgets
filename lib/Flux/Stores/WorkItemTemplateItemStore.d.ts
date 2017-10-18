import { WorkItemTemplate } from "TFS/WorkItemTracking/Contracts";
import { BaseStore } from "./BaseStore";
export declare class WorkItemTemplateItemStore extends BaseStore<IDictionaryStringTo<WorkItemTemplate>, WorkItemTemplate, string> {
    constructor();
    getItem(id: string): WorkItemTemplate;
    protected initializeActionListeners(): void;
    getKey(): string;
    protected convertItemKeyToString(key: string): string;
}
