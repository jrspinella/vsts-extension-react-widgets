define(["require", "exports", "tslib", "../Stores/BaseStore", "../Stores/WorkItemStateItemStore", "./ActionsHub", "TFS/WorkItemTracking/RestClient"], function (require, exports, tslib_1, BaseStore_1, WorkItemStateItemStore_1, ActionsHub_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemStateItemActions;
    (function (WorkItemStateItemActions) {
        var workItemStateItemStore = BaseStore_1.StoreFactory.getInstance(WorkItemStateItemStore_1.WorkItemStateItemStore);
        function initializeWorkItemStates(workItemTypeName) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemTypeStates, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemStateItemStore.isLoaded(workItemTypeName)) return [3, 1];
                            ActionsHub_1.WorkItemStateItemActionsHub.InitializeWorkItemStateItems.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemStateItemStore.isLoading(workItemTypeName)) return [3, 5];
                            workItemStateItemStore.setLoading(true, workItemTypeName);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getWorkItemTypeStates(VSS.getWebContext().project.id, workItemTypeName)];
                        case 3:
                            workItemTypeStates = _a.sent();
                            ActionsHub_1.WorkItemStateItemActionsHub.InitializeWorkItemStateItems.invoke({ witName: workItemTypeName, states: workItemTypeStates });
                            workItemStateItemStore.setLoading(false, workItemTypeName);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemStateItemStore.setLoading(false, workItemTypeName);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemStateItemActions.initializeWorkItemStates = initializeWorkItemStates;
    })(WorkItemStateItemActions = exports.WorkItemStateItemActions || (exports.WorkItemStateItemActions = {}));
});
