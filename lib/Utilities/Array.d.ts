export declare module ArrayUtils {
    function first<T>(array: T[], predicate?: (value: T) => boolean): T;
    function findIndex<T>(array: T[], predicate: (param: T) => boolean): number;
    function union<T>(arrayA: T[], arrayB: T[], comparer?: (a: T, b: T) => number): T[];
    function uniqueSort<T>(array: T[], comparer?: (a: T, b: T) => number): T[];
    function unique<T>(array: T[], comparer?: (a: T, b: T) => number): T[];
    function removeWhere<T>(array: T[], predicate: (element: T) => boolean, count?: number, startAt?: number): void;
    function removeAtIndex<T>(array: T[], index: number): boolean;
    function removeAllIndexes<T>(array: T[], indexes: number[]): boolean;
    function contains<T>(array: T[], value: T, comparer: (s: T, t: T) => boolean): boolean;
    function arrayEquals<T>(source: T[], target: T[], comparer?: (s: T, t: T) => boolean, sorted?: boolean): boolean;
}
