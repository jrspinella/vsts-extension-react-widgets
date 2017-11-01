define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExtensionDataManager = (function () {
        function ExtensionDataManager() {
        }
        ExtensionDataManager.readDocuments = function (key, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService, data, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, dataService.getDocuments(key, isPrivate ? { scopeType: "User" } : undefined)];
                        case 3:
                            data = _a.sent();
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            data = [];
                            return [3, 5];
                        case 5: return [2, data];
                    }
                });
            });
        };
        ExtensionDataManager.readDocument = function (key, id, defaultValue, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService, data, e_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, dataService.getDocument(key, id, isPrivate ? { scopeType: "User" } : undefined)];
                        case 3:
                            data = _a.sent();
                            return [3, 5];
                        case 4:
                            e_2 = _a.sent();
                            data = defaultValue || null;
                            return [3, 5];
                        case 5: return [2, data];
                    }
                });
            });
        };
        ExtensionDataManager.createDocument = function (key, data, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            return [4, dataService.createDocument(key, data, isPrivate ? { scopeType: "User" } : undefined)];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        ExtensionDataManager.updateDocument = function (key, data, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            return [4, dataService.updateDocument(key, data, isPrivate ? { scopeType: "User" } : undefined)];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        ExtensionDataManager.addOrUpdateDocument = function (key, data, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            return [4, dataService.setDocument(key, data, isPrivate ? { scopeType: "User" } : undefined)];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        ExtensionDataManager.deleteDocument = function (key, id, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            return [4, dataService.deleteDocument(key, id, isPrivate ? { scopeType: "User" } : undefined)];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        ExtensionDataManager.readUserSetting = function (key, defaultValue, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService, data, e_3;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, dataService.getValue(key, isPrivate ? { scopeType: "User" } : undefined)];
                        case 3:
                            data = _a.sent();
                            return [2, data || defaultValue || null];
                        case 4:
                            e_3 = _a.sent();
                            return [2, defaultValue || null];
                        case 5: return [2];
                    }
                });
            });
        };
        ExtensionDataManager.writeUserSetting = function (key, data, isPrivate) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataService;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, VSS.getService(VSS.ServiceIds.ExtensionData)];
                        case 1:
                            dataService = _a.sent();
                            return [4, dataService.setValue(key, data, isPrivate ? { scopeType: "User" } : undefined)];
                        case 2: return [2, _a.sent()];
                    }
                });
            });
        };
        return ExtensionDataManager;
    }());
    exports.ExtensionDataManager = ExtensionDataManager;
});
