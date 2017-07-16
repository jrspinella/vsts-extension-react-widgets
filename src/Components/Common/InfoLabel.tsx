import "./InfoLabel.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";
import { Icon } from "OfficeFabric/Icon";
import { TooltipHost, TooltipDelay, DirectionalHint } from "OfficeFabric/Tooltip";

export interface IInfoLabelProps {
    label: string;
    info: string;
}

export var InfoLabel: React.StatelessComponent<IInfoLabelProps> =
    (props: IInfoLabelProps): JSX.Element => {        
        return (
            <div className="info-label">
                <Label className="info-label-text">{props.label}</Label>
                <TooltipHost 
                    content={ props.info }
                    delay={ TooltipDelay.zero }
                    directionalHint={ DirectionalHint.bottomCenter }
                    >
                    <span>
                        <Icon className="info-icon" iconName="Info" />
                    </span>
                </TooltipHost>
            </div>
        );
}