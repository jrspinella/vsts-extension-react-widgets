define(["require", "exports", "react", "OfficeFabric/Label", "OfficeFabric/Tooltip", "OfficeFabric/Utilities", "VSSUI/VssIcon", "./InfoLabel.scss"], function (require, exports, React, Label_1, Tooltip_1, Utilities_1, VssIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoLabel = function (props) {
        return (React.createElement("div", { className: Utilities_1.css("info-label", props.className) },
            React.createElement(Label_1.Label, { className: "info-label-text" }, props.label),
            React.createElement(Tooltip_1.TooltipHost, { content: props.info, delay: Tooltip_1.TooltipDelay.zero, directionalHint: 5 },
                React.createElement(VssIcon_1.VssIcon, { iconType: VssIcon_1.VssIconType.fabric, className: "info-icon", iconName: "Info" }))));
    };
});
