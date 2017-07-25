import "./FavoriteStar.scss";

import * as React from "react";
import { Icon } from "OfficeFabric/Icon";
import { TooltipHost, TooltipDelay } from "OfficeFabric/Tooltip";

export interface IFavoriteStarProps {
    isFavorite: boolean;
    onChange: (favorited: boolean) => void;
}

export interface IFavoriteStarState {
    isFavorited: boolean;
}

export class FavoriteStar extends React.Component<IFavoriteStarProps, IFavoriteStarState> {
    constructor(props: IFavoriteStarProps, context?: any) {
        super(props, context);

        this.state = {
            isFavorited: props.isFavorite
        } as IFavoriteStarState;
    }

    public componentWillReceiveProps(nextProps: IFavoriteStarProps) {
        this.setState({isFavorited: nextProps.isFavorite});
    }

    public render(): JSX.Element {
        let className = "favorite-star";
        if (this.state.isFavorited) {
            className += " favorited";
        }

        return <TooltipHost 
                    content={this.state.isFavorited ? "Remove from favorites" : "Add to favorites"}
                    delay={TooltipDelay.medium}>

            <span className={className} tabIndex={0}>
                <Icon className="star-icon" iconName={this.state.isFavorited ? "FavoriteStarFill" : "FavoriteStar"} onClick={() => {
                    const isFavorite = this.state.isFavorited;
                    this.setState({isFavorited: !isFavorite});
                    this.props.onChange(!isFavorite);
                    }} />
            </span>
        </TooltipHost>
    }
}