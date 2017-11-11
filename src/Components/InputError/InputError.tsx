import "./InputError.css";

import * as React from "react";

import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";

import { Label } from "OfficeFabric/Label";
import { css } from "OfficeFabric/Utilities";

import { VssIcon, VssIconType } from "VSSUI/VssIcon";

export interface IInputErrorProps extends IBaseFluxComponentProps {
    error: string;
}

export var InputError: React.StatelessComponent<IInputErrorProps> =
    (props: IInputErrorProps): JSX.Element => {        
        return (
            <div className={css("input-error", props.className)}>
                <VssIcon iconType={VssIconType.fabric} className="error-icon" iconName="Error" />
                <Label className="error-text">{props.error}</Label>
            </div>
        );
}