export module GUIDUtils {
    export function newGuid(): string {
        const clockSequenceHi = (128 + Math.floor(Math.random() * 64)).toString(16);
        return oct(8) + "-" + oct(4) + "-4" + oct(3) + "-" + clockSequenceHi + oct(2) + "-" + oct(12);
    }

    export function isGuid(str: string): boolean {
        var guidRegex = /^\{?([\dA-F]{8})-?([\dA-F]{4})-?([\dA-F]{4})-?([\dA-F]{4})-?([\dA-F]{12})\}?$/i;
        return guidRegex.test(str);
    }
    
    function oct(length?: number): string {
        if (!length) {
            return (Math.floor(Math.random() * 0x10)).toString(16);
        }

        var result: string = "";
        for (var i: number = 0; i < length; i++) {
            result += oct();
        }

        return result;
    }
}