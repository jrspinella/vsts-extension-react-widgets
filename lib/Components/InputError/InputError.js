define(["require", "exports", "react", "OfficeFabric/Label", "OfficeFabric/Utilities", "VSSUI/VssIcon", "./InputError.scss"], function (require, exports, React, Label_1, Utilities_1, VssIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputError = function (props) {
        return (React.createElement("div", { className: Utilities_1.css("input-error", props.className) },
            React.createElement(VssIcon_1.VssIcon, { iconType: VssIcon_1.VssIconType.fabric, className: "error-icon", iconName: "Error" }),
            React.createElement(Label_1.Label, { className: "error-text" }, props.error)));
    };
});
