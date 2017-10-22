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
    var WorkItemTemplateItemStore = (function (_super) {
        __extends(WorkItemTemplateItemStore, _super);
        function WorkItemTemplateItemStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            return _this;
        }
        WorkItemTemplateItemStore.prototype.getItem = function (id) {
            var key = (id || "").toLowerCase();
            return this.items[key];
        };
        WorkItemTemplateItemStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.addListener(function (template) {
                if (template) {
                    _this.items[template.id.toLowerCase()] = template;
                }
                _this.emitChanged();
            });
        };
        WorkItemTemplateItemStore.prototype.getKey = function () {
            return "WorkItemTemplateItemStore";
        };
        WorkItemTemplateItemStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return WorkItemTemplateItemStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemTemplateItemStore = WorkItemTemplateItemStore;
});
