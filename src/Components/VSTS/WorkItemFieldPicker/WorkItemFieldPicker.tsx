import * as React from "react";

import { WorkItemFieldActions } from "../../../Flux/Actions/WorkItemFieldActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../../Flux/Stores/WorkItemFieldStore";
import { ArrayUtils } from "../../../Utilities/Array";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { SimpleCombo } from "../../VssCombo/SimpleCombo";

import { autobind, css } from "OfficeFabric/Utilities";

import { FieldType } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemFieldPickerProps extends IBaseFluxComponentProps {
    value?: string;
    onChange: (fieldRefName: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    delay?: number;
    required?: boolean;
    allowedFieldTypes?: FieldType[];
}

export interface IWorkItemFieldPickerState extends IBaseFluxComponentState {
    fieldsComboOptions?: string[];
    value?: string;
}

export class WorkItemFieldPicker extends BaseFluxComponent<IWorkItemFieldPickerProps, IWorkItemFieldPickerState> {
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
                fieldsComboOptions: this._getComboOptions(this.props.allowedFieldTypes)
            });
        }
        else {
            WorkItemFieldActions.initializeWorkItemFields();
        }        
    }

    public componentWillReceiveProps(nextProps: IWorkItemFieldPickerProps) {
        super.componentWillReceiveProps(nextProps);
        let newState = null;

        if (nextProps.value !== this.props.value) {
            newState = {
                value: nextProps.value
            }
        }
        if (!ArrayUtils.arrayEquals(nextProps.allowedFieldTypes, this.props.allowedFieldTypes)) {
            newState = {...newState, fieldsComboOptions: this._getComboOptions(nextProps.allowedFieldTypes)};
        }

        if (newState) {
            this.setState(newState);
        }        
    }

    protected getStoresState(): IWorkItemFieldPickerState {
        return {
            fieldsComboOptions: this._getComboOptions(this.props.allowedFieldTypes)
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

        const allFieldsLoaded = this.state.fieldsComboOptions != null;
        const error = this.props.error || this._getDefaultError(value);

        return <SimpleCombo 
            className={css("work-item-field-picker", this.props.className)}
            value={!allFieldsLoaded ? "" : value} 
            disabled={!allFieldsLoaded ? true : this.props.disabled}
            delay={this.props.delay}
            required={!allFieldsLoaded ? false : this.props.required}
            label={this.props.label} 
            info={this.props.info}
            error={!allFieldsLoaded ? "" : error}
            options={this.state.fieldsComboOptions || []} 
            onChange={this._onChange} />;
    }

    @autobind
    private _onChange(fieldName: string) {
        const field = this._fieldStore.getItem(fieldName);
        const value = field ? field.referenceName : fieldName;

        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    private _getDefaultError(fieldName: string): string {
        if (StringUtils.isNullOrEmpty(fieldName)) {
            return this.props.required ? "Field name is required." : null;
        }
        
        if (!this._fieldStore.itemExists(fieldName)) {
            return "This field doesn't exist.";
        }

        const field = this._fieldStore.getItem(fieldName);
        if (this.props.allowedFieldTypes && this.props.allowedFieldTypes.indexOf(field.type) === -1) {
            return "The selected field is not of supported type.";
        }

        return null;
    }

    private _getComboOptions(allowedFieldTypes: FieldType[]): string[] {
        const allFields = this._fieldStore.getAll();
        if (allFields) {
            if (allowedFieldTypes) {
                return allFields.filter(f => allowedFieldTypes.indexOf(f.type) !== -1).map(f => f.name);
            }
            else {
                return allFields.map(f => f.name);
            }            
        }
        
        return null;
    }
}