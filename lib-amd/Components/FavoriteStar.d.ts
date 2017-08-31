/// <reference types="react" />
import "./FavoriteStar.scss";
import * as React from "react";
export interface IFavoriteStarProps {
    isFavorite: boolean;
    onChange: (favorited: boolean) => void;
}
export interface IFavoriteStarState {
    isFavorited: boolean;
}
export declare class FavoriteStar extends React.Component<IFavoriteStarProps, IFavoriteStarState> {
    constructor(props: IFavoriteStarProps, context?: any);
    componentWillReceiveProps(nextProps: IFavoriteStarProps): void;
    render(): JSX.Element;
}
