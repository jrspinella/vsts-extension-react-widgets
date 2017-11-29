import { Observable } from "VSSUI/Utilities/Observable";

export class StaticObservable extends Observable<any> {
    private static _instance: StaticObservable;
    
    public static getInstance(): StaticObservable {
        if (!this._instance) {
            this._instance = new Observable<any>();
        }

        return this._instance;
    }
}