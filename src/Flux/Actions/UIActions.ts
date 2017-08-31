import { UIActionsHub } from "./ActionsHub";

export module UIActions {
    export function refreshQueryResultGrid() {
        UIActionsHub.RefreshQueryInGrid.invoke(null);
    }
}