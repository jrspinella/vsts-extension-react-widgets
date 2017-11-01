define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rgb = (function () {
        function Rgb(red, green, blue) {
            if (red < 0 || red > 255) {
                throw Error("Red value must be between " + Rgb.MinValue + " and " + Rgb.MaxValue + " inclusively.");
            }
            if (green < 0 || green > 255) {
                throw Error("Green value must be between " + Rgb.MinValue + " and " + Rgb.MaxValue + " inclusively.");
            }
            if (blue < 0 || blue > 255) {
                throw Error("Blue value must be between " + Rgb.MinValue + " and " + Rgb.MaxValue + " inclusively.");
            }
            this.red = red;
            this.green = green;
            this.blue = blue;
        }
        Rgb.prototype.getRed = function () {
            return this.red;
        };
        Rgb.prototype.getGreen = function () {
            return this.green;
        };
        Rgb.prototype.getBlue = function () {
            return this.blue;
        };
        Rgb.MinValue = 0;
        Rgb.MaxValue = 255;
        return Rgb;
    }());
    exports.Rgb = Rgb;
    var Color = (function () {
        function Color(color) {
            if (color == null) {
                throw new Error("color must be defined");
            }
            if (typeof color == "string") {
                this.convertStringColorToRgb(color);
            }
            else if (color instanceof Rgb) {
                this.value = color;
            }
            else {
                throw new Error("color not in a known type");
            }
        }
        Color.prototype.asHex = function () {
            return "#" + ((1 << 24) + (this.value.getRed() << 16) + (this.value.getGreen() << 8) + this.value.getBlue()).toString(16).slice(1);
        };
        Color.prototype.asRgb = function () {
            return "rgb(" + this.value.getRed() + "," + this.value.getGreen() + "," + this.value.getBlue() + ")";
        };
        Color.prototype.asRgba = function (alpha) {
            return "rgb(" + this.value.getRed() + "," + this.value.getGreen() + "," + this.value.getBlue() + "," + alpha + ")";
        };
        Color.prototype.convertStringColorToRgb = function (colorInString) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            colorInString = colorInString.replace(shorthandRegex, function (_m, r, g, b) { return (r + r + g + g + b + b); });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorInString);
            if (result != null) {
                this.value = new Rgb(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
            }
            else {
                throw new Error("Color in string only support Hex format");
            }
        };
        Color.prototype.equals = function (color) {
            return color != null && this.asHex() === color.asHex();
        };
        Color.prototype.getRed = function () {
            return this.value.getRed();
        };
        Color.prototype.getGreen = function () {
            return this.value.getGreen();
        };
        Color.prototype.getBlue = function () {
            return this.value.getBlue();
        };
        Color.prototype.convertToGrayscale = function () {
            var sumColor = this.getRed() + this.getGreen() + this.getBlue();
            var gray = Math.floor(sumColor / 3);
            var rgb = new Rgb(gray, gray, gray);
            var newColor = new Color(rgb);
            return newColor;
        };
        Color.prototype.invert = function () {
            return new Color(new Rgb(Rgb.MaxValue - this.getRed(), Rgb.MaxValue - this.getGreen(), Rgb.MaxValue - this.getBlue()));
        };
        Color.prototype.toBlackOrWhite = function () {
            var colorInvertedAndGray = this.convertToGrayscale();
            if (colorInvertedAndGray.getRed() < Rgb.MaxValue / 2) {
                return new Color("#000000");
            }
            return new Color("#ffffff");
        };
        Color.prototype.isLightColor = function () {
            return this.getRed() > 248 && this.getBlue() > 248 && this.getGreen() > 248;
        };
        return Color;
    }());
    exports.Color = Color;
    var AccessibilityColor = (function (_super) {
        tslib_1.__extends(AccessibilityColor, _super);
        function AccessibilityColor(color, displayName) {
            var _this = this;
            var colorCode;
            if (color instanceof Color) {
                colorCode = color.asHex();
            }
            else {
                colorCode = color;
            }
            _this = _super.call(this, colorCode) || this;
            _this.displayName = displayName;
            return _this;
        }
        AccessibilityColor.prototype.getDisplayName = function () {
            if (this.displayName == null) {
                return _super.prototype.asHex.call(this);
            }
            return this.displayName;
        };
        AccessibilityColor.FullPaletteColors = [
            new AccessibilityColor("#222222"), new AccessibilityColor("#292E6B"), new AccessibilityColor("#009CCC"), new AccessibilityColor("#00643A"),
            new AccessibilityColor("#339947"), new AccessibilityColor("#FBBC3D"), new AccessibilityColor("#DB552C"), new AccessibilityColor("#7F1725"),
            new AccessibilityColor("#EC008C"), new AccessibilityColor("#5C197B"), new AccessibilityColor("#51399F"), new AccessibilityColor("#444444"),
            new AccessibilityColor("#1B478B"), new AccessibilityColor("#43B4D5"), new AccessibilityColor("#207752"), new AccessibilityColor("#60AF49"),
            new AccessibilityColor("#FBD144"), new AccessibilityColor("#E87025"), new AccessibilityColor("#B20B1E"), new AccessibilityColor("#EF33A3"),
            new AccessibilityColor("#71338D"), new AccessibilityColor("#6951AA"), new AccessibilityColor("#666666"), new AccessibilityColor("#0D60AB"),
            new AccessibilityColor("#86CDDE"), new AccessibilityColor("#56987D"), new AccessibilityColor("#8DC54B"), new AccessibilityColor("#FBE74B"),
            new AccessibilityColor("#F58B1F"), new AccessibilityColor("#E60017"), new AccessibilityColor("#F266BA"), new AccessibilityColor("#9260A1"),
            new AccessibilityColor("#8874C2"), new AccessibilityColor("#888888"), new AccessibilityColor("#007ACC"), new AccessibilityColor("#C9E7E7"),
            new AccessibilityColor("#7CAF9A"), new AccessibilityColor("#A8CE4B"), new AccessibilityColor("#FBFD52"), new AccessibilityColor("#F7A24B"),
            new AccessibilityColor("#EB3345"), new AccessibilityColor("#F599D1"), new AccessibilityColor("#AE88B9"), new AccessibilityColor("#AA9CDF"),
            new AccessibilityColor("#AAAAAA"), new AccessibilityColor("#3F9BD8"), new AccessibilityColor("#D6EDED"), new AccessibilityColor("#9CC3B2"),
            new AccessibilityColor("#C3D84C"), new AccessibilityColor("#FCFD7D"), new AccessibilityColor("#F9B978"), new AccessibilityColor("#F06673"),
            new AccessibilityColor("#F9CCE8"), new AccessibilityColor("#C7ABD0"), new AccessibilityColor("#C0B6E9"), new AccessibilityColor("#CCCCCC"),
            new AccessibilityColor("#7FBCE5"), new AccessibilityColor("#E4F3F3"), new AccessibilityColor("#BFD8CD"), new AccessibilityColor("#D7E587"),
            new AccessibilityColor("#FCFEA8"), new AccessibilityColor("#FBD0A5"), new AccessibilityColor("#F599A2"), new AccessibilityColor("#FBDDEF"),
            new AccessibilityColor("#E0CAE7"), new AccessibilityColor("#DAD4F7")
        ];
        AccessibilityColor.VibrantPaletteColors = [
            new AccessibilityColor("#222222"), new AccessibilityColor("#666666"), new AccessibilityColor("#292E6B"), new AccessibilityColor("#009CCC"),
            new AccessibilityColor("#00643A"), new AccessibilityColor("#339947"), new AccessibilityColor("#FBBC3D"), new AccessibilityColor("#DB552C"),
            new AccessibilityColor("#7F1725"), new AccessibilityColor("#EC008C"), new AccessibilityColor("#5C197B"), new AccessibilityColor("#51399F"),
            new AccessibilityColor("#FFFFFF"), new AccessibilityColor("#CCCCCC"), new AccessibilityColor("#007ACC"), new AccessibilityColor("#C9E7E7"),
            new AccessibilityColor("#7CAF9A"), new AccessibilityColor("#A8CE4B"), new AccessibilityColor("#FBFD52"), new AccessibilityColor("#F7A24B"),
            new AccessibilityColor("#E60017"), new AccessibilityColor("#F599D1"), new AccessibilityColor("#AE88B9"), new AccessibilityColor("#AA9CDF")
        ];
        AccessibilityColor.MutePaletteColors = [
            new AccessibilityColor("#888888"), new AccessibilityColor("#007ACC"), new AccessibilityColor("#C9E7E7"), new AccessibilityColor("#7CAF9A"),
            new AccessibilityColor("#A8CE4B"), new AccessibilityColor("#FBFD52"), new AccessibilityColor("#F7A24B"), new AccessibilityColor("#EB3345"),
            new AccessibilityColor("#F599D1"), new AccessibilityColor("#AE88B9"), new AccessibilityColor("#AA9CDF"), new AccessibilityColor("#AAAAAA"),
            new AccessibilityColor("#3F9BD8"), new AccessibilityColor("#D6EDED"), new AccessibilityColor("#9CC3B2"), new AccessibilityColor("#C3D84C"),
            new AccessibilityColor("#FCFD7D"), new AccessibilityColor("#F9B978"), new AccessibilityColor("#F06673"), new AccessibilityColor("#F9CCE8"),
            new AccessibilityColor("#C7ABD0"), new AccessibilityColor("#C0B6E9"), new AccessibilityColor("#CCCCCC"), new AccessibilityColor("#7FBCE5"),
            new AccessibilityColor("#E4F3F3"), new AccessibilityColor("#BFD8CD"), new AccessibilityColor("#D7E587"), new AccessibilityColor("#FCFEA8"),
            new AccessibilityColor("#FBD0A5"), new AccessibilityColor("#F599A2"), new AccessibilityColor("#FBDDEF"), new AccessibilityColor("#E0CAE7"),
            new AccessibilityColor("#DAD4F7"), new AccessibilityColor("#FFFFFF"), new AccessibilityColor("#BFDDF2"), new AccessibilityColor("#F1F9F9"),
            new AccessibilityColor("#E3F5EE"), new AccessibilityColor("#EBF2C3"), new AccessibilityColor("#FEFED3"), new AccessibilityColor("#FDE7D2"),
            new AccessibilityColor("#FACCD0"), new AccessibilityColor("#FDEEF7"), new AccessibilityColor("#F5E5FB"), new AccessibilityColor("#EDEAFF")
        ];
        return AccessibilityColor;
    }(Color));
    exports.AccessibilityColor = AccessibilityColor;
});
