export declare class ExtensionDataManager {
    static readDocuments<T>(key: string, isPrivate?: boolean): Promise<T[]>;
    static readDocument<T>(key: string, id: string, defaultValue?: T, isPrivate?: boolean): Promise<T>;
    static createDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T>;
    static updateDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T>;
    static addOrUpdateDocument<T>(key: string, data: T, isPrivate?: boolean): Promise<T>;
    static deleteDocument(key: string, id: string, isPrivate?: boolean): Promise<void>;
    static readUserSetting<T>(key: string, defaultValue?: T, isPrivate?: boolean): Promise<T>;
    static writeUserSetting<T>(key: string, data: T, isPrivate?: boolean): Promise<T>;
}
