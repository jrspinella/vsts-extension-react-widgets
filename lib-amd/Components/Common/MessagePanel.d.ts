/// <reference types="react" />
import "./MessagePanel.scss";
import * as React from "react";
export interface IMessagePanelProps {
    message: string;
    messageType: MessageType;
    closeable?: boolean;
}
export interface IMessagePanelState {
    isClosed?: boolean;
}
export declare enum MessageType {
    Error = 0,
    Warning = 1,
    Info = 2,
    Success = 3,
}
export declare class MessagePanel extends React.Component<IMessagePanelProps, IMessagePanelState> {
    constructor(props: IMessagePanelProps, context?: any);
    render(): JSX.Element;
}
