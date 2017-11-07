define(["require", "exports", "tslib", "VSSUI/Utilities/Observable"], function (require, exports, tslib_1, Observable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseStore = (function (_super) {
        tslib_1.__extends(BaseStore, _super);
        function BaseStore() {
            var _this = _super.call(this) || this;
            _this.items = null;
            _this._isLoading = false;
            _this._isItemLoadingMap = {};
            _this.initializeActionListeners();
            return _this;
        }
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
        BaseStore.prototype.addChangedListener = function (listener) {
            this.subscribe(listener);
        };
        BaseStore.prototype.removeChangedListener = function (listener) {
            this.unsubscribe(listener);
        };
        BaseStore.prototype.emitChanged = function () {
            this.notify(null, null);
        };
        return BaseStore;
    }(Observable_1.Observable));
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
