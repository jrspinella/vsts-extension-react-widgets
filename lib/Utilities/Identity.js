define(["require", "exports", "./String"], function (require, exports, String_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseUniquefiedIdentityName(name) {
        if (!name) {
            return {
                displayName: "",
                uniqueName: "",
                imageUrl: ""
            };
        }
        var i = name.lastIndexOf("<");
        var j = name.lastIndexOf(">");
        var displayName = name;
        var alias = "";
        var rightPart = "";
        var id = "";
        if (i >= 0 && j > i && j === name.length - 1) {
            displayName = name.substr(0, i).trim();
            rightPart = name.substr(i + 1, j - i - 1).trim();
            var vsIdFromAlias = getVsIdFromGroupUniqueName(rightPart);
            if (rightPart.indexOf("@") !== -1 || rightPart.indexOf("\\") !== -1 || vsIdFromAlias || String_1.StringUtils.isGuid(rightPart)) {
                alias = rightPart;
                if (vsIdFromAlias != "") {
                    id = vsIdFromAlias;
                    alias = "";
                }
            }
            else {
                displayName = name;
            }
        }
        var imageUrl = "";
        if (id) {
            imageUrl = VSS.getWebContext().host.uri + "/_api/_common/IdentityImage?id=" + id;
        }
        else if (alias) {
            imageUrl = VSS.getWebContext().host.uri + "/_api/_common/IdentityImage?identifier=" + alias + "&identifierType=0";
        }
        return {
            displayName: displayName,
            uniqueName: alias,
            imageUrl: imageUrl
        };
    }
    exports.parseUniquefiedIdentityName = parseUniquefiedIdentityName;
    function getVsIdFromGroupUniqueName(str) {
        var leftPart;
        if (!str) {
            return "";
        }
        var vsid = "";
        var i = str.lastIndexOf("\\");
        if (i === -1) {
            leftPart = str;
        }
        else {
            leftPart = str.substr(0, i);
        }
        if (String_1.StringUtils.startsWith(leftPart, "id:")) {
            var rightPart = leftPart.substr(3).trim();
            vsid = String_1.StringUtils.isGuid(rightPart) ? rightPart : "";
        }
        return vsid;
    }
});
