define(["require", "exports", "tslib", "./AutoResizableComponent", "TFS/WorkItemTracking/Services"], function (require, exports, tslib_1, AutoResizableComponent_1, Services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FieldControl = (function (_super) {
        tslib_1.__extends(FieldControl, _super);
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemFormService, e_1;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var workItemFormService, e_2;
                return tslib_1.__generator(this, function (_a) {
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
