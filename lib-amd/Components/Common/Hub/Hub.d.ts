/// <reference types="react" />
import "./Hub.scss";
import * as React from "react";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { IBaseComponentState, IBaseComponentProps, BaseComponent } from "../../Common/BaseComponent";
import { IFavoriteStarProps } from "../FavoriteStar";
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
    filterProps?: IFilterProps;
}
export interface IFilterProps {
    showFilter: boolean;
    filterPosition?: FilterPosition;
    onFilterChange: (filterText: string) => void;
}
export declare enum FilterPosition {
    Left = 0,
    Right = 1,
    Middle = 2,
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
    private _getMainCommands(selectedPivot);
    private _getFarCommands(selectedPivot);
    private _getFilterControl(selectedPivot);
}
