import "./FavoriteStar.scss";

import * as React from "react";

import { Icon } from "OfficeFabric/Icon";

import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
import { TooltipHost, TooltipDelay } from "OfficeFabric/Tooltip";

export interface IFavoriteStarProps extends IBaseComponentProps {
    isFavorite: boolean;
    onChange: (favorited: boolean) => void;
}

export interface IFavoriteStarState extends IBaseComponentState {
    isFavorited: boolean;
}

export class FavoriteStar extends BaseComponent<IFavoriteStarProps, IFavoriteStarState> {
    protected getDefaultClassName(): string {
        return "favorite-star";
    }

    protected initializeState(): void {
        this.state = {
            isFavorited: this.props.isFavorite
        } as IFavoriteStarState;
    }

    public componentWillReceiveProps(nextProps: IFavoriteStarProps) {
        this.setState({isFavorited: nextProps.isFavorite});
    }

    public render(): JSX.Element {
        let className = this.getClassName();
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