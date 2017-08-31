define(["require", "exports", "../../Utils/EventManager"], function (require, exports, EventManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseStore = (function () {
        function BaseStore() {
            this._eventManager = new EventManager_1.EventManager();
            this.items = null;
            this._isLoading = false;
            this._isItemLoadingMap = {};
            this.initializeActionListeners();
        }
        BaseStore.prototype.addChangedListener = function (handler) {
            this._eventManager.subscribe(handler);
        };
        BaseStore.prototype.removeChangedListener = function (handler) {
            this._eventManager.unsubscribe(handler);
        };
        BaseStore.prototype.emitChanged = function () {
            this._eventManager.invokeHandlers(null);
        };
        BaseStore.prototype.isLoaded = function (key) {
            var dataLoaded;
            if (key) {
                dataLoaded = this.itemExists(key);
            }
            else {
                dataLoaded = this.items != null ? true : false;
            }
            return dataLoaded && !this.isLoading(key);
        };
        BaseStore.prototype.isLoading = function (key) {
            if (key) {
                return this._isLoading || this._isItemLoadingMap[this.convertItemKeyToString(key)] === true;
            }
            else {
                return this._isLoading;
            }
        };
        BaseStore.prototype.setLoading = function (loading, key) {
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
        };
        BaseStore.prototype.itemExists = function (key) {
            return this.getItem(key) != null ? true : false;
        };
        BaseStore.prototype.getAll = function () {
            return this.items;
        };
        return BaseStore;
    }());
    exports.BaseStore = BaseStore;
    var StoreFactory;
    (function (StoreFactory) {
        var storeInstances = {};
        function getInstance(type) {
            var instance = new type();
            if (!storeInstances[instance.getKey()]) {
                storeInstances[instance.getKey()] = instance;
            }
            return storeInstances[instance.getKey()];
        }
        StoreFactory.getInstance = getInstance;
    })(StoreFactory = exports.StoreFactory || (exports.StoreFactory = {}));
});
