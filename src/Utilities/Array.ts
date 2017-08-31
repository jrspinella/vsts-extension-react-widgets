export function first<T>(array: T[], predicate?: (value: T) => boolean): T {
    if (!array || array.length === 0) {
        return null;
    }

    if (predicate == null) {
        return array[0];
    }

    const items = array.filter(predicate);
    return (items && items.length > 0) ? items[0] : null;
}

export function findIndex<T>(array: T[], predicate: IFunctionPR<T, boolean>): number {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return i;
        }
    }

    return -1;
}

export function union<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[] {
    var result: any[];

    if (!arrayB || arrayB.length === 0) {
        return arrayA;
    }

    result = arrayA.concat(arrayB);
    uniqueSort(result, comparer);

    return result;
}

export function uniqueSort<T>(array: T[], comparer?: IComparer<T>): T[] {
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

export function unique<T>(array: T[], comparer?: IComparer<T>): T[] {
    var result = array.slice(0);
    uniqueSort(result, comparer);

    return result;
}

export function removeWhere<T>(array: T[], predicate: (element: T) => boolean, count?: number, startAt: number = 0) {
    const indexesToRemove: number[] = [];
    for (let i = startAt; i < array.length; ++i) {
        if (predicate(array[i])) {
            indexesToRemove.push(i);
            if (indexesToRemove.length === count) {
                break;
            }
        }
    }
    removeAllIndexes(array, indexesToRemove);
}

export function removeAtIndex<T>(array: T[], index: number): boolean {
    return removeAllIndexes(array, [index]);
}

export function removeAllIndexes<T>(array: T[], indexes: number[]): boolean {
    let result = true;
    let sortedIndexes = indexes.slice();
    sortedIndexes.sort((a, b) => Number(a) - Number(b));
    for (let i = sortedIndexes.length - 1; i >= 0; --i) {
        const index = sortedIndexes[i];
        if (index >= array.length || index < 0) {
            result = false;
            continue;
        }
        array.splice(index, 1);
    }
    return result;
}

function defaultComparer<T>(a: T, b: T): number {
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
