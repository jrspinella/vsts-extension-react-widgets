import "./Badge.scss";

import * as React from "react";

import {
    BaseComponent, IBaseComponentProps, IBaseComponentState
} from "../Utilities/BaseComponent";

import { Callout, DirectionalHint } from "OfficeFabric/Callout";
import { Icon } from "OfficeFabric/Icon";

export interface IBadgeProps extends IBaseComponentProps {
    notificationCount: number;
}

export interface IBadgeState extends IBaseComponentState {
    isCalloutVisible: boolean;
}

export class Badge extends BaseComponent<IBadgeProps, IBadgeState> {
    private _calloutTargetElement: HTMLElement;

    protected initializeState() {
        this.state = {
            isCalloutVisible: false
        };
    }

    protected getDefaultClassName(): string {
        return "badge";
    }

    public render() {
        return <div className={this.getClassName()}>
            <div ref={(element) => this._calloutTargetElement = element} className="badge-container" onClick={this._onToggleCallout}>
                <Icon iconName="Ringer" className="badge-icon" />
                <span className="badge-notification-count">{this.props.notificationCount}</span>
            </div>
            { 
                this.state.isCalloutVisible && 
                <Callout                    
                    gapSpace={0}
                    target={this._calloutTargetElement}
                    onDismiss={this._onCalloutDismiss}
                    setInitialFocus={true}
                    isBeakVisible={true}
                    directionalHint={DirectionalHint.bottomRightEdge}
                >
                    { this.props.children }
                </Callout>
            }
        </div>
    }

    private _onCalloutDismiss = () => {
        this.setState({
            isCalloutVisible: false
        });
    }

    private _onToggleCallout = () => {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    }
}