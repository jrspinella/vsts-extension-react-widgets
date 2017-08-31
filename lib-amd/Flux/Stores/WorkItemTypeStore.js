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
    var WorkItemTypeStore = (function (_super) {
        __extends(WorkItemTypeStore, _super);
        function WorkItemTypeStore() {
            var _this = _super.call(this) || this;
            _this._itemsIdMap = {};
            return _this;
        }
        WorkItemTypeStore.prototype.getItem = function (typeName) {
            var key = (typeName || "").toLowerCase();
            return this._itemsIdMap[key];
        };
        WorkItemTypeStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemTypeActionsHub.InitializeWorkItemTypes.addListener(function (workItemTypes) {
                if (workItemTypes) {
                    _this.items = workItemTypes;
                    _this._itemsIdMap = {};
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this._itemsIdMap[item.name.toLowerCase()] = item;
                    }
                }
                _this.emitChanged();
            });
        };
        WorkItemTypeStore.prototype.getKey = function () {
            return "WorkItemTypeStore";
        };
        WorkItemTypeStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return WorkItemTypeStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemTypeStore = WorkItemTypeStore;
});
