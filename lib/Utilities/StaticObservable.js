define(["require", "exports", "tslib", "VSSUI/Utilities/Observable"], function (require, exports, tslib_1, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StaticObservable = (function (_super) {
        tslib_1.__extends(StaticObservable, _super);
        function StaticObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StaticObservable.getInstance = function () {
            if (!this._instance) {
                this._instance = new Observable_1.Observable();
            }
            return this._instance;
        };
        return StaticObservable;
    }(Observable_1.Observable));
    exports.StaticObservable = StaticObservable;
});
