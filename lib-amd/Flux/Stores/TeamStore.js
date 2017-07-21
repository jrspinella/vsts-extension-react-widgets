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
    var TeamStore = (function (_super) {
        __extends(TeamStore, _super);
        function TeamStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamStore.prototype.getItem = function (idOrName) {
            return Utils_Array.first(this.items || [], function (team) { return Utils_String.equals(team.id, idOrName, true) || Utils_String.equals(team.name, idOrName, true); });
        };
        TeamStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.TeamActionsHub.InitializeTeams.addListener(function (teams) {
                if (teams) {
                    _this.items = teams;
                }
                _this.emitChanged();
            });
        };
        TeamStore.prototype.getKey = function () {
            return "TeamStore";
        };
        TeamStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return TeamStore;
    }(BaseStore_1.BaseStore));
    exports.TeamStore = TeamStore;
});
