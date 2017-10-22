import { BaseComponent } from "./BaseComponent";
export declare abstract class AutoResizableComponent<TP, TS> extends BaseComponent<TP, TS> {
    private _windowResizeThrottleDelegate;
    private _bodyElement;
    constructor(props: TP, context?: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    protected resize(): void;
}
