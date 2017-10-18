define(["require", "exports", "../../Utilities/EventManager"], function (require, exports, EventManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action = (function () {
        function Action() {
            this._eventManager = new EventManager_1.EventManager();
        }
        Action.prototype.invoke = function (payload) {
            if (Action.executing) {
                throw new Error("Cannot invoke an action from inside another action.");
            }
            Action.executing = true;
            try {
                this._eventManager.invokeHandlers(payload);
            }
            finally {
                Action.executing = false;
            }
        };
        Action.prototype.addListener = function (listener) {
            this._eventManager.subscribe(listener);
        };
        Action.prototype.removeListener = function (listener) {
            this._eventManager.unsubscribe(listener);
        };
        Action.prototype.emitChanged = function () {
            this._eventManager.invokeHandlers(null);
        };
        Action.executing = false;
        return Action;
    }());
    exports.Action = Action;
});
