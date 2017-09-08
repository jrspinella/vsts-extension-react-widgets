define(["require", "exports", "./Action"], function (require, exports, Action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTypeActionsHub;
    (function (WorkItemTypeActionsHub) {
        WorkItemTypeActionsHub.InitializeWorkItemTypes = new Action_1.Action();
    })(WorkItemTypeActionsHub = exports.WorkItemTypeActionsHub || (exports.WorkItemTypeActionsHub = {}));
    var WorkItemFieldActionsHub;
    (function (WorkItemFieldActionsHub) {
        WorkItemFieldActionsHub.InitializeWorkItemFields = new Action_1.Action();
    })(WorkItemFieldActionsHub = exports.WorkItemFieldActionsHub || (exports.WorkItemFieldActionsHub = {}));
    var WorkItemTemplateActionsHub;
    (function (WorkItemTemplateActionsHub) {
        WorkItemTemplateActionsHub.InitializeWorkItemTemplates = new Action_1.Action();
    })(WorkItemTemplateActionsHub = exports.WorkItemTemplateActionsHub || (exports.WorkItemTemplateActionsHub = {}));
    var WorkItemTemplateItemActionsHub;
    (function (WorkItemTemplateItemActionsHub) {
        WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem = new Action_1.Action();
    })(WorkItemTemplateItemActionsHub = exports.WorkItemTemplateItemActionsHub || (exports.WorkItemTemplateItemActionsHub = {}));
    var WorkItemStateItemActionsHub;
    (function (WorkItemStateItemActionsHub) {
        WorkItemStateItemActionsHub.InitializeWorkItemStateItems = new Action_1.Action();
    })(WorkItemStateItemActionsHub = exports.WorkItemStateItemActionsHub || (exports.WorkItemStateItemActionsHub = {}));
    var TeamActionsHub;
    (function (TeamActionsHub) {
        TeamActionsHub.InitializeTeams = new Action_1.Action();
    })(TeamActionsHub = exports.TeamActionsHub || (exports.TeamActionsHub = {}));
    var GitRepoActionsHub;
    (function (GitRepoActionsHub) {
        GitRepoActionsHub.InitializeGitRepos = new Action_1.Action();
    })(GitRepoActionsHub = exports.GitRepoActionsHub || (exports.GitRepoActionsHub = {}));
    var TeamFieldActionsHub;
    (function (TeamFieldActionsHub) {
        TeamFieldActionsHub.InitializeTeamFieldItem = new Action_1.Action();
    })(TeamFieldActionsHub = exports.TeamFieldActionsHub || (exports.TeamFieldActionsHub = {}));
    var WorkItemActionsHub;
    (function (WorkItemActionsHub) {
        WorkItemActionsHub.AddOrUpdateWorkItems = new Action_1.Action();
        WorkItemActionsHub.DeleteWorkItems = new Action_1.Action();
        WorkItemActionsHub.ClearWorkItems = new Action_1.Action();
    })(WorkItemActionsHub = exports.WorkItemActionsHub || (exports.WorkItemActionsHub = {}));
    var UIActionsHub;
    (function (UIActionsHub) {
        UIActionsHub.RefreshQueryInGrid = new Action_1.Action();
    })(UIActionsHub = exports.UIActionsHub || (exports.UIActionsHub = {}));
});
