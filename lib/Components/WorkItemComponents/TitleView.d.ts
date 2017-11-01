/// <reference types="react" />
import "./TitleView.scss";
import * as React from "react";
import { BaseStore } from "../../Flux/Stores/BaseStore";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "../Utilities/BaseFluxComponent";
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
export interface ITitleViewProps extends IBaseFluxComponentProps {
    workItemId: number;
    title: string;
    workItemType: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface ITitleViewState extends IBaseFluxComponentState {
    workItemType: WorkItemType;
}
export declare class TitleView extends BaseFluxComponent<ITitleViewProps, ITitleViewState> {
    private _workItemTypeStore;
    protected getStores(): BaseStore<any, any, any>[];
    componentDidMount(): void;
    protected initializeState(): void;
    protected getStoresState(): ITitleViewState;
    render(): JSX.Element;
}
