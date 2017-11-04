define(["require", "exports", "tslib", "react", "../../Flux/Actions/WorkItemStateItemActions", "../../Flux/Stores/BaseStore", "../../Flux/Stores/WorkItemStateItemStore", "../../Utilities/Array", "../../Utilities/String", "../Utilities/BaseFluxComponent", "OfficeFabric/Label", "OfficeFabric/Utilities", "./StateView.scss"], function (require, exports, tslib_1, React, WorkItemStateItemActions_1, BaseStore_1, WorkItemStateItemStore_1, Array_1, String_1, BaseFluxComponent_1, Label_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateView = (function (_super) {
        tslib_1.__extends(StateView, _super);
        function StateView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._workItemStateItemStore = BaseStore_1.StoreFactory.getInstance(WorkItemStateItemStore_1.WorkItemStateItemStore);
            return _this;
        }
        StateView.prototype.getStores = function () {
            return [this._workItemStateItemStore];
        };
        StateView.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            if (this._workItemStateItemStore.isLoaded(this.props.workItemType)) {
                var workItemTypeStates = this._workItemStateItemStore.getItem(this.props.workItemType);
                this.setState({
                    workItemTypeState: Array_1.ArrayUtils.first(workItemTypeStates, function (s) { return String_1.StringUtils.equals(s.name, _this.props.state, true); })
                });
            }
            else {
                WorkItemStateItemActions_1.WorkItemStateItemActions.initializeWorkItemStates(this.props.workItemType);
            }
        };
        StateView.prototype.initializeState = function () {
            this.state = { workItemTypeState: null };
        };
        StateView.prototype.getStoresState = function () {
            var _this = this;
            var workItemTypeStates = this._workItemStateItemStore.getItem(this.props.workItemType);
            return {
                workItemTypeState: workItemTypeStates ? Array_1.ArrayUtils.first(workItemTypeStates, function (s) { return String_1.StringUtils.equals(s.name, _this.props.state, true); }) : null
            };
        };
        StateView.prototype.render = function () {
            var stateColor;
            if (this.state.workItemTypeState && this.state.workItemTypeState.color) {
                stateColor = "#" + this.state.workItemTypeState.color.substring(this.state.workItemTypeState.color.length - 6);
            }
            else {
                stateColor = "#000000";
            }
            return (React.createElement("div", { className: Utilities_1.css("work-item-state-view", this.props.className) },
                React.createElement("span", { className: "work-item-type-state-color", style: {
                        backgroundColor: stateColor,
                        borderColor: stateColor
                    } }),
                React.createElement(Label_1.Label, { className: "state-name" }, this.props.state)));
        };
        return StateView;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.StateView = StateView;
});
