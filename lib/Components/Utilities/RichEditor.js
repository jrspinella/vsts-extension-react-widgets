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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "react", "./BaseComponent", "../../Utilities/Core", "OfficeFabric/Utilities", "trumbowyg/dist/trumbowyg", "trumbowyg/dist/ui/trumbowyg.min.css", "../../Utilities/PasteImagePlugin", "../../Utilities/UploadImagePlugin"], function (require, exports, React, BaseComponent_1, Core_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RichEditor = (function (_super) {
        __extends(RichEditor, _super);
        function RichEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RichEditor.prototype.getDefaultClassName = function () {
            return "rich-editor";
        };
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
            return React.createElement("div", { id: this.props.containerId, className: this.getClassName() });
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
        __decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_onChange", null);
        __decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_fireChange", null);
        return RichEditor;
    }(BaseComponent_1.BaseComponent));
    exports.RichEditor = RichEditor;
});
