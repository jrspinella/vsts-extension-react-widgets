import { Observable } from "VSSUI/Utilities/Observable";
export declare class StaticObservable extends Observable<any> {
    private static _instance;
    static getInstance(): StaticObservable;
}
