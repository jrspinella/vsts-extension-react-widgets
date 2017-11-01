define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamFieldStore = (function (_super) {
        tslib_1.__extends(TeamFieldStore, _super);
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
