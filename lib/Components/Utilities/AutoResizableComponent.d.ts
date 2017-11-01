import { BaseFluxComponent } from "./BaseFluxComponent";
export declare abstract class AutoResizableComponent<TP, TS> extends BaseFluxComponent<TP, TS> {
    private _windowResizeThrottleDelegate;
    private _bodyElement;
    constructor(props: TP, context?: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    protected resize(): void;
}
