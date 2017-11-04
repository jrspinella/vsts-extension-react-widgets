define(["require", "exports", "tslib", "react", "../../Flux/Actions/WorkItemTypeActions", "../../Flux/Stores/BaseStore", "../../Flux/Stores/WorkItemTypeStore", "../../Utilities/String", "../Utilities/BaseFluxComponent", "OfficeFabric/Link", "OfficeFabric/Utilities", "./TitleView.scss"], function (require, exports, tslib_1, React, WorkItemTypeActions_1, BaseStore_1, WorkItemTypeStore_1, String_1, BaseFluxComponent_1, Link_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TitleView = (function (_super) {
        tslib_1.__extends(TitleView, _super);
        function TitleView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._workItemTypeStore = BaseStore_1.StoreFactory.getInstance(WorkItemTypeStore_1.WorkItemTypeStore);
            return _this;
        }
        TitleView.prototype.initializeState = function () {
            this.state = { workItemType: null };
        };
        TitleView.prototype.getStores = function () {
            return [this._workItemTypeStore];
        };
        TitleView.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            if (this._workItemTypeStore.isLoaded()) {
                this.setState({
                    workItemType: this._workItemTypeStore.getItem(this.props.workItemType)
                });
            }
            else {
                WorkItemTypeActions_1.WorkItemTypeActions.initializeWorkItemTypes();
            }
        };
        TitleView.prototype.componentWillReceiveProps = function (nextProps) {
            _super.prototype.componentWillReceiveProps.call(this, nextProps);
            if (!String_1.StringUtils.equals(nextProps.workItemType, this.props.workItemType, true)) {
                if (this._workItemTypeStore.isLoaded()) {
                    this.setState({
                        workItemType: this._workItemTypeStore.getItem(nextProps.workItemType)
                    });
                }
            }
        };
        TitleView.prototype.getStoresState = function () {
            return {
                workItemType: this._workItemTypeStore.isLoaded() ? this._workItemTypeStore.getItem(this.props.workItemType) : null
            };
        };
        TitleView.prototype.render = function () {
            var _this = this;
            var wit = this.state.workItemType;
            var witColor = wit ? wit.color : null;
            var witIcon = wit ? wit.icon : null;
            var witIconUrl = (witIcon && witIcon.id) ? witIcon.url : null;
            if (witColor) {
                witColor = "#" + witColor.substring(witColor.length - 6);
            }
            else {
                witColor = "#000000";
            }
            var webContext = VSS.getWebContext();
            var witUrl = webContext.collection.uri + "/" + webContext.project.name + "/_workitems/edit/" + this.props.workItemId;
            return (React.createElement("div", { className: Utilities_1.css("work-item-title-view", this.props.className) + " " + ((witIconUrl || !wit) ? "no-color" : ""), style: (witIconUrl || !wit) ? undefined : { borderColor: witColor } },
                witIconUrl && React.createElement("img", { src: witIconUrl }),
                React.createElement(Link_1.Link, { className: "title-link", href: witUrl, onClick: function (e) {
                        if (_this.props.onClick && !e.ctrlKey) {
                            e.preventDefault();
                            _this.props.onClick(e);
                        }
                    } }, this.props.title)));
        };
        return TitleView;
    }(BaseFluxComponent_1.BaseFluxComponent));
    exports.TitleView = TitleView;
});
