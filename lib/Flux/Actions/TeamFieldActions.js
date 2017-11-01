define(["require", "exports", "tslib", "../Stores/BaseStore", "../Stores/TeamFieldStore", "./ActionsHub", "TFS/Work/RestClient"], function (require, exports, tslib_1, BaseStore_1, TeamFieldStore_1, ActionsHub_1, WorkClient) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamFieldActions;
    (function (TeamFieldActions) {
        var teamFieldStore = BaseStore_1.StoreFactory.getInstance(TeamFieldStore_1.TeamFieldStore);
        function initializeTeamFields(teamId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var teamContext, teamFieldValues, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!teamFieldStore.isLoaded(teamId)) return [3, 1];
                            ActionsHub_1.TeamFieldActionsHub.InitializeTeamFieldItem.invoke(null);
                            return [3, 5];
                        case 1:
                            if (!!teamFieldStore.isLoading(teamId)) return [3, 5];
                            teamFieldStore.setLoading(true, teamId);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            teamContext = {
                                project: "",
                                projectId: VSS.getWebContext().project.id,
                                team: "",
                                teamId: teamId
                            };
                            return [4, WorkClient.getClient().getTeamFieldValues(teamContext)];
                        case 3:
                            teamFieldValues = _a.sent();
                            ActionsHub_1.TeamFieldActionsHub.InitializeTeamFieldItem.invoke({ teamId: teamId, teamFieldValues: teamFieldValues });
                            teamFieldStore.setLoading(false, teamId);
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            teamFieldStore.setLoading(false, teamId);
                            throw e_1.message;
                        case 5: return [2];
                    }
                });
            });
        }
        TeamFieldActions.initializeTeamFields = initializeTeamFields;
    })(TeamFieldActions = exports.TeamFieldActions || (exports.TeamFieldActions = {}));
});
