/// <reference types="react" />
import * as React from "react";
import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";
import { PersonaSize } from "OfficeFabric/Persona";
export interface IIdentityViewProps extends IBaseFluxComponentProps {
    identityDistinctName: string;
    size?: PersonaSize;
}
export declare var IdentityView: React.StatelessComponent<IIdentityViewProps>;
