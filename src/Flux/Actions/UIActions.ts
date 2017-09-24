import { UIActionsHub } from "./ActionsHub";

export module UIActions {
    export function refreshQueryResultGrid() {
        UIActionsHub.RefreshQueryInGrid.invoke(null);
    }

    export function onGridItemCountChanged(newCount: number) {
        UIActionsHub.OnGridItemCountChanged.invoke(newCount);
    }
}