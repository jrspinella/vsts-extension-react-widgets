define(["require", "exports", "react", "OfficeFabric/Icon", "OfficeFabric/Label", "OfficeFabric/Tooltip", "./InfoLabel.scss"], function (require, exports, React, Icon_1, Label_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoLabel = function (props) {
        return (React.createElement("div", { className: props.className ? "info-label " + props.className : "info-label" },
            React.createElement(Label_1.Label, { className: "info-label-text" }, props.label),
            React.createElement(Tooltip_1.TooltipHost, { content: props.info, delay: Tooltip_1.TooltipDelay.zero, directionalHint: Tooltip_1.DirectionalHint.bottomCenter },
                React.createElement(Icon_1.Icon, { className: "info-icon", iconName: "Info" }))));
    };
});
