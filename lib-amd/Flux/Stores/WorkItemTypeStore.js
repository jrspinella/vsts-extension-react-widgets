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
    var WorkItemTypeStore = (function (_super) {
        __extends(WorkItemTypeStore, _super);
        function WorkItemTypeStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemTypeStore.prototype.getItem = function (typeName) {
            return Utils_Array.first(this.items || [], function (item) { return Utils_String.equals(item.name, typeName, true); });
        };
        WorkItemTypeStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.WorkItemTypeActionsHub.InitializeWorkItemTypes.addListener(function (workItemTypes) {
                if (workItemTypes) {
                    _this.items = workItemTypes;
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
