import { CoreUtils } from "../../Utilities/Core";
import {BaseComponent} from "./BaseComponent"; 

export abstract class AutoResizableComponent<TP, TS> extends BaseComponent<TP, TS> {
    private _windowResizeThrottleDelegate: any;
    private _bodyElement: HTMLBodyElement;

    constructor(props: TP, context?: any) {
        super(props, context);

        this._bodyElement = document.getElementsByTagName("body").item(0) as HTMLBodyElement; 
        this._windowResizeThrottleDelegate = CoreUtils.throttledDelegate(this, 50, this.resize);

        $(window).resize(this._windowResizeThrottleDelegate);
    }

    public componentDidMount() {
        super.componentDidMount();
        this.resize();
    }

    public componentDidUpdate() {
        this.resize();
    }

    protected resize() {               
        VSS.resize(null, this._bodyElement.offsetHeight);  
    }
}