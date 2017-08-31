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
define(["require", "exports", "./BaseStore", "../Actions/ActionsHub"], function (require, exports, BaseStore_1, ActionsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamStore = (function (_super) {
        __extends(TeamStore, _super);
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
