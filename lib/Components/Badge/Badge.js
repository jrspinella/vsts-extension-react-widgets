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
define(["require", "exports", "react", "../Utilities/BaseComponent", "OfficeFabric/Callout", "OfficeFabric/Icon", "OfficeFabric/Label", "./Badge.scss"], function (require, exports, React, BaseComponent_1, Callout_1, Icon_1, Label_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Badge = (function (_super) {
        __extends(Badge, _super);
        function Badge() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._onMouseOver = function () {
                if (_this.props.showCalloutOnHover) {
                    _this.setState({
                        isCalloutVisible: true
                    });
                }
            };
            _this._onMouseOut = function () {
                if (_this.props.showCalloutOnHover) {
                    _this._dismissCallout();
                }
            };
            _this._onClickCallout = function () {
                if (!_this.props.showCalloutOnHover) {
                    _this.setState({
                        isCalloutVisible: !_this.state.isCalloutVisible
                    });
                }
            };
            _this._dismissCallout = function () {
                _this.setState({
                    isCalloutVisible: false
                });
            };
            return _this;
        }
        Badge.prototype.initializeState = function () {
            this.state = {
                isCalloutVisible: false
            };
        };
        Badge.prototype.getDefaultClassName = function () {
            return "badge";
        };
        Badge.prototype.render = function () {
            var _this = this;
            return React.createElement("div", { className: this.getClassName() },
                React.createElement("div", { className: "badge-container", onMouseEnter: this._onMouseOver, onMouseLeave: this._onMouseOut, onClick: this._onClickCallout },
                    React.createElement("div", { ref: function (element) { return _this._calloutTargetElement = element; } },
                        React.createElement(Icon_1.Icon, { iconName: "Ringer", className: "badge-icon" })),
                    React.createElement(Label_1.Label, { className: "badge-notification-count" }, this.props.notificationCount)),
                this.state.isCalloutVisible &&
                    React.createElement(Callout_1.Callout, { gapSpace: 0, target: this._calloutTargetElement, onDismiss: this._dismissCallout, setInitialFocus: true, isBeakVisible: true, directionalHint: this.props.directionalHint || Callout_1.DirectionalHint.bottomRightEdge },
                        React.createElement("div", { className: "badge-callout-container" }, this.props.children)));
        };
        return Badge;
    }(BaseComponent_1.BaseComponent));
    exports.Badge = Badge;
});
