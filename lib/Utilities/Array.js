define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArrayUtils;
    (function (ArrayUtils) {
        function first(array, predicate) {
            if (!array || array.length === 0) {
                return null;
            }
            if (predicate == null) {
                return array[0];
            }
            var items = array.filter(predicate);
            return (items && items.length > 0) ? items[0] : null;
        }
        ArrayUtils.first = first;
        function findIndex(array, predicate) {
            for (var i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i;
                }
            }
            return -1;
        }
        ArrayUtils.findIndex = findIndex;
        function union(arrayA, arrayB, comparer) {
            var result;
            if (!arrayB || arrayB.length === 0) {
                return arrayA;
            }
            result = arrayA.concat(arrayB);
            uniqueSort(result, comparer);
            return result;
        }
        ArrayUtils.union = union;
        function uniqueSort(array, comparer) {
            comparer = comparer || defaultComparer;
            array.sort(comparer);
            for (var i = 1, l = array.length; i < l; i++) {
                if (comparer(array[i], array[i - 1]) === 0) {
                    array.splice(i--, 1);
                    l--;
                }
            }
            return array;
        }
        ArrayUtils.uniqueSort = uniqueSort;
        function unique(array, comparer) {
            var result = array.slice(0);
            uniqueSort(result, comparer);
            return result;
        }
        ArrayUtils.unique = unique;
        function removeWhere(array, predicate, count, startAt) {
            if (startAt === void 0) { startAt = 0; }
            var indexesToRemove = [];
            for (var i = startAt; i < array.length; ++i) {
                if (predicate(array[i])) {
                    indexesToRemove.push(i);
                    if (indexesToRemove.length === count) {
                        break;
                    }
                }
            }
            removeAllIndexes(array, indexesToRemove);
        }
        ArrayUtils.removeWhere = removeWhere;
        function removeAtIndex(array, index) {
            return removeAllIndexes(array, [index]);
        }
        ArrayUtils.removeAtIndex = removeAtIndex;
        function removeAllIndexes(array, indexes) {
            var result = true;
            var sortedIndexes = indexes.slice();
            sortedIndexes.sort(function (a, b) { return Number(a) - Number(b); });
            for (var i = sortedIndexes.length - 1; i >= 0; --i) {
                var index = sortedIndexes[i];
                if (index >= array.length || index < 0) {
                    result = false;
                    continue;
                }
                array.splice(index, 1);
            }
            return result;
        }
        ArrayUtils.removeAllIndexes = removeAllIndexes;
        function contains(array, value, comparer) {
            if (typeof value === "undefined") {
                return false;
            }
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var item = array_1[_i];
                if (comparer(item, value)) {
                    return true;
                }
            }
            return false;
        }
        ArrayUtils.contains = contains;
        function arrayEquals(source, target, comparer, sorted) {
            if (sorted === void 0) { sorted = false; }
            if (!source || !target) {
                return true;
            }
            if (source.length !== target.length) {
                return false;
            }
            if (!sorted) {
                for (var i = 0; i < source.length; i++) {
                    if (!contains(target, source[i], comparer)) {
                        return false;
                    }
                }
            }
            else {
                for (var i = 0; i < source.length; i++) {
                    if (!comparer || !comparer(source[i], target[i])) {
                        return false;
                    }
                }
            }
            return true;
        }
        ArrayUtils.arrayEquals = arrayEquals;
        function defaultComparer(a, b) {
            if (a == b) {
                return 0;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return -1;
            }
        }
    })(ArrayUtils = exports.ArrayUtils || (exports.ArrayUtils = {}));
});
