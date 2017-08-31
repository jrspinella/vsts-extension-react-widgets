define(["require", "exports", "react", "OfficeFabric/Label", "OfficeFabric/Icon", "OfficeFabric/Tooltip", "./InfoLabel.scss"], function (require, exports, React, Label_1, Icon_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoLabel = function (props) {
        return (React.createElement("div", { className: "info-label" },
            React.createElement(Label_1.Label, { className: "info-label-text" }, props.label),
            React.createElement(Tooltip_1.TooltipHost, { content: props.info, delay: Tooltip_1.TooltipDelay.zero, directionalHint: Tooltip_1.DirectionalHint.bottomCenter },
                React.createElement("span", null,
                    React.createElement(Icon_1.Icon, { className: "info-icon", iconName: "Info" })))));
    };
});
