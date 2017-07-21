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
define(["require", "exports", "react", "TFS/WorkItemTracking/RestClient", "VSS/Utils/String", "../../Common/Loading", "../../Common/BaseComponent", "./WorkItemGrid"], function (require, exports, React, WitClient, Utils_String, Loading_1, BaseComponent_1, WorkItemGrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueryResultGrid = (function (_super) {
        __extends(QueryResultGrid, _super);
        function QueryResultGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QueryResultGrid.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            this._runQuery(this.props);
        };
        QueryResultGrid.prototype.getDefaultClassName = function () {
            return "query-results-grid";
        };
        QueryResultGrid.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
            if (!Utils_String.equals(this.props.wiql, nextProps.wiql, true) ||
                !Utils_String.equals(this.props.project, nextProps.project, true) ||
                this.props.top !== nextProps.top) {
                this._runQuery(nextProps);
            }
        };
        QueryResultGrid.prototype.render = function () {
            if (!this._isDataLoaded()) {
                return React.createElement(Loading_1.Loading, null);
            }
            else {
                return (React.createElement(WorkItemGrid_1.WorkItemGrid, { className: this.getClassName(), workItemIds: this.state.workItemIds, fieldRefNames: this.state.fieldRefNames, commandBarProps: this._getCommandBarProps(), contextMenuProps: this.props.contextMenuProps, selectionMode: this.props.selectionMode, extraColumns: this.props.extraColumns, setKey: this.props.setKey, selectionPreservedOnEmptyClick: this.props.selectionPreservedOnEmptyClick || false, noResultsText: this.props.noResultsText || "Query returned no results." }));
            }
        };
        QueryResultGrid.prototype._getCommandBarProps = function () {
            var _this = this;
            var menuItems = [
                {
                    key: "refresh", name: "Refresh", title: "Refresh items", iconProps: { iconName: "Refresh" },
                    onClick: function (event, menuItem) {
                        _this._runQuery(_this.props);
                    }
                }
            ];
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
        QueryResultGrid.prototype._runQuery = function (props) {
            return __awaiter(this, void 0, void 0, function () {
                var queryResult, workItemIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.updateState({ workItemIds: null, fieldRefNames: null });
                            return [4, WitClient.getClient().queryByWiql({ query: props.wiql }, props.project, null, false, this.props.top)];
                        case 1:
                            queryResult = _a.sent();
                            workItemIds = queryResult.workItems.map(function (workItem) { return workItem.id; });
                            this.updateState({ workItemIds: workItemIds, fieldRefNames: queryResult.columns.map(function (fr) { return fr.referenceName; }) });
                            return [2];
                    }
                });
            });
        };
        QueryResultGrid.prototype._isDataLoaded = function () {
            return this.state.workItemIds != null && this.state.fieldRefNames != null;
        };
        return QueryResultGrid;
    }(BaseComponent_1.BaseComponent));
    exports.QueryResultGrid = QueryResultGrid;
});
