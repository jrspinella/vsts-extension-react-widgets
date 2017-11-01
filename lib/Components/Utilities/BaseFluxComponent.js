define(["require", "exports", "tslib", "OfficeFabric/Utilities"], function (require, exports, tslib_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseFluxComponent = (function (_super) {
        tslib_1.__extends(BaseFluxComponent, _super);
        function BaseFluxComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.initializeState();
            return _this;
        }
        BaseFluxComponent.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.subscribe(this._onStoreChanged);
            }
        };
        BaseFluxComponent.prototype.componentWillUnmount = function () {
            _super.prototype.componentWillUnmount.call(this);
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.unsubscribe(this._onStoreChanged);
            }
        };
        BaseFluxComponent.prototype.getStores = function () {
            return [];
        };
        BaseFluxComponent.prototype.getStoresState = function () {
            return {};
        };
        BaseFluxComponent.prototype.initializeState = function () {
            this.state = {};
        };
        BaseFluxComponent.prototype._onStoreChanged = function () {
            var newStoreState = this.getStoresState();
            this.setState(newStoreState);
        };
        tslib_1.__decorate([
            Utilities_1.autobind
        ], BaseFluxComponent.prototype, "_onStoreChanged", null);
        return BaseFluxComponent;
    }(Utilities_1.BaseComponent));
    exports.BaseFluxComponent = BaseFluxComponent;
});
