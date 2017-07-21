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
    var GitRepoStore = (function (_super) {
        __extends(GitRepoStore, _super);
        function GitRepoStore() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GitRepoStore.prototype.getItem = function (idOrName) {
            return Utils_Array.first(this.items || [], function (repo) { return Utils_String.equals(repo.id, idOrName, true) || Utils_String.equals(repo.name, idOrName, true); });
        };
        GitRepoStore.prototype.initializeActionListeners = function () {
            var _this = this;
            ActionsHub_1.GitRepoActionsHub.InitializeGitRepos.addListener(function (repos) {
                if (repos) {
                    _this.items = repos;
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
