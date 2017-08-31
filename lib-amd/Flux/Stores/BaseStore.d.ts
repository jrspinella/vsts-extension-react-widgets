export declare abstract class BaseStore<TCollection, TItem, TKey> {
    protected items: TCollection;
    private _eventManager;
    private _isLoading;
    private _isItemLoadingMap;
    constructor();
    addChangedListener(handler: () => void): void;
    removeChangedListener(handler: () => void): void;
    protected emitChanged(): void;
    isLoaded(key?: TKey): boolean;
    isLoading(key?: TKey): boolean;
    setLoading(loading: boolean, key?: TKey): void;
    itemExists(key: TKey): boolean;
    getAll(): TCollection;
    protected abstract initializeActionListeners(): any;
    protected abstract convertItemKeyToString(key: TKey): string;
    abstract getItem(key: TKey): TItem;
    abstract getKey(): string;
}
export declare module StoreFactory {
    function getInstance<TStore extends BaseStore<any, any, any>>(type: {
        new (): TStore;
    }): TStore;
}
