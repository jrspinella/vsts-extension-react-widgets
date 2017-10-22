export declare module DateUtils {
    function defaultComparer(date1: Date, date2: Date): number;
    function equals(date1: Date, date2: Date): boolean;
    function shiftToUTC(date: Date): Date;
    function shiftToLocal(date: Date): Date;
    function format(date: Date, format: string): string;
    function ago(date: Date): string;
    function friendly(date: Date): string;
}
