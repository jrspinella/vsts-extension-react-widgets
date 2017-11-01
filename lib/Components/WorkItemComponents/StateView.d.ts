/// <reference types="react" />
import "./StateView.scss";
import { BaseStore } from "../../Flux/Stores/BaseStore";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "../Utilities/BaseFluxComponent";
import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
export interface IStateViewProps extends IBaseFluxComponentProps {
    state: string;
    workItemType: string;
}
export interface IStateViewState extends IBaseFluxComponentState {
    workItemTypeState: WorkItemStateColor;
}
export declare class StateView extends BaseFluxComponent<IStateViewProps, IStateViewState> {
    private _workItemStateItemStore;
    protected getStores(): BaseStore<any, any, any>[];
    componentDidMount(): void;
    protected initializeState(): void;
    protected getStoresState(): IStateViewState;
    render(): JSX.Element;
}
