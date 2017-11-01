define(["require", "exports", "react", "../../Utilities/Identity", "OfficeFabric/Persona", "OfficeFabric/Utilities"], function (require, exports, React, Identity_1, Persona_1, Utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IdentityView = function (props) {
        var identityRef = Identity_1.parseUniquefiedIdentityName(props.identityDistinctName);
        if (!identityRef || !identityRef.displayName) {
            return null;
        }
        return React.createElement(Persona_1.Persona, { className: Utilities_1.css("identity-view", props.className), size: props.size || Persona_1.PersonaSize.extraExtraSmall, imageUrl: identityRef.imageUrl, primaryText: identityRef.displayName, secondaryText: identityRef.uniqueName });
    };
});
