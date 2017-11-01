define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemFieldStore = (function (_super) {
        tslib_1.__extends(WorkItemFieldStore, _super);
        function WorkItemFieldStore() {
            var _this = _super.call(this) || this;
            _this._itemsRefNameMap = {};
            _this._itemsNameMap = {};
            return _this;
        }
        WorkItemFieldStore.prototype.getItem = function (fieldRefName) {
            var key = (fieldRefName || "").toLowerCase();
            return this._itemsRefNameMap[key] || this._itemsNameMap[key];
        };
        WorkItemFieldStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemFieldActionsHub.InitializeWorkItemFields.subscribe(function (fields) {
                if (fields) {
                    _this.items = fields;
                    _this._itemsRefNameMap = {};
                    _this._itemsNameMap = {};
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this._itemsRefNameMap[item.referenceName.toLowerCase()] = item;
                        _this._itemsNameMap[item.name.toLowerCase()] = item;
                    }
                }
                _this.notify(null, null);
            });
        };
        WorkItemFieldStore.prototype.getKey = function () {
            return "WorkItemFieldStore";
        };
        WorkItemFieldStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return WorkItemFieldStore;
    }(BaseStore_1.BaseStore));
    exports.WorkItemFieldStore = WorkItemFieldStore;
});
