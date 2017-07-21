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
define(["require", "exports", "VSS/Utils/String", "VSS/Utils/Array", "./BaseStore", "../Actions/ActionsHub"], function (require, exports, Utils_String, Utils_Array, BaseStore_1, ActionsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemFieldStore = (function (_super) {
        __extends(WorkItemFieldStore, _super);
        function WorkItemFieldStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemFieldStore.prototype.getItem = function (fieldRefName) {
            return Utils_Array.first(this.items || [], function (item) { return Utils_String.equals(item.referenceName, fieldRefName, true) || Utils_String.equals(item.name, fieldRefName, true); });
        };
        WorkItemFieldStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemFieldActionsHub.InitializeWorkItemFields.addListener(function (fields) {
                if (fields) {
                    _this.items = fields;
                }
                _this.emitChanged();
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
