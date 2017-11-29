import { ArrayUtils } from "./Array";
import { StringUtils } from "./String";

import { WorkItem, WorkItemField } from "TFS/WorkItemTracking/Contracts";
import {
    IWorkItemFormService, WorkItemFormNavigationService, WorkItemFormService
} from "TFS/WorkItemTracking/Services";

export module WorkItemFormHelpers {
    var workItemFormService: IWorkItemFormService;
    
    async function getFormService(): Promise<IWorkItemFormService> {
        if (!workItemFormService) {
            workItemFormService = await WorkItemFormService.getService();
        }

        return workItemFormService;
    }

    export async function openWorkItemDialog(e: React.MouseEvent<HTMLElement>, item: WorkItem): Promise<WorkItem> {
        const newTab = e ? e.ctrlKey : false;
        const workItemNavSvc = await WorkItemFormNavigationService.getService();
        return await workItemNavSvc.openWorkItem(item.id, newTab);
    }
    
    export async function getWorkItemAllowedFieldValues(fieldRefName: string): Promise<string[]> {
        const workItemFormService = await getFormService();
        return await workItemFormService.getAllowedFieldValues(fieldRefName) as string[];
    }

    export async function getWorkItemFieldValue(fieldName: string): Promise<Object> {
        const workItemFormService = await getFormService();
        return await workItemFormService.getFieldValue(fieldName);
    }

    export async function getWorkItemFieldValues(fieldNames: string[]): Promise<IDictionaryStringTo<Object>> {
        const workItemFormService = await getFormService();
        return await workItemFormService.getFieldValues(fieldNames);
    }

    export async function getWorkItemFields(): Promise<WorkItemField[]> {
        const workItemFormService = await getFormService();
        return await workItemFormService.getFields();
    }

    export async function getWorkItemField(fieldName: string): Promise<WorkItemField> {
        const fields = await this.getWorkItemFields();
        const field = ArrayUtils.first(fields, (f: WorkItemField) => {
            return StringUtils.equals(f.name, fieldName, true) || StringUtils.equals(f.referenceName, fieldName, true);
        });

        if (field) {
            return field;
        }
        else {
            throw `Field '${fieldName}' does not exist in this work item type`;
        }        
    }

    export async function setWorkItemFieldValue(fieldRefName: string, value: Object): Promise<boolean> {
        const workItemFormService = await getFormService();
        return await workItemFormService.setFieldValue(fieldRefName, value);
    }

    export async function setWorkItemFieldValues(fieldToValueMap: IDictionaryStringTo<Object>): Promise<IDictionaryStringTo<boolean>> {
        const workItemFormService = await getFormService();
        return await workItemFormService.setFieldValues(fieldToValueMap);
    }

    export async function saveWorkItem(successCallback: () => void, errorCallback: () => void): Promise<void> {
        const workItemFormService = await getFormService();
        return await workItemFormService.beginSaveWorkItem(successCallback, errorCallback);
    }  
}