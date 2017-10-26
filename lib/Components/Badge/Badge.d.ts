/// <reference types="react" />
import "./Badge.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
import { DirectionalHint } from "OfficeFabric/Callout";
export interface IBadgeProps extends IBaseComponentProps {
    notificationCount: number;
    showCalloutOnHover?: boolean;
    directionalHint?: DirectionalHint;
}
export interface IBadgeState extends IBaseComponentState {
    isCalloutVisible: boolean;
}
export declare class Badge extends BaseComponent<IBadgeProps, IBadgeState> {
    private _calloutTargetElement;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _onMouseOver;
    private _onMouseOut;
    private _onClickCallout;
    private _dismissCallout;
}
