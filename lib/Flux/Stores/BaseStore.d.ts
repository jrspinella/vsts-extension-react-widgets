import { Observable } from "VSSUI/Utilities/Observable";
export declare abstract class BaseStore<TCollection, TItem, TKey> extends Observable<void> {
    protected items: TCollection;
    private _isLoading;
    private _isItemLoadingMap;
    constructor();
    isLoaded(key?: TKey): boolean;
    isLoading(key?: TKey): boolean;
    setLoading(loading: boolean, key?: TKey): void;
    itemExists(key: TKey): boolean;
    getAll(): TCollection;
    addChangedListener(listener: () => void): void;
    removeChangedListener(listener: () => void): void;
    protected emitChanged(): void;
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
