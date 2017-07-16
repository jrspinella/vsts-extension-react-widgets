/// <reference types="react" />
import "./TitleView.scss";
import * as React from "react";
import { WorkItemType } from "TFS/WorkItemTracking/Contracts";
import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent";
import { BaseStore } from "../../Flux/Stores/BaseStore";
export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface ITitleViewState extends IBaseComponentState {
    workItemType: WorkItemType;
}
export declare class TitleView extends BaseComponent<ITitleViewProps, ITitleViewState> {
    private _workItemTypeStore;
    protected getStores(): BaseStore<any, any, any>[];
    componentDidMount(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    protected getStoresState(): ITitleViewState;
    render(): JSX.Element;
}
