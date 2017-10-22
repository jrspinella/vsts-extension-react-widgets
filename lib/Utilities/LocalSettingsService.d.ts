export declare enum WebSettingsScope {
    User = 1,
    Team = 2,
    UserAndTeam = 3,
    Project = 4,
    ProjectAndUser = 5,
    Collection = 6,
    Root = 7,
}
export declare module LocalSettingsService {
    function writeLocalSetting(key: string, value: string, scope: WebSettingsScope): void;
    function readLocalSetting(key: string, scope: WebSettingsScope, defaultValue?: string): string;
    function removeLocalSetting(key: string, scope: WebSettingsScope): void;
}
