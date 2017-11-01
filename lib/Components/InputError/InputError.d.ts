/// <reference types="react" />
import "./InputError.scss";
import * as React from "react";
import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";
export interface IInputErrorProps extends IBaseFluxComponentProps {
    error: string;
}
export declare var InputError: React.StatelessComponent<IInputErrorProps>;
