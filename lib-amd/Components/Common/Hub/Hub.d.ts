/// <reference types="react" />
import "./Hub.scss";
import * as React from "react";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { IFavoriteStarProps } from "../FavoriteStar";
export interface IHubProps {
    title: string;
    pivotProps: IPivotProps;
    favoriteStarProps?: IFavoriteStarProps;
}
export interface IPivotProps {
    initialSelectedKey?: string;
    onPivotClick?: (selectedPivotKey: string, ev?: React.MouseEvent<HTMLElement>) => void;
    pivots: IPivotItem[];
    onRenderPivotContent: (selectedPivotKey: string) => React.ReactNode;
}
export interface IPivotItem {
    text: string;
    key: string;
    itemCount?: number;
    itemIcon?: string;
    commands?: IContextualMenuItem[];
    overflowCommands?: IContextualMenuItem[];
    farCommands?: IContextualMenuItem[];
}
export interface IHubState {
    selectedPivotKey: string;
}
export declare class Hub extends React.Component<IHubProps, IHubState> {
    constructor(props: IHubProps, context?: any);
    componentWillReceiveProps(nextProps: IHubProps): void;
    render(): JSX.Element;
    private _renderHeader();
    private _renderPivots();
    private _customPivotItemRenderer(props, defaultRenderer);
    private _renderCommandBar();
}
