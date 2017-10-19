import { WorkItemStateItemActionsHub } from "../Actions/ActionsHub";
import { BaseStore } from "./BaseStore";

import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";


export class WorkItemStateItemStore extends BaseStore<IDictionaryStringTo<WorkItemStateColor[]>, WorkItemStateColor[], string> {
    constructor() {
        super();
        this.items = {};    
    }

    public getItem(witName: string): WorkItemStateColor[] {
        return this.items[witName.toLowerCase()];
    }

    protected initializeActionListeners() {
        WorkItemStateItemActionsHub.InitializeWorkItemStateItems.addListener((stateItems: {witName: string, states: WorkItemStateColor[]}) => {
            if (stateItems) {               
                this.items[stateItems.witName.toLowerCase()] = stateItems.states;
            }

            this.emitChanged();
        });
    }    

    public getKey(): string {
        return "WorkItemStateItemStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}