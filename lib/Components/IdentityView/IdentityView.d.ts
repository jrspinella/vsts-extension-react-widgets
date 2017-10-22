/// <reference types="react" />
import * as React from "react";
import { IBaseComponentProps } from "../Utilities/BaseComponent";
import { PersonaSize } from "OfficeFabric/Persona";
export interface IIdentityViewProps extends IBaseComponentProps {
    identityDistinctName: string;
    size?: PersonaSize;
}
export declare var IdentityView: React.StatelessComponent<IIdentityViewProps>;
export declare function parseUniquefiedIdentityName(name: string): {
    displayName: string;
    uniqueName: string;
    imageUrl: string;
};
