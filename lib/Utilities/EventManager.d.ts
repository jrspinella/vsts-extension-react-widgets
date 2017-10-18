export declare class EventManager<TEventArgs> {
    private _handlers;
    subscribe(handler: (eventArgs: TEventArgs) => void): void;
    unsubscribe(handler: (eventArgs: TEventArgs) => void): void;
    invokeHandlers(eventArgs: TEventArgs): void;
}
