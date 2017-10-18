/// <reference types="react" />
import "./Badge.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
export interface IBadgeProps extends IBaseComponentProps {
    notificationCount: number;
}
export interface IBadgeState extends IBaseComponentState {
    isCalloutVisible: boolean;
}
export declare class Badge extends BaseComponent<IBadgeProps, IBadgeState> {
    private _calloutTargetElement;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _onCalloutDismiss;
    private _onToggleCallout;
}
