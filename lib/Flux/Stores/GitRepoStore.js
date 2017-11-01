define(["require", "exports", "tslib", "../Actions/ActionsHub", "./BaseStore"], function (require, exports, tslib_1, ActionsHub_1, BaseStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GitRepoStore = (function (_super) {
        tslib_1.__extends(GitRepoStore, _super);
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
            ActionsHub_1.GitRepoActionsHub.InitializeGitRepos.subscribe(function (repos) {
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
                _this.notify(null, null);
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
