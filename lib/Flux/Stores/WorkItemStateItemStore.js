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
define(["require", "exports", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemStateItemStore = (function (_super) {
        __extends(WorkItemStateItemStore, _super);
        function WorkItemStateItemStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            return _this;
        }
        WorkItemStateItemStore.prototype.getItem = function (witName) {
            return this.items[witName.toLowerCase()];
        };
        WorkItemStateItemStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemStateItemActionsHub.InitializeWorkItemStateItems.subscribe(function (stateItems) {
                if (stateItems) {
                    _this.items[stateItems.witName.toLowerCase()] = stateItems.states;
                }
                _this.notify(null, null);
            });
        };
        WorkItemStateItemStore.prototype.getKey = function () {
            return "WorkItemStateItemStore";
        };
        WorkItemStateItemStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return WorkItemStateItemStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemStateItemStore = WorkItemStateItemStore;
});
