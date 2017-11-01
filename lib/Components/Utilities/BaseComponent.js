define(["require", "exports", "tslib", "react", "OfficeFabric/Utilities"], function (require, exports, tslib_1, React, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseComponent = (function (_super) {
        tslib_1.__extends(BaseComponent, _super);
        function BaseComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.initializeState();
            return _this;
        }
        BaseComponent.prototype.componentDidMount = function () {
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.subscribe(this._onStoreChanged);
            }
        };
        BaseComponent.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.unsubscribe(this._onStoreChanged);
            }
        };
        BaseComponent.prototype.getStores = function () {
            return [];
        };
        BaseComponent.prototype.getStoresState = function () {
            return {};
        };
        BaseComponent.prototype.getDefaultClassName = function () {
            return "base-component";
        };
        BaseComponent.prototype.getClassName = function () {
            if (this.props.className != null && this.props.className.trim() !== "") {
                return this.getDefaultClassName() + " " + this.props.className;
            }
            else {
                return this.getDefaultClassName();
            }
        };
        BaseComponent.prototype.initializeState = function () {
            this.state = {};
        };
        BaseComponent.prototype._onStoreChanged = function () {
            var newStoreState = this.getStoresState();
            this.setState(newStoreState);
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], BaseComponent.prototype, "_onStoreChanged", null);
        return BaseComponent;
    }(React.Component));
    exports.BaseComponent = BaseComponent;
});
