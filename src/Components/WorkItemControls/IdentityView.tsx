import * as React from "react";

import { Label } from "OfficeFabric/Label";
import { Persona, PersonaSize } from "OfficeFabric/Persona";

import Utils_String = require("VSS/Utils/String");

export interface IIdentityViewProps {
    identityDistinctName: string;
    size?: PersonaSize;
    className?: string;
}

export var IdentityView: React.StatelessComponent<IIdentityViewProps> =
    (props: IIdentityViewProps): JSX.Element => {        
        const identityRef = parseUniquefiedIdentityName(props.identityDistinctName);
        if (!identityRef || !identityRef.displayName) {
            return null;
        }

        return <Persona 
                    className="identity-view"
                    size={props.size || PersonaSize.extraExtraSmall}
                    imageUrl={identityRef.imageUrl}
                    primaryText={identityRef.displayName}
                    secondaryText={identityRef.uniqueName}
                />
    }; 

function parseUniquefiedIdentityName(name: string): {displayName: string, uniqueName: string, imageUrl: string} {
    if (!name) { 
        return {
            displayName: "",
            uniqueName: "",
            imageUrl: ""
        };
    }
    
    let i = name.lastIndexOf("<");
    let j = name.lastIndexOf(">");
    let displayName = name;
    let alias = "";
    let rightPart = "";
    let id = "";
    if (i >= 0 && j > i && j === name.length - 1) {
        displayName = name.substr(0, i).trim();
        rightPart = name.substr(i + 1, j - i - 1).trim();
        let vsIdFromAlias: string = getVsIdFromGroupUniqueName(rightPart); // if it has vsid in unique name (for TFS groups)

        if (rightPart.indexOf("@") !== -1 || rightPart.indexOf("\\") !== -1 || vsIdFromAlias || Utils_String.isGuid(rightPart)) {
            // if its a valid alias
            alias = rightPart;

            // If the alias component is just a guid then this is not a uniqueName but
            // vsId which is used only for TFS groups
            if (vsIdFromAlias != "") {
                id = vsIdFromAlias;
                alias = "";
            }
        }
        else {
            // if its not a valid alias, treat it as a non-identity string
            displayName = name;
        }
    }

    let imageUrl = "";
    if (id) {
        imageUrl = `${VSS.getWebContext().host.uri}/_api/_common/IdentityImage?id=${id}`;
    }
    else if(alias) {
        imageUrl = `${VSS.getWebContext().host.uri}/_api/_common/IdentityImage?identifier=${alias}&identifierType=0`;
    }

    return {
        displayName: displayName,
        uniqueName: alias,
        imageUrl: imageUrl
    };
}

function getVsIdFromGroupUniqueName(str: string): string {
    let leftPart: string;
    if (!str) { return ""; }

    let vsid = "";
    let i = str.lastIndexOf("\\");
    if (i === -1) {
        leftPart = str;
    }
    else {
        leftPart = str.substr(0, i);
    }

    if (Utils_String.startsWith(leftPart, "id:")) {
        let rightPart = leftPart.substr(3).trim();
        vsid = Utils_String.isGuid(rightPart) ? rightPart : "";
    }

    return vsid;
}