import "./InputError.scss";

import * as React from "react";

import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";

import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";

export interface IInputErrorProps extends IBaseFluxComponentProps {
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