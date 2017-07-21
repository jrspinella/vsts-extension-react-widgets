import { WorkItem } from "TFS/WorkItemTracking/Contracts";
export declare module WorkItemActions {
    function initializeWorkItems(ids: number[], fields?: string[]): Promise<void>;
    function refreshWorkItems(ids: number[], fields?: string[]): Promise<void>;
    function initializeWorkItem(id: number, fields?: string[]): Promise<void>;
    function refreshWorkItem(id: number, fields?: string[]): Promise<void>;
    function createWorkItem(workItemType: string, fieldValues: IDictionaryStringTo<string>): Promise<WorkItem>;
    function updateWorkItem(workItemId: number, fieldValues: IDictionaryStringTo<string>): Promise<WorkItem>;
    function refreshWorkItemInStore(workItems: WorkItem[]): void;
}
