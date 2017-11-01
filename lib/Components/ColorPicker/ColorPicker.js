define(["require", "exports", "tslib", "react", "../../Utilities/String", "../Utilities/BaseFluxComponent", "./Color", "OfficeFabric/Button", "OfficeFabric/Callout", "OfficeFabric/Label", "OfficeFabric/Utilities", "./ColorPicker.scss"], function (require, exports, tslib_1, React, String_1, BaseFluxComponent_1, Color_1, Button_1, Callout_1, Label_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorPicker = (function (_super) {
        tslib_1.__extends(ColorPicker, _super);
        function ColorPicker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorPicker.prototype.initializeState = function () {
            this.state = {
                selectedColor: this.props.selectedColor || "#FFFFFF",
                isCalloutOpen: false
            };
        };
        ColorPicker.prototype.componentWillReceiveProps = function (nextProps) {
            if (!String_1.StringUtils.equals(nextProps.selectedColor, this.state.selectedColor, true)) {
                this.setState({ selectedColor: nextProps.selectedColor || "#FFFFFF" });
            }
        };
        ColorPicker.prototype.render = function () {
            var _this = this;
            return React.createElement("div", { className: Utilities_1.css("color-picker", this.props.className) },
                this.props.label && React.createElement(Label_1.Label, { className: "color-label" }, this.props.label),
                React.createElement("div", { className: "selected-color-container", ref: function (target) { return _this._targetElement = target; } },
                    React.createElement("div", { className: "selected-color", style: { backgroundColor: this.state.selectedColor }, onClick: this._toggleCallout }),
                    React.createElement(Button_1.DefaultButton, { className: "open-callout-button", iconProps: { iconName: "ChevronDown" }, onClick: this._toggleCallout })),
                this.state.isCalloutOpen &&
                    React.createElement(Callout_1.Callout, { className: "colors-callout", isBeakVisible: false, onDismiss: this._onCalloutDismiss, setInitialFocus: true, target: this._targetElement },
                        React.createElement("ul", { className: "colors-list" }, Color_1.AccessibilityColor.FullPaletteColors.map(this._renderColorItem))));
        };
        ColorPicker.prototype._renderColorItem = function (color, index) {
            var _this = this;
            var isSelected = String_1.StringUtils.equals(this.state.selectedColor, color.asHex(), true);
            return React.createElement("li", { key: index, className: isSelected ? "color-list-item selected" : "color-list-item", onClick: function () { return _this._selectColor(color.asHex()); }, style: { backgroundColor: color.asRgb() } }, isSelected && React.createElement("div", { className: "inner" }));
        };
        ColorPicker.prototype._selectColor = function (color) {
            this.setState({ selectedColor: color, isCalloutOpen: false });
            this.props.onChange(color);
        };
        ColorPicker.prototype._toggleCallout = function () {
            this.setState({ isCalloutOpen: !this.state.isCalloutOpen });
        };
        ColorPicker.prototype._onCalloutDismiss = function () {
            this.setState({ isCalloutOpen: false });
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], ColorPicker.prototype, "_renderColorItem", null);
        tslib_1.__decorate([
            Utilities_1.autobind
        ], ColorPicker.prototype, "_toggleCallout", null);
        tslib_1.__decorate([
            Utilities_1.autobind
        ], ColorPicker.prototype, "_onCalloutDismiss", null);
        return ColorPicker;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.ColorPicker = ColorPicker;
});
