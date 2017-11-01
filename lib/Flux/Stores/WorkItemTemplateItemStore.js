define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateItemStore = (function (_super) {
        tslib_1.__extends(WorkItemTemplateItemStore, _super);
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
            ActionsHub_1.WorkItemTemplateItemActionsHub.InitializeWorkItemTemplateItem.subscribe(function (template) {
                if (template) {
                    _this.items[template.id.toLowerCase()] = template;
                }
                _this.notify(null, null);
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
