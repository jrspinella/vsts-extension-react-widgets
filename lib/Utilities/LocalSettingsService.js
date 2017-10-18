define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebSettingsScope;
    (function (WebSettingsScope) {
        WebSettingsScope[WebSettingsScope["User"] = 1] = "User";
        WebSettingsScope[WebSettingsScope["Team"] = 2] = "Team";
        WebSettingsScope[WebSettingsScope["UserAndTeam"] = 3] = "UserAndTeam";
        WebSettingsScope[WebSettingsScope["Project"] = 4] = "Project";
        WebSettingsScope[WebSettingsScope["ProjectAndUser"] = 5] = "ProjectAndUser";
        WebSettingsScope[WebSettingsScope["Collection"] = 6] = "Collection";
        WebSettingsScope[WebSettingsScope["Root"] = 7] = "Root";
    })(WebSettingsScope = exports.WebSettingsScope || (exports.WebSettingsScope = {}));
    var LocalSettingsService;
    (function (LocalSettingsService) {
        function writeLocalSetting(key, value, scope) {
            var scopedKey = _getScopedKey(key, scope);
            if (scopedKey) {
                try {
                    window.localStorage.setItem(scopedKey, value);
                }
                catch (_a) {
                }
            }
        }
        LocalSettingsService.writeLocalSetting = writeLocalSetting;
        function readLocalSetting(key, scope, defaultValue) {
            var scopedKey = _getScopedKey(key, scope);
            if (scopedKey) {
                try {
                    return window.localStorage.getItem(scopedKey) || defaultValue;
                }
                catch (_a) {
                    return defaultValue;
                }
            }
            return null;
        }
        LocalSettingsService.readLocalSetting = readLocalSetting;
        function removeLocalSetting(key, scope) {
            var scopedKey = _getScopedKey(key, scope);
            if (scopedKey) {
                try {
                    window.localStorage.removeItem(scopedKey);
                }
                catch (_a) {
                }
            }
        }
        LocalSettingsService.removeLocalSetting = removeLocalSetting;
        function _getScopedKey(key, scope) {
            var context = VSS.getWebContext();
            var user = context.user.id;
            var team = context.team.id;
            var project = context.project.id;
            var collection = context.collection.id;
            switch (scope) {
                case WebSettingsScope.User:
                    {
                        return user + key;
                    }
                case WebSettingsScope.Team:
                    {
                        return team + key;
                    }
                case WebSettingsScope.UserAndTeam:
                    {
                        return user + "/" + team + key;
                    }
                case WebSettingsScope.Project:
                    {
                        return collection + "/" + project + key;
                    }
                case WebSettingsScope.ProjectAndUser:
                    {
                        return project + "/" + user + key;
                    }
                default:
                    return null;
            }
        }
    })(LocalSettingsService = exports.LocalSettingsService || (exports.LocalSettingsService = {}));
});
