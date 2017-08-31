import { EventManager } from "../../Utils/EventManager";

export abstract class BaseStore<TCollection, TItem, TKey> {
    protected items: TCollection;

    private _eventManager = new EventManager();
    private _isLoading: boolean;
    private _isItemLoadingMap: IDictionaryStringTo<boolean>;

    constructor() {        
        this.items = null;
        this._isLoading = false;
        this._isItemLoadingMap = {};

        this.initializeActionListeners();
    }    

    public addChangedListener(handler: () => void) {
        this._eventManager.subscribe(handler);
    }

    public removeChangedListener(handler: () => void) {
        this._eventManager.unsubscribe(handler);
    }

    protected emitChanged(): void {
        this._eventManager.invokeHandlers(null);
    }

    public isLoaded(key?: TKey): boolean {
        let dataLoaded: boolean;
        if (key) {
            dataLoaded = this.itemExists(key);
        }
        else {
            dataLoaded = this.items != null ? true : false;
        }

        return dataLoaded && !this.isLoading(key);
    }

    public isLoading(key?: TKey): boolean {
        if (key) {
            return this._isLoading || this._isItemLoadingMap[this.convertItemKeyToString(key)] === true;
        }
        else {
            return this._isLoading;
        }
    }

    public setLoading(loading: boolean, key?: TKey) {
        if (key) {
            if (loading) {
                this._isItemLoadingMap[this.convertItemKeyToString(key)] = true;
            }
            else {
                delete this._isItemLoadingMap[this.convertItemKeyToString(key)];
            }
        }
        else {
            this._isLoading = loading;
        }

        this.emitChanged();
    }  

    public itemExists(key: TKey): boolean {        
        return this.getItem(key) != null ? true : false;
    }

    public getAll(): TCollection {
        return this.items;
    }

    protected abstract initializeActionListeners();
    protected abstract convertItemKeyToString(key: TKey): string;
    public abstract getItem(key: TKey): TItem;
    public abstract getKey(): string;
}

export module StoreFactory {
    let storeInstances: IDictionaryStringTo<BaseStore<any, any, any>> = {};

    export function getInstance<TStore extends BaseStore<any, any, any>>(type:{new(): TStore;}): TStore {
        const instance = new type();
        if (!storeInstances[instance.getKey()]) {
            storeInstances[instance.getKey()] = instance;
        }
        return storeInstances[instance.getKey()] as TStore;
    }
}