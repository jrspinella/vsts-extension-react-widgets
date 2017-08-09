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
    var WorkItemTemplateStore = (function (_super) {
        __extends(WorkItemTemplateStore, _super);
        function WorkItemTemplateStore() {
            var _this = _super.call(this) || this;
            _this._itemsIdMap = {};
            return _this;
        }
        WorkItemTemplateStore.prototype.getItem = function (id) {
            var key = (id || "").toLowerCase();
            return this._itemsIdMap[key];
        };
        WorkItemTemplateStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.addListener(function (templates) {
                if (templates) {
                    _this.items = templates;
                    _this._itemsIdMap = {};
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this._itemsIdMap[item.id.toLowerCase()] = item;
                    }
                }
                _this.emitChanged();
            });
        };
        WorkItemTemplateStore.prototype.getKey = function () {
            return "WorkItemTemplateStore";
        };
        WorkItemTemplateStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return WorkItemTemplateStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemTemplateStore = WorkItemTemplateStore;
});
