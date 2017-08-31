export declare function first<T>(array: T[], predicate?: (value: T) => boolean): T;
export declare function findIndex<T>(array: T[], predicate: IFunctionPR<T, boolean>): number;
export declare function union<T>(arrayA: T[], arrayB: T[], comparer?: IComparer<T>): T[];
export declare function uniqueSort<T>(array: T[], comparer?: IComparer<T>): T[];
export declare function unique<T>(array: T[], comparer?: IComparer<T>): T[];
export declare function removeWhere<T>(array: T[], predicate: (element: T) => boolean, count?: number, startAt?: number): void;
export declare function removeAtIndex<T>(array: T[], index: number): boolean;
export declare function removeAllIndexes<T>(array: T[], indexes: number[]): boolean;
