export declare class Action<T> {
    private static executing;
    private _eventManager;
    invoke(payload: T): void;
    addListener(listener: (payload: T) => void): void;
    removeListener(listener: (payload: T) => void): void;
    protected emitChanged(): void;
}
