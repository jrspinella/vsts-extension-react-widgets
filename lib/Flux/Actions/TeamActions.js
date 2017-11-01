define(["require", "exports", "tslib", "../../Utilities/String", "../Stores/BaseStore", "../Stores/TeamStore", "./ActionsHub", "TFS/Core/RestClient"], function (require, exports, tslib_1, String_1, BaseStore_1, TeamStore_1, ActionsHub_1, CoreClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamActions;
    (function (TeamActions) {
        var teamStore = BaseStore_1.StoreFactory.getInstance(TeamStore_1.TeamStore);
        function initializeTeams() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var teams, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!teamStore.isLoaded()) return [3, 1];
                            ActionsHub_1.TeamActionsHub.InitializeTeams.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!teamStore.isLoading()) return [3, 5];
                            teamStore.setLoading(true);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, CoreClient.getClient().getTeams(VSS.getWebContext().project.id, 300)];
                        case 3:
                            teams = _a.sent();
                            teams.sort(function (a, b) { return String_1.StringUtils.localeIgnoreCaseComparer(a.name, b.name); });
                            ActionsHub_1.TeamActionsHub.InitializeTeams.invoke(teams);
                            teamStore.setLoading(false);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            teamStore.setLoading(false);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        TeamActions.initializeTeams = initializeTeams;
    })(TeamActions = exports.TeamActions || (exports.TeamActions = {}));
});
