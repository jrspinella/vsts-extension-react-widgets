/// <reference types="react" />
import "./StateView.scss";
import { BaseStore } from "../../Flux/Stores/BaseStore";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";
export interface IStateViewProps extends IBaseComponentProps {
    state: string;
    workItemType: string;
}
export interface IStateViewState extends IBaseComponentState {
    workItemTypeState: WorkItemStateColor;
}
export declare class StateView extends BaseComponent<IStateViewProps, IStateViewState> {
    private _workItemStateItemStore;
    protected getStores(): BaseStore<any, any, any>[];
    componentDidMount(): void;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    protected getStoresState(): IStateViewState;
    render(): JSX.Element;
}
