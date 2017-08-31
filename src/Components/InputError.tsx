import "./InputError.scss";

import * as React from "react";

import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";

export interface IInputErrorProps {
    error: string;
}

export var InputError: React.StatelessComponent<IInputErrorProps> =
    (props: IInputErrorProps): JSX.Element => {        
        return (
            <div className="input-error">
                <Icon className="error-icon" iconName="Error" />
                <Label className="error-text">{props.error}</Label>
            </div>
        );
}