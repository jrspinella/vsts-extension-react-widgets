import { Observable } from "VSSUI/Utilities/Observable";
export declare class Action<T> extends Observable<T> {
    private static executing;
    invoke(payload: T): void;
    addListener(listener: (payload: T) => void): void;
    removeListener(listener: (payload: T) => void): void;
}
