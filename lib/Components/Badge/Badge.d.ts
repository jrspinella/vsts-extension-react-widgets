/// <reference types="react" />
import "./Badge.scss";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "../Utilities/BaseFluxComponent";
import { DirectionalHint } from "OfficeFabric/Callout";
export interface IBadgeProps extends IBaseFluxComponentProps {
    notificationCount: number;
    showCalloutOnHover?: boolean;
    directionalHint?: DirectionalHint;
}
export interface IBadgeState extends IBaseFluxComponentState {
    isCalloutVisible: boolean;
}
export declare class Badge extends BaseFluxComponent<IBadgeProps, IBadgeState> {
    private _calloutTargetElement;
    protected initializeState(): void;
    render(): JSX.Element;
    private _onMouseOver;
    private _onMouseOut;
    private _onClickCallout;
    private _dismissCallout;
}
