define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.first = first;
    function findIndex(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            if (predicate(array[i])) {
                return i;
            }
        }
        return -1;
    }
    exports.findIndex = findIndex;
    function union(arrayA, arrayB, comparer) {
        var result;
        if (!arrayB || arrayB.length === 0) {
            return arrayA;
        }
        result = arrayA.concat(arrayB);
        uniqueSort(result, comparer);
        return result;
    }
    exports.union = union;
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
    exports.uniqueSort = uniqueSort;
    function unique(array, comparer) {
        var result = array.slice(0);
        uniqueSort(result, comparer);
        return result;
    }
    exports.unique = unique;
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
    exports.removeWhere = removeWhere;
    function removeAtIndex(array, index) {
        return removeAllIndexes(array, [index]);
    }
    exports.removeAtIndex = removeAtIndex;
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
    exports.removeAllIndexes = removeAllIndexes;
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
});
