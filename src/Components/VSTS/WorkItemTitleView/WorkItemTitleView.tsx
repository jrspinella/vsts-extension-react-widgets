import "./WorkItemTitleView.css";

import * as React from "react";

import { WorkItemTypeActions } from "../../../Flux/Actions/WorkItemTypeActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemTypeStore } from "../../../Flux/Stores/WorkItemTypeStore";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";

import { Link } from "OfficeFabric/Link";
import { css } from "OfficeFabric/Utilities";

import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemTitleViewProps extends IBaseFluxComponentProps {
    workItemId: number;
    title: string;
    workItemType: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IWorkItemTitleViewState extends IBaseFluxComponentState {
    workItemType: WorkItemType;
}

export class WorkItemTitleView extends BaseFluxComponent<IWorkItemTitleViewProps, IWorkItemTitleViewState> {
    private _workItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    protected initializeState(): void {
        this.state = { workItemType: null };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemTypeStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._workItemTypeStore.isLoaded()) {
            this.setState({
                workItemType: this._workItemTypeStore.getItem(this.props.workItemType)
            });
        }
        else {
            WorkItemTypeActions.initializeWorkItemTypes();
        }
    }

    public componentWillReceiveProps(nextProps: IWorkItemTitleViewProps) {
        super.componentWillReceiveProps(nextProps);

        if (!StringUtils.equals(nextProps.workItemType, this.props.workItemType, true)) {
            if (this._workItemTypeStore.isLoaded()) {
                this.setState({
                    workItemType: this._workItemTypeStore.getItem(nextProps.workItemType)
                });
            }
        }
    }

    protected getStoresState(): IWorkItemTitleViewState {
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

        return <div 
            className={`${css("work-item-title-view", this.props.className)} ${(witIconUrl || !wit) ? "no-color" : ""}`}
            style={(witIconUrl || !wit) ? undefined : {borderColor: witColor}}>

            {witIconUrl && <img src={witIconUrl} />}
            <Link
                className="title-link"
                href={witUrl} 
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    if (this.props.onClick && !e.ctrlKey) {
                        e.preventDefault();
                        this.props.onClick(e);
                    }
                }}>
                {this.props.title}
            </Link>
        </div>;
    }
}