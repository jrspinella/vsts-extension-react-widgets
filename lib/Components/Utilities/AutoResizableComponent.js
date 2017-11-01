define(["require", "exports", "tslib", "../../Utilities/Core", "./BaseComponent"], function (require, exports, tslib_1, Core_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AutoResizableComponent = (function (_super) {
        tslib_1.__extends(AutoResizableComponent, _super);
        function AutoResizableComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._bodyElement = document.getElementsByTagName("body").item(0);
            _this._windowResizeThrottleDelegate = Core_1.CoreUtils.throttledDelegate(_this, 50, _this.resize);
            $(window).resize(_this._windowResizeThrottleDelegate);
            return _this;
        }
        AutoResizableComponent.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            this.resize();
        };
        AutoResizableComponent.prototype.componentDidUpdate = function () {
            this.resize();
        };
        AutoResizableComponent.prototype.resize = function () {
            VSS.resize(null, this._bodyElement.offsetHeight);
        };
        return AutoResizableComponent;
    }(BaseComponent_1.BaseComponent));
    exports.AutoResizableComponent = AutoResizableComponent;
});
