define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringUtils;
    (function (StringUtils) {
        function convertToString(value, upperCase, useLocale) {
            var result;
            if (value === null || value === undefined) {
                return "";
            }
            result = useLocale ? value.toLocaleString() : value.toString();
            if (upperCase) {
                result = useLocale ? result.toLocaleUpperCase() : result.toUpperCase();
            }
            return result;
        }
        function isNullOrWhiteSpace(str) {
            return str == null || str.trim() === "";
        }
        StringUtils.isNullOrWhiteSpace = isNullOrWhiteSpace;
        function isNullOrEmpty(str) {
            return str == null || str === "";
        }
        StringUtils.isNullOrEmpty = isNullOrEmpty;
        function defaultComparer(a, b) {
            if (a === b) {
                return 0;
            }
            var a1 = convertToString(a, false, false);
            var b1 = convertToString(b, false, false);
            if (a1 === b1) {
                return 0;
            }
            else if (a1 > b1) {
                return 1;
            }
            else {
                return -1;
            }
        }
        StringUtils.defaultComparer = defaultComparer;
        function ignoreCaseComparer(a, b) {
            if (a === b) {
                return 0;
            }
            var a1 = convertToString(a, true, false);
            var b1 = convertToString(b, true, false);
            if (a1 === b1) {
                return 0;
            }
            else if (a1 > b1) {
                return 1;
            }
            else {
                return -1;
            }
        }
        StringUtils.ignoreCaseComparer = ignoreCaseComparer;
        function localeComparer(a, b) {
            if (a === b) {
                return 0;
            }
            var a1 = convertToString(a, false, true);
            var b1 = convertToString(b, false, true);
            return a1.localeCompare(b1);
        }
        StringUtils.localeComparer = localeComparer;
        function localeIgnoreCaseComparer(a, b) {
            if (a === b) {
                return 0;
            }
            var a1 = convertToString(a, true, true);
            var b1 = convertToString(b, true, true);
            return a1.localeCompare(b1);
        }
        StringUtils.localeIgnoreCaseComparer = localeIgnoreCaseComparer;
        function equals(a, b, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (ignoreCase) {
                return localeIgnoreCaseComparer(a, b) === 0;
            }
            else {
                return localeComparer(a, b) === 0;
            }
        }
        StringUtils.equals = equals;
        function startsWith(str, prefix, comparer) {
            comparer = comparer || defaultComparer;
            return comparer(prefix, str.substr(0, prefix.length)) === 0;
        }
        StringUtils.startsWith = startsWith;
        function endsWith(str, suffix, comparer) {
            comparer = comparer || defaultComparer;
            return comparer(suffix, str.substr(str.length - suffix.length, suffix.length)) === 0;
        }
        StringUtils.endsWith = endsWith;
        function caseInsensitiveContains(str, subStr) {
            return (str.toLowerCase().indexOf(subStr.toLowerCase()) !== -1);
        }
        StringUtils.caseInsensitiveContains = caseInsensitiveContains;
        function isGuid(str) {
            var guidRegex = /^\{?([\dA-F]{8})-?([\dA-F]{4})-?([\dA-F]{4})-?([\dA-F]{4})-?([\dA-F]{12})\}?$/i;
            return guidRegex.test(str);
        }
        StringUtils.isGuid = isGuid;
    })(StringUtils = exports.StringUtils || (exports.StringUtils = {}));
});
