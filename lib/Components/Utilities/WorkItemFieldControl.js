var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./AutoResizableComponent", "TFS/WorkItemTracking/Services"], function (require, exports, AutoResizableComponent_1, Services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FieldControl = (function (_super) {
        __extends(FieldControl, _super);
        function FieldControl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FieldControl.getInputs = function () {
            return VSS.getConfiguration().witInputs;
        };
        FieldControl.prototype.initialize = function () {
            var _this = this;
            VSS.register(VSS.getContribution().id, {
                onLoaded: function (_args) {
                    _this._invalidate();
                },
                onUnloaded: function (_args) {
                    _this._setValue(null);
                },
                onFieldChanged: function (args) {
                    if (args.changedFields[_this.props.fieldName] != null) {
                        _this._invalidate();
                    }
                },
            });
        };
        FieldControl.prototype.onValueChanged = function (newValue) {
            return __awaiter(this, void 0, void 0, function () {
                var workItemFormService, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._setValue(newValue);
                            this._flushing = true;
                            return [4, Services_1.WorkItemFormService.getService()];
                        case 1:
                            workItemFormService = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, workItemFormService.setFieldValue(this.props.fieldName, newValue)];
                        case 3:
                            _a.sent();
                            this._flushing = false;
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            this._flushing = false;
                            this._onError("Error in storing the field value: " + e_1.message);
                            return [3, 5];
                        case 5: return [2];
                    }
                });
            });
        };
        FieldControl.prototype.getErrorMessage = function (_value) {
            return "";
        };
        FieldControl.prototype._invalidate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this._flushing) return [3, 2];
                            return [4, this._getCurrentFieldValue()];
                        case 1:
                            value = _a.sent();
                            this._setValue(value);
                            _a.label = 2;
                        case 2:
                            this.resize();
                            return [2];
                    }
                });
            });
        };
        FieldControl.prototype._getCurrentFieldValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var workItemFormService, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Services_1.WorkItemFormService.getService()];
                        case 1:
                            workItemFormService = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, workItemFormService.getFieldValue(this.props.fieldName)];
                        case 3: return [2, _a.sent()];
                        case 4:
                            e_2 = _a.sent();
                            this._onError("Error in loading the field value: " + e_2.message);
                            return [2, null];
                        case 5: return [2];
                    }
                });
            });
        };
        FieldControl.prototype._setValue = function (value) {
            this.setState({ value: value, error: this.getErrorMessage(value) });
        };
        FieldControl.prototype._onError = function (error) {
            this.setState({ error: error });
        };
        return FieldControl;
    }(AutoResizableComponent_1.AutoResizableComponent));
    exports.FieldControl = FieldControl;
});
