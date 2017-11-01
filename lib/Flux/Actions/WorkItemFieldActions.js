define(["require", "exports", "tslib", "../../Utilities/String", "../Stores/BaseStore", "../Stores/WorkItemFieldStore", "./ActionsHub", "TFS/WorkItemTracking/RestClient"], function (require, exports, tslib_1, String_1, BaseStore_1, WorkItemFieldStore_1, ActionsHub_1, WitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemFieldActions;
    (function (WorkItemFieldActions) {
        var workItemFieldStore = BaseStore_1.StoreFactory.getInstance(WorkItemFieldStore_1.WorkItemFieldStore);
        function initializeWorkItemFields() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemFields, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!workItemFieldStore.isLoaded()) return [3, 1];
                            ActionsHub_1.WorkItemFieldActionsHub.InitializeWorkItemFields.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemFieldStore.isLoading()) return [3, 5];
                            workItemFieldStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getFields(VSS.getWebContext().project.id)];
                        case 3:
                            workItemFields = _a.sent();
                            workItemFields.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.WorkItemFieldActionsHub.InitializeWorkItemFields.invoke(workItemFields);
                            workItemFieldStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemFieldStore.setLoading(false);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemFieldActions.initializeWorkItemFields = initializeWorkItemFields;
    })(WorkItemFieldActions = exports.WorkItemFieldActions || (exports.WorkItemFieldActions = {}));
});
