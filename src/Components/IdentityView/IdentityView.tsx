import * as React from "react";

import { parseUniquefiedIdentityName } from "../../Utilities/Identity";
import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";

import { Persona, PersonaSize } from "OfficeFabric/Persona";
import { css } from "OfficeFabric/Utilities";

export interface IIdentityViewProps extends IBaseFluxComponentProps {
    identityDistinctName: string;
    size?: PersonaSize;
}

export var IdentityView: React.StatelessComponent<IIdentityViewProps> =
    (props: IIdentityViewProps): JSX.Element => {        
        const identityRef = parseUniquefiedIdentityName(props.identityDistinctName);
        if (!identityRef || !identityRef.displayName) {
            return null;
        }

        return <Persona 
            className={css("identity-view", props.className)}
            size={props.size || PersonaSize.extraExtraSmall}
            imageUrl={identityRef.imageUrl}
            primaryText={identityRef.displayName}
            secondaryText={identityRef.uniqueName}
        />;
    }; 