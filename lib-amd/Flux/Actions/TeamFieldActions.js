var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "TFS/Work/RestClient", "../Stores/BaseStore", "../Stores/TeamFieldStore", "./ActionsCreator"], function (require, exports, WorkClient, BaseStore_1, TeamFieldStore_1, ActionsCreator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamFieldActions;
    (function (TeamFieldActions) {
        var teamFieldStore = BaseStore_1.StoreFactory.getInstance(TeamFieldStore_1.TeamFieldStore);
        function initializeTeamFields(teamId) {
            return __awaiter(this, void 0, void 0, function () {
                var teamContext, teamFieldValues, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!teamFieldStore.isLoaded(teamId)) return [3, 1];
                            ActionsCreator_1.TeamFieldActionsCreator.InitializeTeamFieldItem.invoke(null);
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
                            teamFieldStore.setLoading(false, teamId);
                            teamFieldStore.setError(null, teamId);
                            ActionsCreator_1.TeamFieldActionsCreator.InitializeTeamFieldItem.invoke({ teamId: teamId, teamFieldValues: teamFieldValues });
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            teamFieldStore.setLoading(false, teamId);
                            teamFieldStore.setError(e_1.message || e_1, teamId);
                            return [3, 5];
                        case 5: return [2];
                    }
                });
            });
        }
        TeamFieldActions.initializeTeamFields = initializeTeamFields;
    })(TeamFieldActions = exports.TeamFieldActions || (exports.TeamFieldActions = {}));
});
