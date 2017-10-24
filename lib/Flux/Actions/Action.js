var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "VSSUI/Utilities/Observable"], function (require, exports, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action = (function (_super) {
        __extends(Action, _super);
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
