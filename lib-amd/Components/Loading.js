define(["require", "exports", "react", "OfficeFabric/Spinner", "./Loading.scss"], function (require, exports, React, Spinner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Loading = function () {
        return (React.createElement("div", { className: "content-loading" },
            React.createElement(Spinner_1.Spinner, { className: "loading-spinner", size: Spinner_1.SpinnerSize.large })));
    };
});
