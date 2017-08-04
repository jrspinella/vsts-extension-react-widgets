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
define(["require", "exports", "react", "VSS/Controls", "VSS/Controls/Combos", "../BaseComponent", "./ComboBox.scss"], function (require, exports, React, Controls, Combos, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComboBox = (function (_super) {
        __extends(ComboBox, _super);
        function ComboBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComboBox.prototype.getDefaultClassName = function () {
            return "combobox bowtie";
        };
        ComboBox.prototype.render = function () {
            return React.createElement("div", { ref: "container", className: this.getClassName() });
        };
        ComboBox.prototype.componentDidMount = function () {
            var _this = this;
            this._control = Controls.Control.create(Combos.Combo, $(this.refs.container), __assign({}, this.props.options || {}, { change: function () {
                    _this.props.onChange(_this._control.getText());
                } }));
            this._control.setInputText(this.props.value || "");
        };
        ComboBox.prototype.componentWillUnmount = function () {
            this._dispose();
        };
        ComboBox.prototype.componentWillReceiveProps = function (nextProps) {
            this._control.setInputText(nextProps.value || "");
        };
        ComboBox.prototype._dispose = function () {
            if (this._control) {
                this._control.dispose();
                this._control = null;
            }
        };
        return ComboBox;
    }(BaseComponent_1.BaseComponent));
    exports.ComboBox = ComboBox;
});
