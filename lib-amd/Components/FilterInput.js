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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "react", "OfficeFabric/TextField", "OfficeFabric/Icon", "OfficeFabric/Utilities", "./BaseComponent", "./FilterInput.scss"], function (require, exports, React, TextField_1, Icon_1, Utilities_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FilterInput = (function (_super) {
        __extends(FilterInput, _super);
        function FilterInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FilterInput.prototype.getDefaultClassName = function () {
            return "filter-input";
        };
        FilterInput.prototype.render = function () {
            var _this = this;
            var iconProps = this.state.value ? {
                iconName: "Clear",
                className: "clear-filter-input",
                tabIndex: 0,
                onClick: this._clearText,
                onKeyPress: this._onClearInputKeyPress,
                role: "button"
            } : undefined;
            return React.createElement(TextField_1.TextField, { componentRef: function (element) { return _this._textField = element; }, onRenderAddon: function () { return React.createElement(Icon_1.Icon, { iconName: "Filter" }); }, className: this.getClassName(), iconProps: iconProps, value: this.state.value, onChanged: this._onChange, onKeyDown: this._onKeyDown, placeholder: this.props.placeholder });
        };
        FilterInput.prototype._onKeyDown = function (ev) {
            if (ev.which === 13) {
                if (this.props.onSearch) {
                    this.props.onSearch(this.state.value);
                }
            }
            else if (ev.which === 27) {
                this._clearText();
            }
        };
        FilterInput.prototype._onChange = function (newValue) {
            this.updateState({ value: newValue });
            if (this.props.onChange) {
                this.props.onChange(newValue);
            }
        };
        FilterInput.prototype._onClearInputKeyPress = function (ev) {
            if (ev.which === 13 || ev.which === 32) {
                this._clearText();
            }
        };
        FilterInput.prototype._clearText = function () {
            this.updateState({ value: "" });
            if (this.props.onClear) {
                this.props.onClear();
            }
            this._focus();
        };
        FilterInput.prototype._focus = function () {
            return this._textField.focus();
        };
        __decorate([
            Utilities_1.autobind
        ], FilterInput.prototype, "_onKeyDown", null);
        __decorate([
            Utilities_1.autobind
        ], FilterInput.prototype, "_onChange", null);
        __decorate([
            Utilities_1.autobind
        ], FilterInput.prototype, "_onClearInputKeyPress", null);
        __decorate([
            Utilities_1.autobind
        ], FilterInput.prototype, "_clearText", null);
        return FilterInput;
    }(BaseComponent_1.BaseComponent));
    exports.FilterInput = FilterInput;
});
