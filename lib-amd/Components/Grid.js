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
define(["require", "exports", "react", "OfficeFabric/DetailsList", "OfficeFabric/utilities/selection", "OfficeFabric/Utilities", "OfficeFabric/ContextualMenu", "OfficeFabric/MessageBar", "../Utils/String", "./BaseComponent", "./Grid.scss"], function (require, exports, React, DetailsList_1, selection_1, Utilities_1, ContextualMenu_1, MessageBar_1, String_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SortOrder;
    (function (SortOrder) {
        SortOrder[SortOrder["ASC"] = 0] = "ASC";
        SortOrder[SortOrder["DESC"] = 1] = "DESC";
    })(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this._selection = props.selection || new selection_1.Selection();
            return _this;
        }
        Grid.prototype.initializeState = function () {
            this.state = {
                items: this._sortItems(this.props.items, null, SortOrder.ASC),
                sortColumn: null,
                sortOrder: SortOrder.ASC
            };
        };
        Grid.prototype.componentWillReceiveProps = function (nextProps) {
            this.setState({
                items: this._sortItems(nextProps.items, this.state.sortColumn, this.state.sortOrder),
                isContextMenuVisible: false,
                contextMenuTarget: null
            });
        };
        Grid.prototype.getDefaultClassName = function () {
            return "base-grid";
        };
        Grid.prototype.render = function () {
            return (React.createElement("div", { className: this.getClassName() },
                this._renderGrid(),
                this.state.isContextMenuVisible && this.props.getContextMenuItems && (React.createElement(ContextualMenu_1.ContextualMenu, { className: "context-menu", items: this.props.getContextMenuItems(this._selection.getSelection()), target: this.state.contextMenuTarget, shouldFocusOnMount: true, onDismiss: this._hideContextMenu }))));
        };
        Grid.prototype._renderGrid = function () {
            var overrideProps = {
                columns: this._prepareColumns(),
                items: this.state.items,
                className: "grid-list",
                selection: this._selection,
                onItemContextMenu: this._showContextMenu
            };
            var props = __assign({}, this.props, overrideProps);
            if (this.state.items.length === 0) {
                return React.createElement(MessageBar_1.MessageBar, { className: "grid-message-bar", messageBarType: MessageBar_1.MessageBarType.info }, this.props.noResultsText || "No results.");
            }
            else {
                return React.createElement("div", { className: "grid-container" },
                    React.createElement(DetailsList_1.DetailsList, __assign({}, props)));
            }
        };
        Grid.prototype._prepareColumns = function () {
            var _this = this;
            return this.props.columns.map(function (column) {
                return __assign({}, column, { isSorted: column.comparer && _this.state.sortColumn && String_1.StringUtils.equals(_this.state.sortColumn.key, column.key, true), isSortedDescending: column.comparer && _this.state.sortOrder === SortOrder.DESC, onColumnClick: function () {
                        _this._onColumnHeaderClick(column);
                        if (column.onColumnClick) {
                            column.onColumnClick();
                        }
                    } });
            });
        };
        Grid.prototype._onColumnHeaderClick = function (column) {
            if (column.comparer) {
                var sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
                var sortedItems = this._sortItems(this.state.items, column, sortOrder);
                this.setState({ sortColumn: column, sortOrder: sortOrder, items: sortedItems });
            }
        };
        Grid.prototype._showContextMenu = function (_item, index, e) {
            if (this.props.getContextMenuItems) {
                if (!this._selection.isIndexSelected(index)) {
                    this._selection.setAllSelected(false);
                    this._selection.setIndexSelected(index, true, true);
                }
                this.setState({ contextMenuTarget: e, isContextMenuVisible: true });
            }
        };
        Grid.prototype._hideContextMenu = function () {
            this.setState({ contextMenuTarget: null, isContextMenuVisible: false });
        };
        Grid.prototype._sortItems = function (items, sortColumn, sortOrder) {
            var sortedItems = (items || []).slice();
            if (sortColumn && sortColumn.comparer) {
                sortedItems.sort(function (item1, item2) { return sortColumn.comparer(item1, item2, sortOrder); });
            }
            return sortedItems;
        };
        __decorate([
            Utilities_1.autobind
        ], Grid.prototype, "_onColumnHeaderClick", null);
        __decorate([
            Utilities_1.autobind
        ], Grid.prototype, "_showContextMenu", null);
        __decorate([
            Utilities_1.autobind
        ], Grid.prototype, "_hideContextMenu", null);
        return Grid;
    }(BaseComponent_1.BaseComponent));
    exports.Grid = Grid;
});
