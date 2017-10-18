export module CoreUtils {
    export function delegate(instance: any, method: Function, data?: any): (...args: any[]) => any {
        return function () {
            if (typeof (data) === "undefined") {
                return method.apply(instance, arguments);
            }
            else {
                let args = <any[]>Array.prototype.slice.call(arguments, 0);

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

    export class DelayedFunction {
        private _interval: number;
        private _func: (...args: any[]) => any;
        private _timeoutHandle: number;
    
        constructor(instance: any, ms: number, method: Function, data?: any[]) {
            this._interval = ms;
            this._func = delegate(instance, method, data);
        }

        public dispose() {
            this.cancel();
            this._func = null;
        }
        
        public start() {
            if (!this._timeoutHandle) {
                this._timeoutHandle = window.setTimeout(() => {
                    delete this._timeoutHandle;
                    try {
                        this._invoke.call(this);
                    }
                    catch(_e) {

                    }
                }, this._interval);
            }
        }

        public reset() {
            this.cancel();
            this.start();
        }

        public cancel() {
            if (this._timeoutHandle) {
                window.clearTimeout(this._timeoutHandle);
                delete this._timeoutHandle;
            }
        }

        public invokeNow() {
            this.cancel();
            this._invoke();
        }

        public isPending(): boolean {
            return this._timeoutHandle ? true : false;
        }

        private _invoke() {
            this._func();
        }
    }

    export function delay(instance: any, ms: number, method: Function, data?: any[]): DelayedFunction {
        const delayedFunc = new DelayedFunction(instance, ms, method, data);
        delayedFunc.start();
        return delayedFunc;
    }

    export function throttledDelegate(instance: any, ms: number, method: Function, data?: any[]): (...args: any[]) => any {
        const delayedFunc = new DelayedFunction(instance, ms, method, data);
    
        return delegate(delayedFunc, () => {
            delayedFunc.reset();
        });
    }
}