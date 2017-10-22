/// <reference types="react" />
import * as React from "react";
import { ITextFieldProps } from "OfficeFabric/TextField";
export interface IThrottledTextFieldProps extends ITextFieldProps {
    delay?: number;
}
export declare class ThrottledTextField extends React.Component<IThrottledTextFieldProps, {}> {
    private _delayedFunction;
    render(): JSX.Element;
    componentWillUnmount(): void;
    private _onChange(newValue);
}
