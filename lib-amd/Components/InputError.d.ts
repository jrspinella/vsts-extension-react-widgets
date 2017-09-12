/// <reference types="react" />
import "./InputError.scss";
import * as React from "react";
import { IBaseComponentProps } from "./BaseComponent";
export interface IInputErrorProps extends IBaseComponentProps {
    error: string;
}
export declare var InputError: React.StatelessComponent<IInputErrorProps>;
