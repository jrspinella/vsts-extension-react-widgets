define(["require", "exports", "tslib", "react", "../../Utilities/Core", "./BaseFluxComponent", "OfficeFabric/Utilities", "../../Utilities/PasteImagePlugin", "../../Utilities/UploadImagePlugin", "trumbowyg/dist/trumbowyg", "trumbowyg/dist/ui/trumbowyg.min.css"], function (require, exports, tslib_1, React, Core_1, BaseFluxComponent_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RichEditor = (function (_super) {
        tslib_1.__extends(RichEditor, _super);
        function RichEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RichEditor.prototype.componentDidMount = function () {
            this._richEditorContainer = $("#" + this.props.containerId);
            this._richEditorContainer
                .trumbowyg(this.props.editorOptions || {})
                .on("tbwchange", this._onChange)
                .on("tbwblur", this._fireChange);
            this._richEditorContainer.trumbowyg("html", this.props.data || "");
        };
        RichEditor.prototype.componentWillUnmount = function () {
            this._richEditorContainer.trumbowyg("destroy");
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
        };
        RichEditor.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
                this._richEditorContainer.trumbowyg("html", nextProps.data || "");
            }
        };
        RichEditor.prototype.render = function () {
            return React.createElement("div", { id: this.props.containerId, className: Utilities_1.css("rich-editor", this.props.className) });
        };
        RichEditor.prototype._onChange = function () {
            var _this = this;
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
            if (this.props.delay == null) {
                this._fireChange();
            }
            else {
                this._delayedFunction = Core_1.CoreUtils.delay(this, this.props.delay, function () {
                    _this._fireChange();
                });
            }
        };
        RichEditor.prototype._fireChange = function () {
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
            if (this.props.onChange) {
                this.props.onChange(this._richEditorContainer.trumbowyg("html"));
            }
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_onChange", null);
        tslib_1.__decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_fireChange", null);
        return RichEditor;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.RichEditor = RichEditor;
});
