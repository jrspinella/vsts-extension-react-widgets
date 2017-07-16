import "./MessagePanel.scss";

import * as React from "react";

import { Icon, IconName } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";
import { TooltipHost, TooltipDelay, DirectionalHint } from "OfficeFabric/Tooltip";

export interface IMessagePanelProps {
    message: string;
    messageType: MessageType;
    closeable?: boolean;
}

export interface IMessagePanelState {
    isClosed?: boolean;
}

export enum MessageType {
    Error,
    Warning,
    Info,
    Success
}

export class MessagePanel extends React.Component<IMessagePanelProps, IMessagePanelState> {
    constructor(props: IMessagePanelProps, context?: any) {
        super(props, context);

        this.state = {
        } as IMessagePanelState;
    }

    public render(): JSX.Element {
        if (this.state.isClosed) {
            return null;
        }

        let className = "message-panel";
        let iconName: IconName;

        switch (this.props.messageType) {
            case MessageType.Error:
                iconName = "ErrorBadge";
                className += " message-error";
                break;
            case MessageType.Warning:
                iconName = "Warning";
                className += " message-warning";
                break;
            case MessageType.Success:
                iconName = "Completed";
                className += " message-success";
                break;
            default:
                iconName = "Info";
                className += " message-info";
                break;
        }

        return (
            <div className={className}>
                <Icon className="icon" iconName={iconName} />
                <Label className="message-text">{this.props.message}</Label>
                { 
                    this.props.closeable &&                     
                    <span className="close-icon" onClick={() => this.setState({isClosed: true})}>
                        <TooltipHost 
                            content="Close"
                            delay={ TooltipDelay.zero }
                            directionalHint={ DirectionalHint.bottomCenter }
                            >
                            <Icon iconName="Cancel" />
                        </TooltipHost>
                    </span>
                }
            </div>
        );
    }
}