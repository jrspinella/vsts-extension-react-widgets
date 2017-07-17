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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "react", "OfficeFabric/Label", "OfficeFabric/CommandBar", "OfficeFabric/TextField", "OfficeFabric/Icon", "OfficeFabric/Pivot", "OfficeFabric/Utilities", "../../Common/BaseComponent", "../FavoriteStar", "./Hub.scss"], function (require, exports, React, Label_1, CommandBar_1, TextField_1, Icon_1, Pivot_1, Utilities_1, BaseComponent_1, FavoriteStar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Hub = (function (_super) {
        __extends(Hub, _super);
        function Hub(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.state = {
                selectedPivotKey: props.pivotProps.initialSelectedKey || props.pivotProps.pivots[0].key
            };
            return _this;
        }
        Hub.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.pivotProps.initialSelectedKey && nextProps.pivotProps.initialSelectedKey !== this.state.selectedPivotKey) {
                this.setState({ selectedPivotKey: nextProps.pivotProps.initialSelectedKey });
            }
        };
        Hub.prototype.getDefaultClassName = function () {
            return "hub";
        };
        Hub.prototype.render = function () {
            var _this = this;
            return (React.createElement("div", { className: this.getClassName() },
                this._renderHeader(),
                React.createElement("div", { className: "hub-pivots-container" },
                    React.createElement("div", { className: "hub-pivots" },
                        React.createElement(Pivot_1.Pivot, { initialSelectedKey: this.props.pivotProps.initialSelectedKey, onLinkClick: function (item, ev) {
                                _this.setState({ selectedPivotKey: item.props.itemKey });
                                if (_this.props.pivotProps.onPivotClick) {
                                    _this.props.pivotProps.onPivotClick(item.props.itemKey, ev);
                                }
                            } }, this._renderPivots())),
                    React.createElement("div", { className: "seperator" }),
                    this._renderCommandBar()),
                React.createElement("div", { className: "hub-pivot-content" }, this.props.pivotProps.onRenderPivotContent(this.state.selectedPivotKey))));
        };
        Hub.prototype._renderHeader = function () {
            return React.createElement("div", { className: "hub-header" },
                React.createElement(Label_1.Label, { className: "hub-title" }, this.props.title),
                this.props.favoriteStarProps && React.createElement(FavoriteStar_1.FavoriteStar, __assign({}, this.props.favoriteStarProps)));
        };
        Hub.prototype._renderPivots = function () {
            var _this = this;
            return this.props.pivotProps.pivots.map(function (pivotItem, index) {
                return React.createElement(Pivot_1.PivotItem, { className: "hub-pivot", itemKey: pivotItem.key, itemCount: pivotItem.itemCount, itemIcon: pivotItem.itemIcon, linkText: pivotItem.text, onRenderItemLink: _this._customPivotItemRenderer });
            });
        };
        Hub.prototype._customPivotItemRenderer = function (props, defaultRenderer) {
            var itemCount = props.itemCount;
            if (itemCount == null) {
                return defaultRenderer(props);
            }
            else {
                var newProps = __assign({}, props, { itemCount: undefined });
                return React.createElement("span", null,
                    defaultRenderer(newProps),
                    React.createElement("span", { className: "badge" }, itemCount));
            }
        };
        Hub.prototype._renderCommandBar = function () {
            var _this = this;
            var selectedPivot = this.props.pivotProps.pivots.filter(function (p) { return p.key === _this.state.selectedPivotKey; })[0];
            if ((selectedPivot.commands && selectedPivot.commands.length > 0) ||
                (selectedPivot.overflowCommands && selectedPivot.overflowCommands.length > 0) ||
                (selectedPivot.farCommands && selectedPivot.farCommands.length > 0) ||
                (selectedPivot.filterProps && selectedPivot.filterProps.showFilter)) {
                return React.createElement(CommandBar_1.CommandBar, { className: "hub-pivot-menu-bar", items: selectedPivot.commands || [], overflowItems: selectedPivot.overflowCommands || [], farItems: this._getFarCommands(selectedPivot) });
            }
            return null;
        };
        Hub.prototype._getFarCommands = function (selectedPivot) {
            var items = [];
            if (selectedPivot.filterProps && selectedPivot.filterProps.showFilter) {
                items.push({
                    key: "filter",
                    className: "filter-command",
                    onRender: function (item) {
                        return React.createElement(TextField_1.TextField, { onRenderAddon: function () { return React.createElement(Icon_1.Icon, { iconName: "Filter" }); }, className: "filter-input", onChanged: function (filterText) { return selectedPivot.filterProps.onFilterChange(filterText); }, placeholder: "Filter by Keyword" });
                    }
                });
            }
            return items.concat(selectedPivot.farCommands || []);
        };
        return Hub;
    }(BaseComponent_1.BaseComponent));
    __decorate([
        Utilities_1.autobind
    ], Hub.prototype, "_customPivotItemRenderer", null);
    exports.Hub = Hub;
});
