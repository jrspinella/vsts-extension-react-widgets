var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./BaseStore", "../Actions/ActionsHub"], function (require, exports, BaseStore_1, ActionsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemStore = (function (_super) {
        __extends(WorkItemStore, _super);
        function WorkItemStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            return _this;
        }
        WorkItemStore.prototype.getItem = function (workItemId) {
            return this.items[workItemId];
        };
        WorkItemStore.prototype.getItems = function (workItemIds) {
            var workItems = [];
            for (var _i = 0, workItemIds_1 = workItemIds; _i < workItemIds_1.length; _i++) {
                var workItemId = workItemIds_1[_i];
                if (this.items[workItemId]) {
                    workItems.push(this.items[workItemId]);
                }
            }
            return workItems;
        };
        WorkItemStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemActionsHub.AddOrUpdateWorkItems.addListener(function (workItems) {
                if (workItems) {
                    for (var _i = 0, workItems_1 = workItems; _i < workItems_1.length; _i++) {
                        var workItem = workItems_1[_i];
                        _this._addWorkItem(workItem);
                    }
                }
                _this.emitChanged();
            });
            ActionsHub_1.WorkItemActionsHub.DeleteWorkItems.addListener(function (workItemIds) {
                if (workItemIds) {
                    for (var _i = 0, workItemIds_2 = workItemIds; _i < workItemIds_2.length; _i++) {
                        var id = workItemIds_2[_i];
                        _this._removeWorkItem(id);
                    }
                }
                _this.emitChanged();
            });
            ActionsHub_1.WorkItemActionsHub.ClearWorkItems.addListener(function () {
                _this.clearStore();
                _this.emitChanged();
            });
        };
        WorkItemStore.prototype.getKey = function () {
            return "WorkItemStore";
        };
        WorkItemStore.prototype.clearStore = function () {
            this.items = {};
        };
        WorkItemStore.prototype.convertItemKeyToString = function (key) {
            return "" + key;
        };
        WorkItemStore.prototype._addWorkItem = function (workItem) {
            if (!workItem) {
                return;
            }
            this.items[workItem.id] = workItem;
        };
        WorkItemStore.prototype._removeWorkItem = function (workItemId) {
            delete this.items[workItemId];
        };
        return WorkItemStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemStore = WorkItemStore;
});
