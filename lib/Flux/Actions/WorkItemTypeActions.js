define(["require", "exports", "tslib", "../../Utilities/String", "../Stores/BaseStore", "../Stores/WorkItemTypeStore", "./ActionsHub", "TFS/WorkItemTracking/RestClient"], function (require, exports, tslib_1, String_1, BaseStore_1, WorkItemTypeStore_1, ActionsHub_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTypeActions;
    (function (WorkItemTypeActions) {
        var workItemTypeStore = BaseStore_1.StoreFactory.getInstance(WorkItemTypeStore_1.WorkItemTypeStore);
        function initializeWorkItemTypes() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemTypes, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemTypeStore.isLoaded()) return [3, 1];
                            ActionsHub_1.WorkItemTypeActionsHub.InitializeWorkItemTypes.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemTypeStore.isLoading()) return [3, 5];
                            workItemTypeStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getWorkItemTypes(VSS.getWebContext().project.id)];
                        case 3:
                            workItemTypes = _a.sent();
                            workItemTypes.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.WorkItemTypeActionsHub.InitializeWorkItemTypes.invoke(workItemTypes);
                            workItemTypeStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemTypeStore.setLoading(false);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemTypeActions.initializeWorkItemTypes = initializeWorkItemTypes;
    })(WorkItemTypeActions = exports.WorkItemTypeActions || (exports.WorkItemTypeActions = {}));
});
