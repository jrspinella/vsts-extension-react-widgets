define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoreUtils;
    (function (CoreUtils) {
        function delegate(instance, method, data) {
            return function () {
                if (typeof (data) === "undefined") {
                    return method.apply(instance, arguments);
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 0);
                    if (data instanceof Array) {
                        args = args.concat(data);
                    }
                    else {
                        args.push(data);
                    }
                    return method.apply(instance, args);
                }
            };
        }
        CoreUtils.delegate = delegate;
        var DelayedFunction = (function () {
            function DelayedFunction(instance, ms, method, data) {
                this._interval = ms;
                this._func = delegate(instance, method, data);
            }
            DelayedFunction.prototype.dispose = function () {
                this.cancel();
                this._func = null;
            };
            DelayedFunction.prototype.start = function () {
                var _this = this;
                if (!this._timeoutHandle) {
                    this._timeoutHandle = window.setTimeout(function () {
                        delete _this._timeoutHandle;
                        try {
                            _this._invoke.call(_this);
                        }
                        catch (_e) {
                        }
                    }, this._interval);
                }
            };
            DelayedFunction.prototype.reset = function () {
                this.cancel();
                this.start();
            };
            DelayedFunction.prototype.cancel = function () {
                if (this._timeoutHandle) {
                    window.clearTimeout(this._timeoutHandle);
                    delete this._timeoutHandle;
                }
            };
            DelayedFunction.prototype.invokeNow = function () {
                this.cancel();
                this._invoke();
            };
            DelayedFunction.prototype.isPending = function () {
                return this._timeoutHandle ? true : false;
            };
            DelayedFunction.prototype._invoke = function () {
                this._func();
            };
            return DelayedFunction;
        }());
        CoreUtils.DelayedFunction = DelayedFunction;
        function delay(instance, ms, method, data) {
            var delayedFunc = new DelayedFunction(instance, ms, method, data);
            delayedFunc.start();
            return delayedFunc;
        }
        CoreUtils.delay = delay;
        function throttledDelegate(instance, ms, method, data) {
            var delayedFunc = new DelayedFunction(instance, ms, method, data);
            return delegate(delayedFunc, function () {
                delayedFunc.reset();
            });
        }
        CoreUtils.throttledDelegate = throttledDelegate;
    })(CoreUtils = exports.CoreUtils || (exports.CoreUtils = {}));
});
