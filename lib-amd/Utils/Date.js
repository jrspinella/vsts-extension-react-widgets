define(["require", "exports", "dateFormat"], function (require, exports, dateFormat) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateUtils;
    (function (DateUtils) {
        function defaultComparer(date1, date2) {
            if (date1 instanceof Date && date2 instanceof Date) {
                return date1.getTime() - date2.getTime();
            }
            if (date1 instanceof Date) {
                return 1;
            }
            if (date2 instanceof Date) {
                return -1;
            }
            return 0;
        }
        DateUtils.defaultComparer = defaultComparer;
        function equals(date1, date2) {
            if (date1 === null || date1 === undefined) {
                return date1 === date2;
            }
            else {
                return (date1 instanceof Date) && defaultComparer(date1, date2) === 0;
            }
        }
        DateUtils.equals = equals;
        function shiftToUTC(date) {
            return new Date(date.getTime() + (date.getTimezoneOffset() * 1000 * 60));
        }
        DateUtils.shiftToUTC = shiftToUTC;
        function shiftToLocal(date) {
            return new Date(date.getTime() - (date.getTimezoneOffset() * 1000 * 60));
        }
        DateUtils.shiftToLocal = shiftToLocal;
        function format(date, format) {
            return dateFormat(date, format);
        }
        DateUtils.format = format;
    })(DateUtils = exports.DateUtils || (exports.DateUtils = {}));
});
