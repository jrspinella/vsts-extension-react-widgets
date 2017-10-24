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
    var TeamFieldStore = (function (_super) {
        __extends(TeamFieldStore, _super);
        function TeamFieldStore() {
            var _this = _super.call(this) || this;
            _this.items = {};
            return _this;
        }
        TeamFieldStore.prototype.getItem = function (teamId) {
            return this.items[teamId.toLowerCase()] || null;
        };
        TeamFieldStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.TeamFieldActionsHub.InitializeTeamFieldItem.subscribe(function (values) {
                if (values) {
                    _this.items[values.teamId.toLowerCase()] = values.teamFieldValues;
                }
                _this.notify(null, null);
            });
        };
        TeamFieldStore.prototype.getKey = function () {
            return "TeamFieldStore";
        };
        TeamFieldStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return TeamFieldStore;
    }(BaseStore_1.BaseStore));
    exports.TeamFieldStore = TeamFieldStore;
});
