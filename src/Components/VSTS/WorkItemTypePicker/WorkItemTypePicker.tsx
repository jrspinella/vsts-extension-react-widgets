import * as React from "react";

import { WorkItemTypeActions } from "../../../Flux/Actions/WorkItemTypeActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemTypeStore } from "../../../Flux/Stores/WorkItemTypeStore";
import { BaseFluxComponent, IBaseFluxComponentState } from "../../Utilities/BaseFluxComponent";
import { ISimpleComboProps, SimpleCombo } from "../../VssCombo/SimpleCombo";

import { css } from "OfficeFabric/Utilities";

import { WorkItemType } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemTypePickerState extends IBaseFluxComponentState {
    allWits?: WorkItemType[];
}

export class WorkItemTypePicker extends BaseFluxComponent<ISimpleComboProps<WorkItemType>, IWorkItemTypePickerState> {
    private _workItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemTypeStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._workItemTypeStore.isLoaded()) {
            this.setState({
                allWits: this._workItemTypeStore.getAll()
            });
        }
        else {
            WorkItemTypeActions.initializeWorkItemTypes();
        }        
    }

    protected getStoresState(): IWorkItemTypePickerState {
        return {
            allWits: this._workItemTypeStore.getAll()
        }
    }

    public render(): JSX.Element {
        if (!this.state.allWits) {
            return null;
        }

        const props = {
            ...this.props,
            className: css("work-item-type-picker", this.props.className),
            getItemText: (wit: WorkItemType) => wit.name,
            options: this.state.allWits,
            limitedToAllowedOptions: true
        } as ISimpleComboProps<WorkItemType>;

        return <SimpleCombo {...props} />;
    }
}