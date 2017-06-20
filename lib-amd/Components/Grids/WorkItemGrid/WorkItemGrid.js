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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "react", "OfficeFabric/Utilities", "VSS/Utils/String", "./WorkItemGrid.Props", "../Grid", "./WorkItemGridHelpers", "../../Common/BaseComponent", "../../../css/WorkItemsGrid.scss"], function (require, exports, React, Utilities_1, Utils_String, WorkItemGrid_Props_1, Grid_1, WorkItemHelpers, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WorkItemGrid = (function (_super) {
        __extends(WorkItemGrid, _super);
        function WorkItemGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkItemGrid.prototype.initializeState = function () {
            this.state = {};
        };
        WorkItemGrid.prototype.getDefaultClassName = function () {
            return "work-item-grid";
        };
        WorkItemGrid.prototype.render = function () {
            return (React.createElement(Grid_1.Grid, { className: this.getClassName(), items: this.props.workItems, columns: this._mapFieldsToColumn(this.props.fields), selectionMode: this.props.selectionMode, commandBarProps: this._getCommandBarProps(), contextMenuProps: this._getContextMenuProps(), onItemInvoked: this._onItemInvoked, noResultsText: this.props.noResultsText }));
        };
        WorkItemGrid.prototype._mapFieldsToColumn = function (fields) {
            var _this = this;
            var columns = fields.map(function (field) {
                var columnSize = WorkItemHelpers.getColumnSize(field);
                return {
                    key: field.referenceName,
                    name: field.name,
                    minWidth: columnSize.minWidth,
                    maxWidth: columnSize.maxWidth,
                    resizable: true,
                    sortFunction: function (item1, item2, sortOrder) { return _this._itemComparer(item1, item2, field, sortOrder); },
                    filterFunction: function (item, filterText) { return "" + item.id === filterText || _this._itemFilter(item, filterText, field); },
                    data: { field: field },
                    onRenderCell: function (item) { return WorkItemHelpers.workItemFieldCellRenderer(item, field, field.referenceName === "System.Title" ? { onClick: function () { return _this._onItemInvoked(item); } } : null); }
                };
            });
            var extraColumns = this.props.extraColumns || [];
            var leftColumns = extraColumns.filter(function (c) { return c.position === WorkItemGrid_Props_1.ColumnPosition.FarLeft; }).map(function (c) { return c.column; });
            var rightColumns = extraColumns.filter(function (c) { return c.position !== WorkItemGrid_Props_1.ColumnPosition.FarLeft; }).map(function (c) { return c.column; });
            if (leftColumns.length > 0) {
                columns = leftColumns.concat(columns);
            }
            if (rightColumns.length > 0) {
                columns = columns.concat(rightColumns);
            }
            return columns;
        };
        WorkItemGrid.prototype._getCommandBarProps = function () {
            var _this = this;
            var menuItems = [{
                    key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                    disabled: !this.props.workItems || this.props.workItems.length === 0,
                    onClick: function (event, menuItem) { return __awaiter(_this, void 0, void 0, function () {
                        var url;
                        return __generator(this, function (_a) {
                            url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(this._getWiql());
                            window.open(url, "_blank");
                            return [2];
                        });
                    }); }
                }];
            if (this.props.commandBarProps && this.props.commandBarProps.menuItems && this.props.commandBarProps.menuItems.length > 0) {
                menuItems = menuItems.concat(this.props.commandBarProps.menuItems);
            }
            return {
                hideSearchBox: this.props.commandBarProps && this.props.commandBarProps.hideSearchBox,
                hideCommandBar: this.props.commandBarProps && this.props.commandBarProps.hideCommandBar,
                menuItems: menuItems,
                farMenuItems: this.props.commandBarProps && this.props.commandBarProps.farMenuItems
            };
        };
        WorkItemGrid.prototype._getContextMenuProps = function () {
            var _this = this;
            return {
                menuItems: function (selectedWorkItems) {
                    var contextMenuItems = [{
                            key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                            disabled: selectedWorkItems.length == 0,
                            onClick: function (event, menuItem) {
                                var url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(_this._getWiql(selectedWorkItems));
                                window.open(url, "_blank");
                            }
                        }];
                    if (_this.props.contextMenuProps && _this.props.contextMenuProps.menuItems) {
                        var extraMenuItems = _this.props.contextMenuProps.menuItems(selectedWorkItems);
                        if (extraMenuItems && extraMenuItems.length > 0) {
                            contextMenuItems = contextMenuItems.concat(extraMenuItems);
                        }
                    }
                    return contextMenuItems;
                }
            };
        };
        WorkItemGrid.prototype._onItemInvoked = function (workItem, index, ev) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedWorkItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, WorkItemHelpers.openWorkItemDialog(null, workItem)];
                        case 1:
                            updatedWorkItem = _a.sent();
                            if (updatedWorkItem.rev > workItem.rev && this.props.onWorkItemUpdated) {
                                this.props.onWorkItemUpdated(updatedWorkItem);
                            }
                            return [2];
                    }
                });
            });
        };
        WorkItemGrid.prototype._itemComparer = function (workItem1, workItem2, field, sortOrder) {
            return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, field, sortOrder);
        };
        WorkItemGrid.prototype._itemFilter = function (workItem, filterText, field) {
            return Utils_String.caseInsensitiveContains(workItem.fields[field.referenceName] == null ? "" : "" + workItem.fields[field.referenceName], filterText);
        };
        WorkItemGrid.prototype._getWiql = function (workItems) {
            var fieldStr = this.props.fields.map(function (f) { return "[" + f.referenceName + "]"; }).join(",");
            var ids = (workItems || this.props.workItems).map(function (w) { return w.id; }).join(",");
            return "SELECT " + fieldStr + "\n                 FROM WorkItems \n                 WHERE [System.ID] IN (" + ids + ")";
        };
        return WorkItemGrid;
    }(BaseComponent_1.BaseComponent));
    __decorate([
        Utilities_1.autobind
    ], WorkItemGrid.prototype, "_onItemInvoked", null);
    exports.WorkItemGrid = WorkItemGrid;
});
