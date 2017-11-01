import "./InfoLabel.scss";

import * as React from "react";

import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";

import { Icon } from "OfficeFabric/Icon";
import { Label } from "OfficeFabric/Label";
import { DirectionalHint, TooltipDelay, TooltipHost } from "OfficeFabric/Tooltip";
import { css } from "OfficeFabric/Utilities";

export interface IInfoLabelProps extends IBaseFluxComponentProps {
    label: string;
    info: string;
}

export var InfoLabel: React.StatelessComponent<IInfoLabelProps> =
    (props: IInfoLabelProps): JSX.Element => {        
        return (
            <div className={css("info-label", props.className)}>
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