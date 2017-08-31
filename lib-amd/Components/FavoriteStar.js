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
define(["require", "exports", "react", "OfficeFabric/Icon", "OfficeFabric/Tooltip", "./FavoriteStar.scss"], function (require, exports, React, Icon_1, Tooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FavoriteStar = (function (_super) {
        __extends(FavoriteStar, _super);
        function FavoriteStar(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.state = {
                isFavorited: props.isFavorite
            };
            return _this;
        }
        FavoriteStar.prototype.componentWillReceiveProps = function (nextProps) {
            this.setState({ isFavorited: nextProps.isFavorite });
        };
        FavoriteStar.prototype.render = function () {
            var _this = this;
            var className = "favorite-star";
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
    }(React.Component));
    exports.FavoriteStar = FavoriteStar;
});
