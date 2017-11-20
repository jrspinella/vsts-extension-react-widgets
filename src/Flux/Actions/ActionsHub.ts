import { Action } from "./Action";

import { WebApiTeam } from "TFS/Core/Contracts";
import { GitRepository } from "TFS/VersionControl/Contracts";
import { TeamFieldValues } from "TFS/Work/Contracts";
import {
    WorkItem, WorkItemField, WorkItemStateColor, WorkItemTemplate, WorkItemTemplateReference,
    WorkItemType,
    WorkItemClassificationNode
} from "TFS/WorkItemTracking/Contracts";

export module WorkItemTypeActionsHub {
    export var InitializeWorkItemTypes = new Action<WorkItemType[]>();
}

export module WorkItemFieldActionsHub {
    export var InitializeWorkItemFields = new Action<WorkItemField[]>();
}

export module WorkItemTemplateActionsHub {
    export var InitializeWorkItemTemplates = new Action<{teamId: string, templates: WorkItemTemplateReference[]}>();
}

export module WorkItemTemplateItemActionsHub {
    export var InitializeWorkItemTemplateItem = new Action<WorkItemTemplate>();
}

export module WorkItemStateItemActionsHub {
    export var InitializeWorkItemStateItems = new Action<{witName: string, states: WorkItemStateColor[]}>();
}

export module TeamActionsHub {
    export var InitializeTeams = new Action<WebApiTeam[]>();
}

export module GitRepoActionsHub {
    export var InitializeGitRepos = new Action<GitRepository[]>();
}

export module TeamFieldActionsHub {
    export var InitializeTeamFieldItem = new Action<{teamId: string, teamFieldValues: TeamFieldValues}>();
}

export module WorkItemActionsHub {
    export var AddOrUpdateWorkItems = new Action<WorkItem[]>();
    export var DeleteWorkItems = new Action<number[]>();
    export var ClearWorkItems = new Action();
}

export namespace ErrorMessageActionsHub {
    export const PushErrorMessage = new Action<{errorMessage: string, errorKey: string}>();
    export const DismissErrorMessage = new Action<string>();
    export const DismissAllErrorMessages = new Action<void>();
}

export module ClassificationNodeActionsHub {
    export var InitializeAreaPaths = new Action<WorkItemClassificationNode>();
    export var InitializeIterationPaths = new Action<WorkItemClassificationNode>();
}