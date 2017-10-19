import "./TitleView.scss";

import * as React from "react";

import { WorkItemTypeActions } from "../../Flux/Actions/WorkItemTypeActions";
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
import { WorkItemTypeStore } from "../../Flux/Stores/WorkItemTypeStore";
import {
    BaseComponent, IBaseComponentProps, IBaseComponentState
} from "../Utilities/BaseComponent";

import { Label } from "OfficeFabric/Label";

import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

export interface ITitleViewProps extends IBaseComponentProps {
    workItemId: number;
    title: string;
    workItemType: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
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

        const webContext = VSS.getWebContext();
        const witUrl = `${webContext.collection.uri}/${webContext.project.name}/_workitems/edit/${this.props.workItemId}`;

        return (
            <Label 
                className={`${this.getClassName()} ${(witIconUrl || !wit) ? "no-color" : ""}`}
                style={(witIconUrl || !wit) ? undefined : {borderColor: witColor}}>

                {witIconUrl && <img src={witIconUrl} />}
                <a 
                    href={witUrl} 
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        if (!e.ctrlKey) {
                            e.preventDefault();
                            this.props.onClick(e);
                        }
                    }}>
                    {this.props.title}
                </a>
            </Label>
        )
    }
}