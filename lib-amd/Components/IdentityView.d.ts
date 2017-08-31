/// <reference types="react" />
import * as React from "react";
import { PersonaSize } from "OfficeFabric/Persona";
export interface IIdentityViewProps {
    identityDistinctName: string;
    size?: PersonaSize;
    className?: string;
}
export declare var IdentityView: React.StatelessComponent<IIdentityViewProps>;
export declare function parseUniquefiedIdentityName(name: string): {
    displayName: string;
    uniqueName: string;
    imageUrl: string;
};
