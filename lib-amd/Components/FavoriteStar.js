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
define(["require", "exports", "react", "OfficeFabric/Icon", "./BaseComponent", "OfficeFabric/Tooltip", "./FavoriteStar.scss"], function (require, exports, React, Icon_1, BaseComponent_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FavoriteStar = (function (_super) {
        __extends(FavoriteStar, _super);
        function FavoriteStar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FavoriteStar.prototype.getDefaultClassName = function () {
            return "favorite-star";
        };
        FavoriteStar.prototype.initializeState = function () {
            this.state = {
                isFavorited: this.props.isFavorite
            };
        };
        FavoriteStar.prototype.componentWillReceiveProps = function (nextProps) {
            this.setState({ isFavorited: nextProps.isFavorite });
        };
        FavoriteStar.prototype.render = function () {
            var _this = this;
            var className = this.getClassName();
            if (this.state.isFavorited) {
                className += " favorited";
            }
            return React.createElement(Tooltip_1.TooltipHost, { content: this.state.isFavorited ? "Remove from favorites" : "Add to favorites", delay: Tooltip_1.TooltipDelay.medium },
                React.createElement("span", { className: className, tabIndex: 0 },
                    React.createElement(Icon_1.Icon, { className: "star-icon", iconName: this.state.isFavorited ? "FavoriteStarFill" : "FavoriteStar", onClick: function () {
                            var isFavorite = _this.state.isFavorited;
                            _this.setState({ isFavorited: !isFavorite });
                            _this.props.onChange(!isFavorite);
                        } })));
        };
        return FavoriteStar;
    }(BaseComponent_1.BaseComponent));
    exports.FavoriteStar = FavoriteStar;
});
