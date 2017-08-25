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
define(["require", "exports", "react", "VSS/VSS"], function (require, exports, React, VSS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AsyncLoadedComponent = (function (_super) {
        __extends(AsyncLoadedComponent, _super);
        function AsyncLoadedComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._isMounted = false;
            _this.state = {
                isLoading: false,
                componentType: null
            };
            return _this;
        }
        AsyncLoadedComponent.prototype.render = function () {
            if (!this.state.componentType) {
                if (this.props.componentWhileLoading) {
                    return this.props.componentWhileLoading();
                }
                return null;
            }
            return React.createElement(this.state.componentType, this.props.props);
        };
        AsyncLoadedComponent.prototype.componentWillMount = function () {
            if (this.props.onLoadStart) {
                this.props.onLoadStart();
            }
        };
        AsyncLoadedComponent.prototype.componentDidMount = function () {
            var _this = this;
            this._isMounted = true;
            if (!this.state.componentType && !this.state.isLoading) {
                this.setState({
                    isLoading: true,
                    componentType: null
                });
                VSS.using(this.props.modules, function () {
                    var modules = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        modules[_i] = arguments[_i];
                    }
                    if (_this._isMounted) {
                        if (_this.props.onLoadEnd) {
                            _this.props.onLoadEnd();
                        }
                        _this.setState({
                            isLoading: false,
                            componentType: (_a = _this.props).moduleComponentSelector.apply(_a, modules)
                        });
                    }
                    var _a;
                });
            }
        };
        AsyncLoadedComponent.prototype.componentWillUnmount = function () {
            if (this.state.isLoading) {
                this.setState({
                    isLoading: false,
                    componentType: null
                });
            }
            this._isMounted = false;
        };
        return AsyncLoadedComponent;
    }(React.Component));
    function getAsyncLoadedComponent(modules, moduleComponentSelector, componentWhileLoading, onLoadStart, onLoadEnd) {
        return function (props) { return React.createElement(AsyncLoadedComponent, {
            modules: modules,
            moduleComponentSelector: moduleComponentSelector,
            componentWhileLoading: componentWhileLoading,
            onLoadStart: onLoadStart,
            onLoadEnd: onLoadEnd,
            props: props,
        }); };
    }
    exports.getAsyncLoadedComponent = getAsyncLoadedComponent;
});
