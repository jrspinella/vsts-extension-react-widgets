define(["require", "exports", "tslib", "react", "../../Utilities/Core", "../../Utilities/StaticObservable", "../Utilities/BaseFluxComponent", "OfficeFabric/Utilities", "./RichEditor.scss", "../../Utilities/PasteImagePlugin", "../../Utilities/UploadImagePlugin", "trumbowyg/dist/trumbowyg", "trumbowyg/dist/ui/trumbowyg.min.css"], function (require, exports, tslib_1, React, Core_1, StaticObservable_1, BaseFluxComponent_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RichEditor = (function (_super) {
        tslib_1.__extends(RichEditor, _super);
        function RichEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RichEditor.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            StaticObservable_1.StaticObservable.getInstance().unsubscribe(this._onImagePaste, "imagepasted");
            StaticObservable_1.StaticObservable.getInstance().subscribe(this._onImagePaste, "imagepasted");
            this._richEditorContainer = $("#" + this.props.containerId);
            this._richEditorContainer
                .trumbowyg(this.props.editorOptions || {})
                .on("tbwchange", this._onChange)
                .on("tbwblur", this._fireChange);
            this._richEditorContainer.trumbowyg("html", this.props.data || "");
        };
        RichEditor.prototype.componentWillUnmount = function () {
            _super.prototype.componentWillUnmount.call(this);
            StaticObservable_1.StaticObservable.getInstance().subscribe(this._onImagePaste, "imagepasted");
            this._richEditorContainer.trumbowyg("destroy");
            if (this._delayedFunction) {
                this._delayedFunction.cancel();
            }
        };
        RichEditor.prototype.componentWillReceiveProps = function (nextProps) {
            _super.prototype.componentWillReceiveProps.call(this, nextProps);
            if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
                this._richEditorContainer.trumbowyg("html", nextProps.data || "");
            }
        };
        RichEditor.prototype.render = function () {
            return React.createElement("div", { className: "rich-editor-container" },
                React.createElement("div", { className: "progress-bar", style: { visibility: this.state.loading ? "visible" : "hidden" } }),
                React.createElement("div", { id: this.props.containerId, className: Utilities_1.css("rich-editor", this.props.className) }));
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
        RichEditor.prototype._onImagePaste = function (args) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var imageUrl, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.props.getPastedImageUrl) {
                                return [2];
                            }
                            this.setState({ loading: true });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, this.props.getPastedImageUrl(args.data)];
                        case 2:
                            imageUrl = _a.sent();
                            args.callback(imageUrl);
                            this.setState({ loading: false });
                            return [3, 4];
                        case 3:
                            e_1 = _a.sent();
                            args.callback(null);
                            this.setState({ loading: false });
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_onChange", null);
        tslib_1.__decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_fireChange", null);
        tslib_1.__decorate([
            Utilities_1.autobind
        ], RichEditor.prototype, "_onImagePaste", null);
        return RichEditor;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.RichEditor = RichEditor;
});
