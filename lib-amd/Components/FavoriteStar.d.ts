/// <reference types="react" />
import "./FavoriteStar.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
export interface IFavoriteStarProps extends IBaseComponentProps {
    isFavorite: boolean;
    onChange: (favorited: boolean) => void;
}
export interface IFavoriteStarState extends IBaseComponentState {
    isFavorited: boolean;
}
export declare class FavoriteStar extends BaseComponent<IFavoriteStarProps, IFavoriteStarState> {
    protected getDefaultClassName(): string;
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: IFavoriteStarProps): void;
    render(): JSX.Element;
}
