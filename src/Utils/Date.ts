import * as dateFormat from "dateFormat";

export module DateUtils {
    export function defaultComparer(date1: Date, date2: Date): number {
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

    export function equals(date1: Date, date2: Date): boolean {
        if (date1 === null || date1 === undefined) {
            return date1 === date2;
        }
        else {
            return (date1 instanceof Date) && defaultComparer(date1, date2) === 0;
        }
    }

    export function shiftToUTC(date: Date): Date {    
        return new Date(date.getTime() + (date.getTimezoneOffset() * 1000 * 60));
    }

    export function shiftToLocal(date: Date): Date {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 1000 * 60));
    }

    export function format(date: Date, format: string): string {
        return dateFormat(date, format);
    }
}
