export class ExtensionDataManager {
    /**
    * Read user/account scoped documents
    */
    public static async readDocuments<T>(key: string, isPrivate?: boolean): Promise<T[]> {       
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        let data: T[];

        try {            
            data = await dataService.getDocuments(key, isPrivate ? { scopeType: "User" } : undefined);
        }
        catch (e) {
            data = [];
        }

        return data;
    }

    /**
    * Read a specific user/account scoped document
    */
    public static async readDocument<T>(key: string, id: string, defaultValue?: T, isPrivate?: boolean): Promise<T> {
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        let data: T;
        try {            
            data = await dataService.getDocument(key, id, isPrivate ? { scopeType: "User" } : undefined);
        }
        catch (e) {
            data = defaultValue || null;
        }

        return data;
    }

    /**
    * Create user/account scoped document
    */
    public static async createDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T> {
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.createDocument(key, data, isPrivate ? { scopeType: "User" } : undefined);
    }

    /**
    * Update user/account scoped document
    */
    public static async updateDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T> {
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.updateDocument(key, data, isPrivate ? { scopeType: "User" } : undefined);
    }

    /**
    * Add or Update user/account scoped document
    */
    public static async addOrUpdateDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T> {
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.setDocument(key, data, isPrivate ? { scopeType: "User" } : undefined);
    }

    /**
    * Delete user/account scoped document
    */
    public static async deleteDocument(key: string, id: string, isPrivate?: boolean): Promise<void> {
        let dataService: IExtensionDataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.deleteDocument(key, id, isPrivate ? { scopeType: "User" } : undefined);
    }

    /**
    * Read user extension settings
    */
    public static async readUserSetting<T>(key: string, defaultValue?: T, isPrivate?: boolean): Promise<T> {
        const dataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        try {
            const data = await dataService.getValue<T>(key, isPrivate ? { scopeType: "User" } : undefined);
            return data || defaultValue || null;
        }
        catch (e) {
            return defaultValue || null;
        }
    }

    /**
    * Write user extension settings
    */
    public static async writeUserSetting<T>(key: string, data: T, isPrivate?: boolean): Promise<T> {
        const dataService = await VSS.getService<IExtensionDataService>(VSS.ServiceIds.ExtensionData);
        return await dataService.setValue<T>(key, data, isPrivate ? { scopeType: "User" } : undefined);
    }
}