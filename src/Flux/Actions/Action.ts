import { Observable } from "VSSUI/Utilities/Observable";

export class Action<T> extends Observable<T> {
    private static executing: boolean = false;

    public invoke(payload: T): void {
        if (Action.executing) {
            throw new Error("Cannot invoke an action from inside another action.");
        }

        Action.executing = true;

        try {
            this.notify(payload, null);
        }
        finally {
            Action.executing = false;
        }
    }
}