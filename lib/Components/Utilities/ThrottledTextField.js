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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "react", "../../Utilities/Core", "OfficeFabric/TextField", "OfficeFabric/Utilities"], function (require, exports, React, Core_1, TextField_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ThrottledTextField = (function (_super) {
        __extends(ThrottledTextField, _super);
        function ThrottledTextField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ThrottledTextField.prototype.render = function () {
            var props = __assign({}, this.props, { onChanged: this._onChange });
            return React.createElement(TextField_1.TextField, __assign({}, props));
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
        __decorate([
            Utilities_1.autobind
        ], ThrottledTextField.prototype, "_onChange", null);
        return ThrottledTextField;
    }(React.Component));
    exports.ThrottledTextField = ThrottledTextField;
});
