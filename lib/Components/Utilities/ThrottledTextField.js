define(["require", "exports", "tslib", "react", "../../Utilities/Core", "OfficeFabric/TextField", "OfficeFabric/Utilities"], function (require, exports, tslib_1, React, Core_1, TextField_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThrottledTextField = (function (_super) {
        tslib_1.__extends(ThrottledTextField, _super);
        function ThrottledTextField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ThrottledTextField.prototype.render = function () {
            var props = tslib_1.__assign({}, this.props, { onChanged: this._onChange });
            return React.createElement(TextField_1.TextField, tslib_1.__assign({}, props));
        };
        ThrottledTextField.prototype.componentWillUnmount = function () {
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
        };
        ThrottledTextField.prototype._onChange = function (newValue) {
            var _this = this;
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
            var fireChange = function () {
                if (_this.props.onChanged) {
                    _this.props.onChanged(newValue);
                }
            };
            if (this.props.delay == null) {
                fireChange();
            }
            else {
                this._delayedFunction = Core_1.CoreUtils.delay(this, this.props.delay, function () {
                    fireChange();
                });
            }
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], ThrottledTextField.prototype, "_onChange", null);
        return ThrottledTextField;
    }(React.Component));
    exports.ThrottledTextField = ThrottledTextField;
});
