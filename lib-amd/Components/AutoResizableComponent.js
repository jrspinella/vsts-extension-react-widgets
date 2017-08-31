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
define(["require", "exports", "../Utils/Core", "./BaseComponent"], function (require, exports, Core_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AutoResizableComponent = (function (_super) {
        __extends(AutoResizableComponent, _super);
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
