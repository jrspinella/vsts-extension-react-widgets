export declare module CoreUtils {
    function delegate(instance: any, method: Function, data?: any): (...args: any[]) => any;
    class DelayedFunction {
        private _interval;
        private _func;
        private _timeoutHandle;
        constructor(instance: any, ms: number, method: Function, data?: any[]);
        dispose(): void;
        start(): void;
        reset(): void;
        cancel(): void;
        invokeNow(): void;
        isPending(): boolean;
        private _invoke();
    }
    function delay(instance: any, ms: number, method: Function, data?: any[]): DelayedFunction;
    function throttledDelegate(instance: any, ms: number, method: Function, data?: any[]): (...args: any[]) => any;
}
