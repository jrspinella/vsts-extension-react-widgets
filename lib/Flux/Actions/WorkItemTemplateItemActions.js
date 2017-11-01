define(["require", "exports", "tslib", "../Stores/BaseStore", "../Stores/WorkItemTemplateItemStore", "./ActionsHub", "TFS/WorkItemTracking/RestClient"], function (require, exports, tslib_1, BaseStore_1, WorkItemTemplateItemStore_1, ActionsHub_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateItemActions;
    (function (WorkItemTemplateItemActions) {
        var workItemTemplateItemStore = BaseStore_1.StoreFactory.getInstance(WorkItemTemplateItemStore_1.WorkItemTemplateItemStore);
        function initializeWorkItemTemplateItem(teamId, id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemTemplate, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemTemplateItemStore.isLoaded(id)) return [3, 1];
                            ActionsHub_1.WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemTemplateItemStore.isLoading(id)) return [3, 5];
                            workItemTemplateItemStore.setLoading(true, id);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getTemplate(VSS.getWebContext().project.id, teamId, id)];
                        case 3:
                            workItemTemplate = _a.sent();
                            ActionsHub_1.WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.invoke(workItemTemplate);
                            workItemTemplateItemStore.setLoading(false, id);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemTemplateItemStore.setLoading(false, id);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemTemplateItemActions.initializeWorkItemTemplateItem = initializeWorkItemTemplateItem;
    })(WorkItemTemplateItemActions = exports.WorkItemTemplateItemActions || (exports.WorkItemTemplateItemActions = {}));
});
