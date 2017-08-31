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
define(["require", "exports", "react", "OfficeFabric/Utilities"], function (require, exports, React, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseComponent = (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.initializeState();
            return _this;
        }
        BaseComponent.prototype.componentDidMount = function () {
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.addChangedListener(this._onStoreChanged);
            }
        };
        BaseComponent.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.getStores(); _i < _a.length; _i++) {
                var store = _a[_i];
                store.removeChangedListener(this._onStoreChanged);
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
        BaseComponent.prototype.updateState = function (updatedStates, callback) {
            this.setState(updatedStates, callback);
        };
        BaseComponent.prototype._onStoreChanged = function () {
            var newStoreState = this.getStoresState();
            this.updateState(newStoreState);
        };
        __decorate([
            Utilities_1.autobind
        ], BaseComponent.prototype, "_onStoreChanged", null);
        return BaseComponent;
    }(React.Component));
    exports.BaseComponent = BaseComponent;
});
