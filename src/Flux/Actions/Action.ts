import { EventManager } from "../../Utils/EventManager";

export class Action<T> {
    private static executing: boolean = false;
    private _eventManager = new EventManager<T>();

    public invoke(payload: T): void {
        if (Action.executing) {
            throw new Error("Cannot invoke an action from inside another action.");
        }

        Action.executing = true;

        try {
            this._eventManager.invokeHandlers(payload);
        }
        finally {
            Action.executing = false;
        }
    }

    public addListener(listener: (payload: T) => void) {
        this._eventManager.subscribe(listener);
    }

    public removeListener(listener: (payload: T) => void) {
        this._eventManager.unsubscribe(listener);
    }

    protected emitChanged(): void {
        this._eventManager.invokeHandlers(null);
    }
}
    