import "./InputError.scss";

import * as React from "react";

import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";

import { IBaseComponentProps } from "./BaseComponent";

export interface IInputErrorProps extends IBaseComponentProps {
    error: string;
}

export var InputError: React.StatelessComponent<IInputErrorProps> =
    (props: IInputErrorProps): JSX.Element => {        
        return (
            <div className={props.className ? `input-error ${props.className}` : "input-error"}>
                <Icon className="error-icon" iconName="Error" />
                <Label className="error-text">{props.error}</Label>
            </div>
        );
}