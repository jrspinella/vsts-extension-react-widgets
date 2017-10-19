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
    var GitRepoStore = (function (_super) {
        __extends(GitRepoStore, _super);
        function GitRepoStore() {
            var _this = _super.call(this) || this;
            _this._itemsIdMap = {};
            _this._itemsNameMap = {};
            return _this;
        }
        GitRepoStore.prototype.getItem = function (idOrName) {
            var key = (idOrName || "").toLowerCase();
            return this._itemsIdMap[key] || this._itemsNameMap[key];
        };
        GitRepoStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.GitRepoActionsHub.InitializeGitRepos.addListener(function (repos) {
                if (repos) {
                    _this.items = repos;
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
        GitRepoStore.prototype.getKey = function () {
            return "GitRepoStore";
        };
        GitRepoStore.prototype.convertItemKeyToString = function (key) {
            return key;
        };
        return GitRepoStore;
    }(BaseStore_1.BaseStore));
    exports.GitRepoStore = GitRepoStore;
});
