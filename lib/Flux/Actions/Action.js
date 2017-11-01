define(["require", "exports", "tslib", "VSSUI/Utilities/Observable"], function (require, exports, tslib_1, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action = (function (_super) {
        tslib_1.__extends(Action, _super);
        function Action() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Action.prototype.invoke = function (payload) {
            if (Action.executing) {
                throw new Error("Cannot invoke an action from inside another action.");
            }
            Action.executing = true;
            try {
                this.notify(payload, null);
            }
            finally {
                Action.executing = false;
            }
        };
        Action.executing = false;
        return Action;
    }(Observable_1.Observable));
    exports.Action = Action;
});
