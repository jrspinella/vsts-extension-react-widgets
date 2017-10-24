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
define(["require", "exports", "react", "../../Flux/Actions/WorkItemTypeActions", "../../Flux/Stores/BaseStore", "../../Flux/Stores/WorkItemTypeStore", "../Utilities/BaseComponent", "OfficeFabric/Label", "./TitleView.scss"], function (require, exports, React, WorkItemTypeActions_1, BaseStore_1, WorkItemTypeStore_1, BaseComponent_1, Label_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TitleView = (function (_super) {
        __extends(TitleView, _super);
        function TitleView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._workItemTypeStore = BaseStore_1.StoreFactory.getInstance(WorkItemTypeStore_1.WorkItemTypeStore);
            return _this;
        }
        TitleView.prototype.getStores = function () {
            return [this._workItemTypeStore];
        };
        TitleView.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            WorkItemTypeActions_1.WorkItemTypeActions.initializeWorkItemTypes();
        };
        TitleView.prototype.initializeState = function () {
            this.state = { workItemType: null };
        };
        TitleView.prototype.getDefaultClassName = function () {
            return "work-item-title-view";
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
            return (React.createElement(Label_1.Label, { className: this.getClassName() + " " + ((witIconUrl || !wit) ? "no-color" : ""), style: (witIconUrl || !wit) ? undefined : { borderColor: witColor } },
                witIconUrl && React.createElement("img", { src: witIconUrl }),
                React.createElement("a", { href: witUrl, onClick: function (e) {
                        if (_this.props.onClick && !e.ctrlKey) {
                            e.preventDefault();
                            _this.props.onClick(e);
                        }
                    } }, this.props.title)));
        };
        return TitleView;
    }(BaseComponent_1.BaseComponent));
    exports.TitleView = TitleView;
});
