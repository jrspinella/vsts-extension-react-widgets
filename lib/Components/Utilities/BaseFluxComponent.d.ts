import { BaseStore } from "../../Flux/Stores/BaseStore";
import { BaseComponent, IBaseProps } from "OfficeFabric/Utilities";
export interface IBaseFluxComponentProps extends IBaseProps {
    className?: string;
}
export interface IBaseFluxComponentState {
    loading?: boolean;
}
export declare class BaseFluxComponent<TProps extends IBaseFluxComponentProps, TState extends IBaseFluxComponentState> extends BaseComponent<TProps, TState> {
    constructor(props: TProps, context?: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getStores(): BaseStore<any, any, any>[];
    protected getStoresState(): TState;
    protected initializeState(): void;
    private _onStoreChanged();
}
