import Utils_String = require("VSS/Utils/String");
import Utils_Array = require("VSS/Utils/Array");
import { GitRepository } from "TFS/VersionControl/Contracts";

import { BaseStore } from "./BaseStore";
import { GitRepoActionsHub } from "../Actions/ActionsHub";

export class GitRepoStore extends BaseStore<GitRepository[], GitRepository, string> {
    public getItem(idOrName: string): GitRepository {
        return Utils_Array.first(this.items || [], (repo: GitRepository) => Utils_String.equals(repo.id, idOrName, true) || Utils_String.equals(repo.name, idOrName, true));
    }    

    protected initializeActionListeners() {
        GitRepoActionsHub.InitializeGitRepos.addListener((repos: GitRepository[]) => {
            if (repos) {
                this.items = repos;
            }

            this.emitChanged();
        });
    }

    public getKey(): string {
        return "GitRepoStore";
    }

    protected convertItemKeyToString(key: string): string {
        return key;
    }
}