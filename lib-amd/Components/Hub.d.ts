/// <reference types="react" />
import "./Hub.scss";
import * as React from "react";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { IBaseComponentState, IBaseComponentProps, BaseComponent } from "./BaseComponent";
import { IFavoriteStarProps } from "./FavoriteStar";
import { IFilterInputProps } from "./FilterInput";
export interface IHubProps extends IBaseComponentProps {
    title?: string;
    onTitleRender?: () => React.ReactNode;
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
    filterProps?: IFilterInputProps;
}
export interface IHubState extends IBaseComponentState {
    selectedPivotKey: string;
}
export declare class Hub extends BaseComponent<IHubProps, IHubState> {
    constructor(props: IHubProps, context?: any);
    componentWillReceiveProps(nextProps: IHubProps): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _renderHeader();
    private _renderPivots();
    private _customPivotItemRenderer(props, defaultRenderer);
    private _renderCommandBar();
}
