define(["require", "exports", "tslib", "react", "../InputError", "../Utilities/BaseFluxComponent", "OfficeFabric/Label", "OfficeFabric/Utilities", "VSS/Controls", "VSS/Controls/Combos", "./VssCombo.scss"], function (require, exports, tslib_1, React, InputError_1, BaseFluxComponent_1, Label_1, Utilities_1, Controls, Combos) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VssCombo = (function (_super) {
        tslib_1.__extends(VssCombo, _super);
        function VssCombo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VssCombo.prototype.render = function () {
            return React.createElement("div", { className: Utilities_1.css("vss-combobox", this.props.className) },
                this.props.label && React.createElement(Label_1.Label, { className: "combo-label", required: this.props.required }, this.props.label),
                React.createElement("div", { ref: "container" }),
                this.props.error && React.createElement(InputError_1.InputError, { error: this.props.error }));
        };
        VssCombo.prototype.componentDidMount = function () {
            var _this = this;
            this._control = Controls.Control.create(Combos.Combo, $(this.refs.container), tslib_1.__assign({}, this.props.options || {}, { change: function () {
                    _this.props.onChange(_this._control.getText());
                } }));
            this._control.setInputText(this.props.value || "");
        };
        VssCombo.prototype.componentWillUnmount = function () {
            this._dispose();
        };
        VssCombo.prototype.componentWillReceiveProps = function (nextProps) {
            this._control.setInputText(nextProps.value || "");
        };
        VssCombo.prototype._dispose = function () {
            if (this._control) {
                this._control.dispose();
                this._control = null;
            }
        };
        return VssCombo;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.VssCombo = VssCombo;
});
