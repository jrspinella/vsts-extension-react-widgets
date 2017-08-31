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
                items: this._sortAndFilterItems(this.props.items, this.props.columns, null, SortOrder.ASC, this.props.filterText),
                sortColumn: null,
                sortOrder: SortOrder.ASC
            };
        };
        Grid.prototype.componentWillReceiveProps = function (nextProps) {
            this.updateState({
                items: this._sortAndFilterItems(nextProps.items, nextProps.columns, this.state.sortColumn, this.state.sortOrder, nextProps.filterText),
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
                this.state.isContextMenuVisible && this.props.contextMenuProps && this.props.contextMenuProps.menuItems && (React.createElement(ContextualMenu_1.ContextualMenu, { className: "context-menu", items: this.props.contextMenuProps.menuItems(this._selection.getSelection()), target: this.state.contextMenuTarget, shouldFocusOnMount: true, onDismiss: this._hideContextMenu }))));
        };
        Grid.prototype._renderGrid = function () {
            if (this.state.items.length === 0) {
                return React.createElement(MessageBar_1.MessageBar, { className: "grid-message-bar", messageBarType: MessageBar_1.MessageBarType.info }, this.props.noResultsText || "No results.");
            }
            else {
                return React.createElement("div", { className: "grid-container" },
                    React.createElement(DetailsList_1.DetailsList, { getKey: this.props.getKey, setKey: this.props.setKey, selectionPreservedOnEmptyClick: this.props.selectionPreservedOnEmptyClick || false, layoutMode: DetailsList_1.DetailsListLayoutMode.justified, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, selectionMode: this.props.selectionMode || selection_1.SelectionMode.multiple, isHeaderVisible: true, checkboxVisibility: this.props.selectionMode === selection_1.SelectionMode.none ? DetailsList_1.CheckboxVisibility.hidden : DetailsList_1.CheckboxVisibility.onHover, columns: this._prepareColumns(), items: this.state.items, className: "grid-list", onItemInvoked: this._onItemInvoked, selection: this._selection, onItemContextMenu: this._showContextMenu, compact: this.props.compact }));
            }
        };
        Grid.prototype._onItemInvoked = function (item, index) {
            if (this.props.onItemInvoked) {
                this.props.onItemInvoked(item, index);
            }
        };
        Grid.prototype._prepareColumns = function () {
            var _this = this;
            return this.props.columns.map(function (column) {
                return {
                    key: column.key,
                    fieldName: column.key,
                    name: column.name,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    isResizable: column.resizable,
                    onRender: function (item, index) { return column.onRenderCell(item, index); },
                    isSorted: column.sortFunction && _this.state.sortColumn && String_1.StringUtils.equals(_this.state.sortColumn.key, column.key, true),
                    isSortedDescending: column.sortFunction && _this.state.sortOrder === SortOrder.DESC,
                    onColumnClick: function () { return _this._onColumnHeaderClick(column); }
                };
            });
        };
        Grid.prototype._onColumnHeaderClick = function (column) {
            if (column.sortFunction) {
                var sortOrder = this.state.sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;
                var sortedItems = this._sortAndFilterItems(this.state.items, this.props.columns, column, sortOrder);
                this.updateState({ sortColumn: column, sortOrder: sortOrder, items: sortedItems });
            }
        };
        Grid.prototype._showContextMenu = function (_item, index, e) {
            if (this.props.contextMenuProps && this.props.contextMenuProps.menuItems) {
                if (!this._selection.isIndexSelected(index)) {
                    this._selection.setAllSelected(false);
                    this._selection.setIndexSelected(index, true, true);
                }
                this.updateState({ contextMenuTarget: e, isContextMenuVisible: true });
            }
        };
        Grid.prototype._hideContextMenu = function () {
            this.updateState({ contextMenuTarget: null, isContextMenuVisible: false });
        };
        Grid.prototype._sortAndFilterItems = function (items, columns, sortColumn, sortOrder, filterText) {
            var filteredItems = (items || []).slice();
            if (filterText != null && filterText.trim() !== "") {
                filteredItems = filteredItems.filter(function (item) {
                    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                        var column = columns_1[_i];
                        if (column.filterFunction && column.filterFunction(item, filterText)) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            if (sortColumn && sortColumn.sortFunction) {
                filteredItems = filteredItems.sort(function (item1, item2) { return sortColumn.sortFunction(item1, item2, sortOrder); });
            }
            return filteredItems;
        };
        __decorate([
            Utilities_1.autobind
        ], Grid.prototype, "_onItemInvoked", null);
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
