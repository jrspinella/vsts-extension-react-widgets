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
define(["require", "exports", "react", "OfficeFabric/Icon", "OfficeFabric/Label", "OfficeFabric/Tooltip", "./MessagePanel.scss"], function (require, exports, React, Icon_1, Label_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Warning"] = 1] = "Warning";
        MessageType[MessageType["Info"] = 2] = "Info";
        MessageType[MessageType["Success"] = 3] = "Success";
    })(MessageType = exports.MessageType || (exports.MessageType = {}));
    var MessagePanel = (function (_super) {
        __extends(MessagePanel, _super);
        function MessagePanel(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.state = {};
            return _this;
        }
        MessagePanel.prototype.render = function () {
            var _this = this;
            if (this.state.isClosed) {
                return null;
            }
            var className = "message-panel";
            var iconName;
            switch (this.props.messageType) {
                case MessageType.Error:
                    iconName = "ErrorBadge";
                    className += " message-error";
                    break;
                case MessageType.Warning:
                    iconName = "Warning";
                    className += " message-warning";
                    break;
                case MessageType.Success:
                    iconName = "Completed";
                    className += " message-success";
                    break;
                default:
                    iconName = "Info";
                    className += " message-info";
                    break;
            }
            return (React.createElement("div", { className: className },
                React.createElement(Icon_1.Icon, { className: "icon", iconName: iconName }),
                React.createElement(Label_1.Label, { className: "message-text" }, this.props.message),
                this.props.closeable &&
                    React.createElement("span", { className: "close-icon", onClick: function () { return _this.setState({ isClosed: true }); } },
                        React.createElement(Tooltip_1.TooltipHost, { content: "Close", delay: Tooltip_1.TooltipDelay.zero, directionalHint: Tooltip_1.DirectionalHint.bottomCenter },
                            React.createElement(Icon_1.Icon, { iconName: "Cancel" })))));
        };
        return MessagePanel;
    }(React.Component));
    exports.MessagePanel = MessagePanel;
});
