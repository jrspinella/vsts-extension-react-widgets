import "./TitleView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

import { BaseComponent, IBaseComponentState, IBaseComponentProps } from "../Common/BaseComponent"; 
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
import { WorkItemTypeStore } from "../../Flux/Stores/WorkItemTypeStore";
import { WorkItemTypeActions } from "../../Flux/Actions/WorkItemTypeActions";

export interface ITitleViewProps extends IBaseComponentProps {
    title: string;
    workItemType: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ITitleViewState extends IBaseComponentState {
    workItemType: WorkItemType;
}

export class TitleView extends BaseComponent<ITitleViewProps, ITitleViewState> {
    private _workItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemTypeStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        WorkItemTypeActions.initializeWorkItemTypes();
    }

    protected initializeState(): void {
        this.state = { workItemType: null };
    }

    protected getDefaultClassName(): string {
        return "work-item-title-view";
    }

    protected getStoresState(): ITitleViewState {
        return {
            workItemType: this._workItemTypeStore.isLoaded() ? this._workItemTypeStore.getItem(this.props.workItemType) : null
        }
    }

    public render(): JSX.Element {
        const wit = this.state.workItemType;

        let witColor = wit ? wit.color : null;
        const witIcon = wit ? (wit as any).icon : null;
        let witIconUrl = (witIcon && witIcon.id) ? witIcon.url : null;

        if (witColor) {
            witColor = "#" + witColor.substring(witColor.length - 6);
        }
        else {
            witColor = "#000000";
        }
        
        return (            
            <Label className={`${this.getClassName()} ${(witIconUrl || !wit) ? "no-color" : ""}`}
                style={(witIconUrl || !wit) ? undefined : {borderColor: witColor}}
                onClick={(e: React.MouseEvent<HTMLLabelElement>) => {
                    if (this.props.onClick) {
                        this.props.onClick(e);
                    }
                }}>
                {witIconUrl && <img src={witIconUrl} />}
                {this.props.title}
            </Label>
        )
    }
}