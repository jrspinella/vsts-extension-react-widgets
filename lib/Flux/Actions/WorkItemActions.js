var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../Stores/BaseStore", "../Stores/WorkItemStore", "./ActionsHub", "TFS/WorkItemTracking/Contracts", "TFS/WorkItemTracking/RestClient", "VSS/WebApi/Contracts"], function (require, exports, BaseStore_1, WorkItemStore_1, ActionsHub_1, Contracts_1, WitClient, Contracts_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemActions;
    (function (WorkItemActions) {
        var workItemStore = BaseStore_1.StoreFactory.getInstance(WorkItemStore_1.WorkItemStore);
        function initializeWorkItems(ids) {
            return __awaiter(this, void 0, void 0, function () {
                var idsToFetch, _i, ids_1, id, workItems, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(!ids || ids.length === 0)) return [3, 1];
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemStore.isLoading()) return [3, 5];
                            idsToFetch = [];
                            for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                                id = ids_1[_i];
                                if (!workItemStore.isLoaded(id)) {
                                    idsToFetch.push(id);
                                }
                            }
                            if (idsToFetch.length == 0) {
                                ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(null);
                                return [2];
                            }
                            workItemStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getWorkItems(idsToFetch, null, null, null, Contracts_1.WorkItemErrorPolicy.Omit)];
                        case 3:
                            workItems = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(filterNullWorkItems(workItems, idsToFetch));
                            workItemStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemActions.initializeWorkItems = initializeWorkItems;
        function refreshWorkItems(ids) {
            return __awaiter(this, void 0, void 0, function () {
                var workItems, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(!ids || ids.length === 0)) return [3, 1];
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemStore.isLoading()) return [3, 5];
                            workItemStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getWorkItems(ids, null, null, null, Contracts_1.WorkItemErrorPolicy.Omit)];
                        case 3:
                            workItems = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(filterNullWorkItems(workItems, ids));
                            workItemStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_2 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_2.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemActions.refreshWorkItems = refreshWorkItems;
        function initializeWorkItem(id) {
            return __awaiter(this, void 0, void 0, function () {
                var workItem, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!workItemStore.isLoaded(id)) return [3, 1];
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!workItemStore.isLoading()) return [3, 5];
                            workItemStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, WitClient.getClient().getWorkItem(id)];
                        case 3:
                            workItem = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke([workItem]);
                            workItemStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_3 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_3.message;
                        case 5: return [2];
                    }
                });
            });
        }
        WorkItemActions.initializeWorkItem = initializeWorkItem;
        function refreshWorkItem(id) {
            return __awaiter(this, void 0, void 0, function () {
                var workItem, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!workItemStore.isLoading()) return [3, 4];
                            workItemStore.setLoading(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, WitClient.getClient().getWorkItem(id)];
                        case 2:
                            workItem = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke([workItem]);
                            workItemStore.setLoading(false);
                            return [3, 4];
                        case 3:
                            e_4 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_4.message;
                        case 4: return [2];
                    }
                });
            });
        }
        WorkItemActions.refreshWorkItem = refreshWorkItem;
        function createWorkItem(workItemType, fieldValues) {
            return __awaiter(this, void 0, void 0, function () {
                var patchDocument, fieldRefName, workItem, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!workItemStore.isLoading()) return [3, 4];
                            workItemStore.setLoading(true);
                            patchDocument = [];
                            for (fieldRefName in fieldValues) {
                                patchDocument.push({
                                    op: Contracts_2.Operation.Add,
                                    path: "/fields/" + fieldRefName,
                                    value: fieldValues[fieldRefName]
                                });
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, WitClient.getClient().createWorkItem(patchDocument, VSS.getWebContext().project.id, workItemType)];
                        case 2:
                            workItem = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke([workItem]);
                            workItemStore.setLoading(false);
                            return [2, workItem];
                        case 3:
                            e_5 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_5.message;
                        case 4: return [2];
                    }
                });
            });
        }
        WorkItemActions.createWorkItem = createWorkItem;
        function updateWorkItem(workItemId, fieldValues) {
            return __awaiter(this, void 0, void 0, function () {
                var patchDocument, fieldRefName, workItem, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!workItemStore.isLoading()) return [3, 4];
                            workItemStore.setLoading(true);
                            patchDocument = [];
                            for (fieldRefName in fieldValues) {
                                patchDocument.push({
                                    op: Contracts_2.Operation.Add,
                                    path: "/fields/" + fieldRefName,
                                    value: fieldValues[fieldRefName]
                                });
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, WitClient.getClient().updateWorkItem(patchDocument, workItemId)];
                        case 2:
                            workItem = _a.sent();
                            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke([workItem]);
                            workItemStore.setLoading(false);
                            return [2, workItem];
                        case 3:
                            e_6 = _a.sent();
                            workItemStore.setLoading(false);
                            throw e_6.message;
                        case 4: return [2];
                    }
                });
            });
        }
        WorkItemActions.updateWorkItem = updateWorkItem;
        function refreshWorkItemInStore(workItems) {
            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.invoke(workItems);
        }
        WorkItemActions.refreshWorkItemInStore = refreshWorkItemInStore;
        function clearWorkItemsCache() {
            ActionsHub_1.WorkItemActionsHub.ClearWorkItems.invoke(null);
        }
        WorkItemActions.clearWorkItemsCache = clearWorkItemsCache;
        function filterNullWorkItems(workItems, idsToFetch) {
            var workItemsMap = {};
            for (var _i = 0, workItems_1 = workItems; _i < workItems_1.length; _i++) {
                var workItem = workItems_1[_i];
                if (workItem) {
                    workItemsMap[workItem.id] = workItem;
                }
            }
            var filteredWorkItems = [];
            for (var _a = 0, idsToFetch_1 = idsToFetch; _a < idsToFetch_1.length; _a++) {
                var witId = idsToFetch_1[_a];
                if (!workItemsMap[witId]) {
                    filteredWorkItems.push({
                        id: witId,
                        fields: {},
                        relations: [],
                        rev: -1,
                        _links: null,
                        url: null
                    });
                }
                else {
                    filteredWorkItems.push(workItemsMap[witId]);
                }
            }
            return filteredWorkItems;
        }
    })(WorkItemActions = exports.WorkItemActions || (exports.WorkItemActions = {}));
});
