import * as React from "react";

import { WorkItemTypeActions } from "../../../Flux/Actions/WorkItemTypeActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemTypeStore } from "../../../Flux/Stores/WorkItemTypeStore";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { VssCombo } from "../../VssCombo";

import { autobind, css } from "OfficeFabric/Utilities";

export interface IWorkItemTypePickerProps extends IBaseFluxComponentProps {
    value?: string;
    onChange: (witName: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    delay?: number;
    required?: boolean;
}

export interface IWorkItemTypePickerState extends IBaseFluxComponentState {
    witComboOptions?: string[];
    value?: string;
}

export class WorkItemTypePicker extends BaseFluxComponent<IWorkItemTypePickerProps, IWorkItemTypePickerState> {
    private _workItemTypeStore = StoreFactory.getInstance<WorkItemTypeStore>(WorkItemTypeStore);

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._workItemTypeStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._workItemTypeStore.isLoaded()) {
            this.setState({
                witComboOptions: this._workItemTypeStore.getAll().map(wit => wit.name)
            });
        }
        else {
            WorkItemTypeActions.initializeWorkItemTypes();
        }        
    }

    public componentWillReceiveProps(nextProps: IWorkItemTypePickerProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }        
    }

    protected getStoresState(): IWorkItemTypePickerState {
        const allWits = this._workItemTypeStore.getAll();
        return {
            witComboOptions: allWits ? allWits.map(wit => wit.name) : null
        }
    }

    public render(): JSX.Element {       
        let value: string;
        if (this.state.value && this._workItemTypeStore.getItem(this.state.value)) {
            value = this._workItemTypeStore.getItem(this.state.value).name;
        }
        else {
            value = this.state.value
        }

        const allWitsLoaded = this.state.witComboOptions != null;
        const error = this.props.error || this._getDefaultError(value);

        return <VssCombo 
            className={css("work-item-type-picker", this.props.className)}
            value={!allWitsLoaded ? "" : value} 
            disabled={!allWitsLoaded ? true : this.props.disabled}
            delay={this.props.delay}
            required={!allWitsLoaded ? false : this.props.required}
            label={this.props.label} 
            info={this.props.info}
            error={!allWitsLoaded ? "" : error}
            options={this.state.witComboOptions || []} 
            onChange={this._onChange} />;
    }

    @autobind
    private _onChange(witName: string) {
        const wit = this._workItemTypeStore.getItem(witName);
        const value = wit ? wit.name : witName;

        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    private _getDefaultError(witName: string): string {
        if (StringUtils.isNullOrEmpty(witName)) {
            return this.props.required ? "Work item type is required." : null;
        }

        return !this._workItemTypeStore.itemExists(witName) ? "This work item type doesn't exist" : null;
    }
}