export declare class Rgb {
    static MinValue: number;
    static MaxValue: number;
    private red;
    private green;
    private blue;
    constructor(red: number, green: number, blue: number);
    getRed(): number;
    getGreen(): number;
    getBlue(): number;
}
export declare class Color {
    private value;
    constructor(color: string | Rgb);
    asHex(): string;
    asRgb(): string;
    asRgba(alpha: number): string;
    convertStringColorToRgb(colorInString: string): void;
    equals(color: Color): boolean;
    getRed(): number;
    getGreen(): number;
    getBlue(): number;
    convertToGrayscale(): Color;
    invert(): Color;
    toBlackOrWhite(): Color;
    isLightColor(): boolean;
}
export declare class AccessibilityColor extends Color {
    static FullPaletteColors: AccessibilityColor[];
    static VibrantPaletteColors: AccessibilityColor[];
    static MutePaletteColors: AccessibilityColor[];
    private displayName;
    constructor(color: string | Rgb | Color, displayName?: string);
    getDisplayName(): string;
}
