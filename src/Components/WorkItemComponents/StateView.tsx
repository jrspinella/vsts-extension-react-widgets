import "./StateView.scss";

import * as React from "react";

import { WorkItemStateItemActions } from "../../Flux/Actions/WorkItemStateItemActions";
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
import { WorkItemStateItemStore } from "../../Flux/Stores/WorkItemStateItemStore";
import { ArrayUtils } from "../../Utilities/Array";
import { StringUtils } from "../../Utilities/String";
import {
    BaseComponent, IBaseComponentProps, IBaseComponentState
} from "../Utilities/BaseComponent";

import { Label } from "OfficeFabric/Label";

import { WorkItemStateColor } from "TFS/WorkItemTracking/Contracts";

export interface IStateViewProps extends IBaseComponentProps {
    state: string;
    workItemType: string;
}

export interface IStateViewState extends IBaseComponentState {
    workItemTypeState: WorkItemStateColor;
}

export class StateView extends BaseComponent<IStateViewProps, IStateViewState> {
    private _workItemStateItemStore = StoreFactory.getInstance<WorkItemStateItemStore>(WorkItemStateItemStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemStateItemStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        WorkItemStateItemActions.initializeWorkItemStates(this.props.workItemType);
    }

    protected initializeState(): void {
        this.state = { workItemTypeState: null };
    }

    protected getDefaultClassName(): string {
        return "work-item-state-view";
    }

    protected getStoresState(): IStateViewState {
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

        return (
            <div className={this.getClassName()}>
                <span 
                    className="work-item-type-state-color"
                    style={{
                        backgroundColor: stateColor,
                        borderColor: stateColor
                    }} 
                />
                <Label className="state-name">{this.props.state}</Label>
            </div>
        )
    }
}