import * as GitClient from "TFS/VersionControl/GitRestClient";
import { GitRepository } from "TFS/VersionControl/Contracts";

import { StringUtils } from "../../Utils/String";
import { StoreFactory } from "../Stores/BaseStore";
import { GitRepoStore } from "../Stores/GitRepoStore";
import { GitRepoActionsHub} from "./ActionsHub";

export module GitRepoActions {
    var gitRepoStore: GitRepoStore = StoreFactory.getInstance<GitRepoStore>(GitRepoStore);

    export async function initializeGitRepos() {
        if (gitRepoStore.isLoaded()) {
            GitRepoActionsHub.InitializeGitRepos.invoke(null);
        }
        else if (!gitRepoStore.isLoading()) {
            gitRepoStore.setLoading(true);
            try {
                const gitRepos =  await GitClient.getClient().getRepositories(VSS.getWebContext().project.id);
                gitRepos.sort((a: GitRepository, b: GitRepository) => StringUtils.localeIgnoreCaseComparer(a.name, b.name));
                GitRepoActionsHub.InitializeGitRepos.invoke(gitRepos);
                gitRepoStore.setLoading(false);
            }
            catch (e) {
                gitRepoStore.setLoading(false);
                throw e.message;
            }
        }
    }
}