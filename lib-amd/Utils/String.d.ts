export declare module StringUtils {
    function defaultComparer(a: string, b: string): number;
    function ignoreCaseComparer(a: string, b: string): number;
    function localeComparer(a: string, b: string): number;
    function localeIgnoreCaseComparer(a: string, b: string): number;
    function equals(a: string, b: string, ignoreCase?: boolean): boolean;
    function startsWith(str: string, prefix: string, comparer?: (param1: string, param2: string) => number): boolean;
    function endsWith(str: string, suffix: string, comparer?: (param1: string, param2: string) => number): boolean;
    function caseInsensitiveContains(str: string, subStr: string): boolean;
    function isGuid(str: string): boolean;
}
