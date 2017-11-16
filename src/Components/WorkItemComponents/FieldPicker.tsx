//import "./FieldPicker.css";

import * as React from "react";

import { WorkItemFieldActions } from "../../Flux/Actions/WorkItemFieldActions";
import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../Flux/Stores/WorkItemFieldStore";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { IComboBoxOption, IComboBoxProps, VirtualizedComboBox } from "OfficeFabric/ComboBox";
import { autobind, css } from "OfficeFabric/Utilities";

export interface IFieldPickerProps extends IBaseFluxComponentProps {
    value?: string;
    onValueChanged?: (fieldRefName: string) => void;
    disabled?: boolean;
}

export interface IFieldPickerState extends IBaseFluxComponentState {
    allFields?: IComboBoxOption[];
}

export class FieldPicker extends BaseFluxComponent<IFieldPickerProps, IFieldPickerState> {
    private _fieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    protected initializeState(): void {
        this.state = {};
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._fieldStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._fieldStore.isLoaded()) {
            this.setState({
                allFields: this._fieldStore.getAll().map(f => ({
                    key: f.referenceName,
                    text: f.name
                }))
            });
        }
        else {
            WorkItemFieldActions.initializeWorkItemFields();
        }        
    }

    protected getStoresState(): IFieldPickerState {
        const allFields = this._fieldStore.getAll();
        return {
            allFields: allFields ? allFields.map(f => ({
                key: f.referenceName,
                text: f.name
            })) : null
        }
    }

    public render(): JSX.Element {
        const fields = this.state.allFields || [];
        const comboProps: IComboBoxProps = {
            className: "field-combo",
            allowFreeform: true,
            autoComplete: "on",
            disabled: this.props.disabled,
            options: fields,
            onChanged: this._onChanged
        } as IComboBoxProps;
        
        if (this.props.value && this._fieldStore.getItem(this.props.value)) {
            comboProps.selectedKey = this._fieldStore.getItem(this.props.value).referenceName;
        }
        else {
            comboProps.value = this.props.value;
        }

        return (
            <div className={css("work-item-field-picker", this.props.className)}>
                <VirtualizedComboBox {...comboProps} />
            </div>
        )
    }

    @autobind
    private _onChanged(option?: IComboBoxOption, _index?: number, value?: string) {
        this.props.onValueChanged(option ? option.key as string : (value || ""));
    }
}