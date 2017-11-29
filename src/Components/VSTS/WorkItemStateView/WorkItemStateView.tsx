import "./WorkItemStateView.css";

import * as React from "react";

import { WorkItemStateItemActions } from "../../../Flux/Actions/WorkItemStateItemActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemStateItemStore } from "../../../Flux/Stores/WorkItemStateItemStore";
import { ArrayUtils } from "../../../Utilities/Array";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";

import { Label } from "OfficeFabric/Label";
import { css } from "OfficeFabric/Utilities";

import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemStateViewProps extends IBaseFluxComponentProps {
    state: string;
    workItemType: string;
}

export interface IWorkItemStateViewState extends IBaseFluxComponentState {
    workItemTypeState: WorkItemStateColor;
}

export class WorkItemStateView extends BaseFluxComponent<IWorkItemStateViewProps, IWorkItemStateViewState> {
    private _workItemStateItemStore = StoreFactory.getInstance<WorkItemStateItemStore>(WorkItemStateItemStore);

    protected initializeState(): void {
        this.state = { workItemTypeState: null };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemStateItemStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._workItemStateItemStore.isLoaded(this.props.workItemType)) {
            const workItemTypeStates = this._workItemStateItemStore.getItem(this.props.workItemType);
            this.setState({
                workItemTypeState: ArrayUtils.first(workItemTypeStates, s => StringUtils.equals(s.name, this.props.state, true))
            });
        }
        else {
            WorkItemStateItemActions.initializeWorkItemStates(this.props.workItemType);
        }        
    }

    public componentWillReceiveProps(nextProps: IWorkItemStateViewProps) {
        super.componentWillReceiveProps(nextProps);

        if (!StringUtils.equals(nextProps.state, this.props.state, true) || !StringUtils.equals(nextProps.workItemType, this.props.workItemType, true)) {
            if (this._workItemStateItemStore.isLoaded(nextProps.workItemType)) {
                const workItemTypeStates = this._workItemStateItemStore.getItem(nextProps.workItemType);
                this.setState({
                    workItemTypeState: ArrayUtils.first(workItemTypeStates, s => StringUtils.equals(s.name, nextProps.state, true))
                })
            }
            else {
                WorkItemStateItemActions.initializeWorkItemStates(nextProps.workItemType);
            }
        }
    }
    
    protected getStoresState(): IWorkItemStateViewState {
        const workItemTypeStates = this._workItemStateItemStore.getItem(this.props.workItemType);

        return {
            workItemTypeState: workItemTypeStates ? ArrayUtils.first(workItemTypeStates, s => StringUtils.equals(s.name, this.props.state, true)) : null
        }
    }

    public render(): JSX.Element {
        let stateColor;

        if (this.state.workItemTypeState && this.state.workItemTypeState.color) {
            stateColor = "#" + this.state.workItemTypeState.color.substring(this.state.workItemTypeState.color.length - 6);
        }
        else {
            stateColor = "#000000";
        }

        return <div className={css("work-item-state-view", this.props.className)}>
            <span 
                className="work-item-type-state-color"
                style={{
                    backgroundColor: stateColor,
                    borderColor: stateColor
                }} 
            />
            <Label className="state-name">{this.props.state}</Label>
        </div>;
    }
}