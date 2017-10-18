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
        function ago(date) {
            var minute = 60;
            var hour = minute * 60;
            var day = hour * 24;
            var week = day * 7;
            var month = (day * 365) / 12;
            var year = day * 365;
            var now = new Date();
            var diff = (now.getTime() - date.getTime()) / 1000;
            var steps = [
                { limit: minute, format: "just now" },
                { limit: minute * 1.5, format: "a minute ago" },
                { limit: hour, format: Math.round(diff / minute) + " minutes ago" },
                { limit: hour * 1.5, format: "an hour ago" },
                { limit: day, format: Math.round(diff / hour) + " hours ago" },
                { limit: day * 1.5, format: "a day ago" },
                { limit: week, format: Math.round(diff / day) + " days ago" },
                { limit: week * 1.5, format: "a week ago" },
                { limit: month, format: Math.round(diff / week) + " weeks ago" },
                { limit: month * 1.5, format: "a month ago" },
                { limit: year, format: Math.round(diff / month) + " months ago" },
                { limit: year * 1.5, format: "a year ago" },
                { limit: Number.POSITIVE_INFINITY, format: Math.round(diff / year) + " years ago" }
            ];
            for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
                var step = steps_1[_i];
                if (diff < step.limit) {
                    return step.format;
                }
            }
            return "";
        }
        DateUtils.ago = ago;
        function friendly(date) {
            var day = 60 * 60 * 24;
            var now = new Date();
            var diff = (now.getTime() - date.getTime()) / 1000;
            var firstDayOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            var steps = [
                {
                    limit: day,
                    format: function (dt) {
                        return ago(dt);
                    }
                },
                {
                    limit: (now - firstDayOfWeek) / 1000,
                    format: function (dt) {
                        return format(dt, "dddd");
                    }
                },
                {
                    limit: Number.POSITIVE_INFINITY,
                    format: function (dt) {
                        return format(dt, "m/d/yyyy");
                    }
                }
            ];
            for (var _i = 0, steps_2 = steps; _i < steps_2.length; _i++) {
                var step = steps_2[_i];
                if (diff < step.limit && step.limit > 0) {
                    return step.format(date);
                }
            }
            return "";
        }
        DateUtils.friendly = friendly;
    })(DateUtils = exports.DateUtils || (exports.DateUtils = {}));
});
