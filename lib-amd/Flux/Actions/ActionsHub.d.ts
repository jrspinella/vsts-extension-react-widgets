import { Action } from "./Action";
import { WorkItem, WorkItemType, WorkItemField, WorkItemTemplate, WorkItemTemplateReference, WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
import { WebApiTeam } from "TFS/Core/Contracts";
import { GitRepository } from "TFS/VersionControl/Contracts";
import { TeamFieldValues } from "TFS/Work/Contracts";
export declare module WorkItemTypeActionsHub {
    var InitializeWorkItemTypes: Action<WorkItemType[]>;
}
export declare module WorkItemFieldActionsHub {
    var InitializeWorkItemFields: Action<WorkItemField[]>;
}
export declare module WorkItemTemplateActionsHub {
    var InitializeWorkItemTemplates: Action<WorkItemTemplateReference[]>;
}
export declare module WorkItemTemplateItemActionsHub {
    var InitializeWorkItemTemplateItem: Action<WorkItemTemplate>;
}
export declare module WorkItemStateItemActionsHub {
    var InitializeWorkItemStateItems: Action<{
        witName: string;
        states: WorkItemStateColor[];
    }>;
}
export declare module TeamActionsHub {
    var InitializeTeams: Action<WebApiTeam[]>;
}
export declare module GitRepoActionsHub {
    var InitializeGitRepos: Action<GitRepository[]>;
}
export declare module TeamFieldActionsHub {
    var InitializeTeamFieldItem: Action<{
        teamId: string;
        teamFieldValues: TeamFieldValues;
    }>;
}
export declare module WorkItemActionsHub {
    var AddOrUpdateWorkItems: Action<WorkItem[]>;
    var DeleteWorkItems: Action<number[]>;
}
export declare module UIActionsHub {
    var RefreshQueryInGrid: Action<void>;
}
