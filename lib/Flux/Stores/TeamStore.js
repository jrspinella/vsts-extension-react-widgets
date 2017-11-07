define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamStore = (function (_super) {
        tslib_1.__extends(TeamStore, _super);
        function TeamStore() {
            var _this = _super.call(this) || this;
            _this._itemsIdMap = {};
            _this._itemsNameMap = {};
            return _this;
        }
        TeamStore.prototype.getItem = function (idOrName) {
            var key = (idOrName || "").toLowerCase();
            return this._itemsIdMap[key] || this._itemsNameMap[key];
        };
        TeamStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.TeamActionsHub.InitializeTeams.addListener(function (teams) {
                if (teams) {
                    _this.items = teams;
                    _this._itemsIdMap = {};
                    _this._itemsNameMap = {};
                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this._itemsIdMap[item.id.toLowerCase()] = item;
                        _this._itemsNameMap[item.name.toLowerCase()] = item;
                    }
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
