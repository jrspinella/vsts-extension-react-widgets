define(["require", "exports", "tslib", "../../Utilities/String", "../Stores/BaseStore", "../Stores/GitRepoStore", "./ActionsHub", "TFS/VersionControl/GitRestClient"], function (require, exports, tslib_1, String_1, BaseStore_1, GitRepoStore_1, ActionsHub_1, GitClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GitRepoActions;
    (function (GitRepoActions) {
        var gitRepoStore = BaseStore_1.StoreFactory.getInstance(GitRepoStore_1.GitRepoStore);
        function initializeGitRepos() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var gitRepos, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!gitRepoStore.isLoaded()) return [3, 1];
                            ActionsHub_1.GitRepoActionsHub.InitializeGitRepos.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!gitRepoStore.isLoading()) return [3, 5];
                            gitRepoStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, GitClient.getClient().getRepositories(VSS.getWebContext().project.id)];
                        case 3:
                            gitRepos = _a.sent();
                            gitRepos.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.GitRepoActionsHub.InitializeGitRepos.invoke(gitRepos);
                            gitRepoStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            gitRepoStore.setLoading(false);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        GitRepoActions.initializeGitRepos = initializeGitRepos;
    })(GitRepoActions = exports.GitRepoActions || (exports.GitRepoActions = {}));
});
