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
define(["require", "exports", "react", "OfficeFabric/Utilities", "../Utils/String", "./BaseComponent", "./Loading", "./Grid", "../Utils/WorkItemGridHelpers", "../Flux/Stores/BaseStore", "../Flux/Stores/WorkItemStore", "../Flux/Stores/WorkItemFieldStore", "../Flux/Actions/WorkItemActions", "../Flux/Actions/WorkItemFieldActions", "./WorkItemsGrid.scss"], function (require, exports, React, Utilities_1, String_1, BaseComponent_1, Loading_1, Grid_1, WorkItemHelpers, BaseStore_1, WorkItemStore_1, WorkItemFieldStore_1, WorkItemActions_1, WorkItemFieldActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnPosition;
    (function (ColumnPosition) {
        ColumnPosition[ColumnPosition["FarLeft"] = 0] = "FarLeft";
        ColumnPosition[ColumnPosition["FarRight"] = 1] = "FarRight";
    })(ColumnPosition = exports.ColumnPosition || (exports.ColumnPosition = {}));
    var WIGrid = (function (_super) {
        __extends(WIGrid, _super);
        function WIGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WIGrid;
    }(Grid_1.Grid));
    var WorkItemGrid = (function (_super) {
        __extends(WorkItemGrid, _super);
        function WorkItemGrid() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._workItemStore = BaseStore_1.StoreFactory.getInstance(WorkItemStore_1.WorkItemStore);
            _this._workItemFieldStore = BaseStore_1.StoreFactory.getInstance(WorkItemFieldStore_1.WorkItemFieldStore);
            return _this;
        }
        WorkItemGrid.prototype.initializeState = function () {
            this.state = {
                workItems: null,
                loading: true,
                fieldsMap: null
            };
        };
        WorkItemGrid.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            WorkItemFieldActions_1.WorkItemFieldActions.initializeWorkItemFields();
            if (Array.isArray(this.props.workItemIds)) {
                WorkItemActions_1.WorkItemActions.initializeWorkItems(this.props.workItemIds);
            }
        };
        WorkItemGrid.prototype.componentWillReceiveProps = function (nextProps) {
            if (Array.isArray(nextProps.workItemIds)) {
                for (var _i = 0, _a = nextProps.workItemIds; _i < _a.length; _i++) {
                    var id = _a[_i];
                    if (!this._workItemStore.isLoaded(id)) {
                        WorkItemActions_1.WorkItemActions.initializeWorkItems(nextProps.workItemIds);
                        return;
                    }
                }
            }
            var workItems = Array.isArray(nextProps.workItemIds) ? this._workItemStore.getItems(nextProps.workItemIds) : (nextProps.workItems || []);
            this.updateState({
                workItems: this._filterItems(workItems, nextProps.filterText, nextProps.fieldRefNames),
                loading: this._workItemFieldStore.isLoading() || this._workItemStore.isLoading()
            });
        };
        WorkItemGrid.prototype.getStores = function () {
            return [this._workItemStore, this._workItemFieldStore];
        };
        WorkItemGrid.prototype.getStoresState = function () {
            var allFields = this._workItemFieldStore.getAll();
            var fieldsMap = this.state.fieldsMap;
            if (fieldsMap == null && allFields != null) {
                fieldsMap = {};
                for (var _i = 0, allFields_1 = allFields; _i < allFields_1.length; _i++) {
                    var field = allFields_1[_i];
                    fieldsMap[field.referenceName.toLowerCase()] = field;
                }
            }
            var workItems = Array.isArray(this.props.workItemIds) ? this._workItemStore.getItems(this.props.workItemIds) : (this.props.workItems || []);
            return {
                loading: this._workItemFieldStore.isLoading() || this._workItemStore.isLoading(),
                fieldsMap: fieldsMap,
                workItems: this._filterItems(workItems, this.props.filterText, this.props.fieldRefNames)
            };
        };
        WorkItemGrid.prototype.getDefaultClassName = function () {
            return "work-item-grid";
        };
        WorkItemGrid.prototype.render = function () {
            if (this.state.loading) {
                return React.createElement(Loading_1.Loading, null);
            }
            return (React.createElement(WIGrid, { setKey: this.props.setKey, selectionPreservedOnEmptyClick: this.props.selectionPreservedOnEmptyClick || false, className: this.getClassName(), items: this.state.workItems, columns: this._mapFieldsToColumn(), selectionMode: this.props.selectionMode, getContextMenuItems: this._getContextMenuItems, onItemInvoked: this._onItemInvoked, noResultsText: this.props.noResultsText, compact: this.props.compact, getKey: function (workItem) { return "" + workItem.id; } }));
        };
        WorkItemGrid.prototype._filterItems = function (workItems, filterText, fieldRefNames) {
            var _this = this;
            if (workItems == null) {
                return null;
            }
            if (filterText == null || filterText.trim() === "") {
                return workItems;
            }
            return workItems.filter(function (workItem) {
                if ("" + workItem.id === filterText) {
                    return true;
                }
                if (_this.state.fieldsMap) {
                    for (var _i = 0, fieldRefNames_1 = fieldRefNames; _i < fieldRefNames_1.length; _i++) {
                        var fieldRefName = fieldRefNames_1[_i];
                        var match = String_1.StringUtils.caseInsensitiveContains(workItem.fields[fieldRefName] == null ? "" : "" + workItem.fields[fieldRefName], filterText);
                        if (match) {
                            return true;
                        }
                    }
                }
                return false;
            });
        };
        WorkItemGrid.prototype._mapFieldsToColumn = function () {
            var _this = this;
            var columns = this.props.fieldRefNames.map(function (fieldRefName) {
                var field = _this.state.fieldsMap[fieldRefName.toLowerCase()];
                var columnSize = WorkItemHelpers.getColumnSize(field);
                return {
                    key: field.referenceName,
                    name: field.name,
                    minWidth: columnSize.minWidth,
                    maxWidth: columnSize.maxWidth,
                    resizable: true,
                    comparer: function (workItem1, workItem2, sortOrder) { return WorkItemHelpers.workItemFieldValueComparer(workItem1, workItem2, field, sortOrder); },
                    onRenderCell: function (workItem) { return WorkItemHelpers.workItemFieldCellRenderer(workItem, field, field.referenceName === "System.Title" ? { onClick: function (ev) { return _this._onItemInvoked(workItem, 0, ev); } } : null); }
                };
            });
            var extraColumns = this.props.extraColumns || [];
            var leftColumns = extraColumns.filter(function (c) { return c.position === ColumnPosition.FarLeft; }).map(function (c) { return c.column; });
            var rightColumns = extraColumns.filter(function (c) { return c.position !== ColumnPosition.FarLeft; }).map(function (c) { return c.column; });
            if (leftColumns.length > 0) {
                columns = leftColumns.concat(columns);
            }
            if (rightColumns.length > 0) {
                columns = columns.concat(rightColumns);
            }
            return columns;
        };
        WorkItemGrid.prototype._getContextMenuItems = function (selectedWorkItems) {
            var _this = this;
            var contextMenuItems = [{
                    key: "OpenQuery", name: "Open as query", title: "Open selected workitems as a query", iconProps: { iconName: "OpenInNewWindow" },
                    disabled: selectedWorkItems.length == 0,
                    onClick: function () {
                        var url = VSS.getWebContext().host.uri + "/" + VSS.getWebContext().project.id + "/_workitems?_a=query&wiql=" + encodeURIComponent(_this._getWiql(selectedWorkItems));
                        window.open(url, "_blank");
                    }
                }];
            if (this.props.getContextMenuItems) {
                var extraMenuItems = this.props.getContextMenuItems(selectedWorkItems);
                if (extraMenuItems && extraMenuItems.length > 0) {
                    contextMenuItems = contextMenuItems.concat(extraMenuItems);
                }
            }
            return contextMenuItems;
        };
        WorkItemGrid.prototype._onItemInvoked = function (workItem, _index, ev) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedWorkItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, WorkItemHelpers.openWorkItemDialog(ev, workItem)];
                        case 1:
                            updatedWorkItem = _a.sent();
                            if (updatedWorkItem.rev > workItem.rev) {
                                WorkItemActions_1.WorkItemActions.refreshWorkItemInStore([updatedWorkItem]);
                            }
                            return [2];
                    }
                });
            });
        };
        WorkItemGrid.prototype._getWiql = function (workItems) {
            var fieldStr = this.props.fieldRefNames.join(",");
            var ids = (workItems || this.state.workItems).map(function (w) { return w.id; }).join(",");
            return "SELECT " + fieldStr + "\n                 FROM WorkItems \n                 WHERE [System.ID] IN (" + ids + ")";
        };
        __decorate([
            Utilities_1.autobind
        ], WorkItemGrid.prototype, "_getContextMenuItems", null);
        __decorate([
            Utilities_1.autobind
        ], WorkItemGrid.prototype, "_onItemInvoked", null);
        return WorkItemGrid;
    }(BaseComponent_1.BaseComponent));
    exports.WorkItemGrid = WorkItemGrid;
});
