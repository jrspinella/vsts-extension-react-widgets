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
define(["require", "exports", "react", "trumbowyg/dist/trumbowyg", "trumbowyg/dist/ui/trumbowyg.min.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RichEditor = (function (_super) {
        __extends(RichEditor, _super);
        function RichEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RichEditor.prototype.componentDidMount = function () {
            var _this = this;
            this._richEditorContainer = $("#" + this.props.containerId);
            this._richEditorContainer
                .trumbowyg(this.props.editorOptions || {})
                .on("tbwchange", function () { return _this.props.onChange(_this._richEditorContainer.trumbowyg("html")); })
                .on("tbwblur", function () { return _this.props.onChange(_this._richEditorContainer.trumbowyg("html")); });
            this._richEditorContainer.trumbowyg("html", this.props.data);
        };
        RichEditor.prototype.componentWillUnmount = function () {
            this._richEditorContainer.trumbowyg('destroy');
        };
        RichEditor.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
                this._richEditorContainer.trumbowyg('html', nextProps.data);
            }
        };
        RichEditor.prototype.render = function () {
            return (React.createElement("div", { id: this.props.containerId, className: "rich-editor" }));
        };
        return RichEditor;
    }(React.Component));
    exports.RichEditor = RichEditor;
});
