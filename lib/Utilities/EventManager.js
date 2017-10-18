define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventManager = (function () {
        function EventManager() {
            this._handlers = [];
        }
        EventManager.prototype.subscribe = function (handler) {
            if (handler) {
                this._handlers.push(handler);
            }
        };
        EventManager.prototype.unsubscribe = function (handler) {
            this._handlers = this._handlers.filter(function (h) { return h !== handler; });
        };
        EventManager.prototype.invokeHandlers = function (eventArgs) {
            for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(eventArgs);
            }
        };
        return EventManager;
    }());
    exports.EventManager = EventManager;
});
