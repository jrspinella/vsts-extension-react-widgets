import "./InfoLabel.scss";

import * as React from "react";

import { IBaseComponentProps } from "../Utilities/BaseComponent";

import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";
import { DirectionalHint, TooltipDelay, TooltipHost } from "OfficeFabric/Tooltip";

export interface IInfoLabelProps extends IBaseComponentProps {
    label: string;
    info: string;
}

export var InfoLabel: React.StatelessComponent<IInfoLabelProps> =
    (props: IInfoLabelProps): JSX.Element => {        
        return (
            <div className={props.className ? `info-label ${props.className}` : "info-label"}>
                <Label className="info-label-text">{props.label}</Label>
                <TooltipHost 
                    content={ props.info }
                    delay={ TooltipDelay.zero }
                    directionalHint={ DirectionalHint.bottomCenter }
                    >
                    <Icon className="info-icon" iconName="Info" />
                </TooltipHost>
            </div>
        );
}