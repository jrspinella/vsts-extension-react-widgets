define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemTemplateStore = (function (_super) {
        tslib_1.__extends(WorkItemTemplateStore, _super);
        function WorkItemTemplateStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            _this._itemsIdMap = {};
            return _this;
        }
        WorkItemTemplateStore.prototype.getItem = function (teamId) {
            var key = (teamId || "").toLowerCase();
            return this.items[key];
        };
        WorkItemTemplateStore.prototype.getTemplate = function (id) {
            var key = (id || "").toLowerCase();
            return this._itemsIdMap[key];
        };
        WorkItemTemplateStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemTemplateActionsHub.InitializeWorkItemTemplates.addListener(function (data) {
                if (data && data.teamId && data.templates) {
                    _this.items[data.teamId.toLowerCase()] = data.templates;
                    for (var _i = 0, _a = data.templates; _i < _a.length; _i++) {
                        var template = _a[_i];
                        _this._itemsIdMap[template.id.toLowerCase()] = template;
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
