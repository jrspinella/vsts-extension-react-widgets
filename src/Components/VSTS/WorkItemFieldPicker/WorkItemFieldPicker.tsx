import * as React from "react";

import { WorkItemFieldActions } from "../../../Flux/Actions/WorkItemFieldActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../../Flux/Stores/WorkItemFieldStore";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { VssCombo } from "../../VssCombo";

import { autobind, css } from "OfficeFabric/Utilities";

export interface IWorkItemFieldPickerProps extends IBaseFluxComponentProps {
    value?: string;
    onChange?: (field: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    delay?: number;
    required?: boolean;
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
                fieldsComboOptions: this._fieldStore.getAll().map(f => f.name)
            });
        }
        else {
            WorkItemFieldActions.initializeWorkItemFields();
        }        
    }

    public componentWillReceiveProps(nextProps: IWorkItemFieldPickerProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }        
    }

    protected getStoresState(): IWorkItemFieldPickerState {
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
            delay={this.props.delay}
            required={this.props.required}
            label={this.props.label} 
            info={this.props.info}
            error={error}
            options={this.state.fieldsComboOptions || []} 
            onChange={this._onChange} />
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
        if (this.props.required && StringUtils.isNullOrEmpty(fieldName)) {
            return "Field name is required";
        }

        return !this._fieldStore.itemExists(fieldName) ? "This field doesn't exist" : null;
    }
}