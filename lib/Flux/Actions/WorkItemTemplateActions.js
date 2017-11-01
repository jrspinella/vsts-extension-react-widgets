define(["require", "exports", "tslib", "../../Utilities/String", "../Stores/BaseStore", "../Stores/WorkItemTemplateStore", "./ActionsHub", "TFS/WorkItemTracking/RestClient"], function (require, exports, tslib_1, String_1, BaseStore_1, WorkItemTemplateStore_1, ActionsHub_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateActions;
    (function (WorkItemTemplateActions) {
        var workItemTemplateStore = BaseStore_1.StoreFactory.getInstance(WorkItemTemplateStore_1.WorkItemTemplateStore);
        function initializeWorkItemTemplates(teamId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemTemplates, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemTemplateStore.isLoaded(teamId)) return [3, 1];
                            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemTemplateStore.isLoading(teamId)) return [3, 5];
                            workItemTemplateStore.setLoading(true, teamId);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getTemplates(VSS.getWebContext().project.id, teamId)];
                        case 3:
                            workItemTemplates = _a.sent();
                            workItemTemplates.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.invoke({ teamId: teamId, templates: workItemTemplates });
                            workItemTemplateStore.setLoading(false, teamId);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemTemplateStore.setLoading(false, teamId);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemTemplateActions.initializeWorkItemTemplates = initializeWorkItemTemplates;
    })(WorkItemTemplateActions = exports.WorkItemTemplateActions || (exports.WorkItemTemplateActions = {}));
});
