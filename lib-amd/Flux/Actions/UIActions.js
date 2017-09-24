define(["require", "exports", "./ActionsHub"], function (require, exports, ActionsHub_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIActions;
    (function (UIActions) {
        function refreshQueryResultGrid() {
            ActionsHub_1.UIActionsHub.RefreshQueryInGrid.invoke(null);
        }
        UIActions.refreshQueryResultGrid = refreshQueryResultGrid;
        function onGridItemCountChanged(newCount) {
            ActionsHub_1.UIActionsHub.OnGridItemCountChanged.invoke(newCount);
        }
        UIActions.onGridItemCountChanged = onGridItemCountChanged;
    })(UIActions = exports.UIActions || (exports.UIActions = {}));
});
