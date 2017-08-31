export class EventManager<TEventArgs> {
    private _handlers: ((eventArgs: TEventArgs) => void)[] = [];

    public subscribe(handler: (eventArgs: TEventArgs) => void) {        
        if (handler) {
            this._handlers.push(handler);
        }
    }
   
    public unsubscribe(handler: (eventArgs: TEventArgs) => void) {
        this._handlers = this._handlers.filter(h => h !== handler);
    }

    public invokeHandlers(eventArgs: TEventArgs): void {
        for (const handler of this._handlers) {
            handler(eventArgs);
        }
    }
}