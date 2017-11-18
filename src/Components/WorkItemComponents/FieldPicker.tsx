import * as React from "react";

import { WorkItemFieldActions } from "../../Flux/Actions/WorkItemFieldActions";
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../Flux/Stores/WorkItemFieldStore";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";
import { VssCombo } from "../VssCombo";

import { autobind, css } from "OfficeFabric/Utilities";

export interface IFieldPickerProps extends IBaseFluxComponentProps {
    value?: string;
    onValueChanged?: (field: string) => void;
    disabled?: boolean;
    error?: string;
    label?: string;
    info?: string;
}

export interface IFieldPickerState extends IBaseFluxComponentState {
    fieldsComboOptions?: string[];
    value?: string;
}

export class FieldPicker extends BaseFluxComponent<IFieldPickerProps, IFieldPickerState> {
    private _fieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._fieldStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._fieldStore.isLoaded()) {
            this.setState({
                fieldsComboOptions: this._fieldStore.getAll().map(f => f.name)
            });
        }
        else {
            WorkItemFieldActions.initializeWorkItemFields();
        }        
    }

    public componentWillReceiveProps(nextProps: IFieldPickerProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }        
    }

    protected getStoresState(): IFieldPickerState {
        const allFields = this._fieldStore.getAll();
        return {
            fieldsComboOptions: allFields ? allFields.map(f => f.name) : null
        }
    }

    public render(): JSX.Element {       
        let value: string;
        if (this.state.value && this._fieldStore.getItem(this.state.value)) {
            value = this._fieldStore.getItem(this.state.value).name;
        }
        else {
            value = this.state.value
        }

        const error = this.props.error || this._getDefaultError(value);

        return <VssCombo 
            className={css("work-item-field-picker", this.props.className)}
            value={value} 
            disabled={this.props.disabled}
            label={this.props.label} 
            info={this.props.info}
            error={error}
            options={this.state.fieldsComboOptions || []} 
            onChange={this._onChanged} />
    }

    @autobind
    private _onChanged(fieldName: string) {
        const field = this._fieldStore.getItem(fieldName);        
        this.props.onValueChanged(field ? field.referenceName : fieldName);
    }

    private _getDefaultError(fieldName: string): string {
        return !this._fieldStore.itemExists(fieldName) ? "This field doesn't exist" : ""
    }
}