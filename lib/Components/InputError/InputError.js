define(["require", "exports", "react", "OfficeFabric/Icon", "OfficeFabric/Label", "OfficeFabric/Utilities", "./InputError.scss"], function (require, exports, React, Icon_1, Label_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputError = function (props) {
        return (React.createElement("div", { className: Utilities_1.css("input-error", props.className) },
            React.createElement(Icon_1.Icon, { className: "error-icon", iconName: "Error" }),
            React.createElement(Label_1.Label, { className: "error-text" }, props.error)));
    };
});
