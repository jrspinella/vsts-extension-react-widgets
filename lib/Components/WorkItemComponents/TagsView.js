define(["require", "exports", "react", "OfficeFabric/Label", "./TagsView.scss"], function (require, exports, React, Label_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagsView = function (props) {
        var tags = props.tags.filter(function (tag) { return tag != null && tag.trim() !== ""; });
        if (tags.length === 0) {
            return null;
        }
        return (React.createElement("div", { className: props.className ? "tags-view " + props.className : "tags-view" }, tags.map(function (tag, index) { return React.createElement(Label_1.Label, { key: index, className: "tag" }, tag.trim()); })));
    };
});
