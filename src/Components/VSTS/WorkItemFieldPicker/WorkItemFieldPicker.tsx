import * as React from "react";

import { WorkItemFieldActions } from "../../../Flux/Actions/WorkItemFieldActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { WorkItemFieldStore } from "../../../Flux/Stores/WorkItemFieldStore";
import { ArrayUtils } from "../../../Utilities/Array";
import { BaseFluxComponent, IBaseFluxComponentState } from "../../Utilities/BaseFluxComponent";
import { ISimpleComboProps, SimpleCombo } from "../../VssCombo/SimpleCombo";

import { css } from "OfficeFabric/Utilities";

import { FieldType, WorkItemField } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemFieldPickerProps extends ISimpleComboProps<WorkItemField> {    
    allowedFieldTypes?: FieldType[];
}

export interface IWorkItemFieldPickerState extends IBaseFluxComponentState {
    allowedFields?: WorkItemField[];
}

export class WorkItemFieldPicker extends BaseFluxComponent<IWorkItemFieldPickerProps, IWorkItemFieldPickerState> {
    private _fieldStore = StoreFactory.getInstance<WorkItemFieldStore>(WorkItemFieldStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._fieldStore];
    }

    public componentDidMount() {
        super.componentDidMount();

        if (this._fieldStore.isLoaded()) {
            this.setState({
                allowedFields: this._getComboOptions(this.props.allowedFieldTypes)
            });
        }
        else {
            WorkItemFieldActions.initializeWorkItemFields();
        }        
    }

    public componentWillReceiveProps(nextProps: IWorkItemFieldPickerProps) {
        super.componentWillReceiveProps(nextProps);
    
        if (!ArrayUtils.arrayEquals(nextProps.allowedFieldTypes, this.props.allowedFieldTypes)) {
            this.setState({allowedFields: this._getComboOptions(nextProps.allowedFieldTypes)});
        }   
    }

    protected getStoresState(): IWorkItemFieldPickerState {
        return {
            allowedFields: this._getComboOptions(this.props.allowedFieldTypes)
        }
    }

    public render(): JSX.Element {
        if (!this.state.allowedFields) {
            return null;
        }

        const props = {
            ...this.props,
            className: css("work-item-field-picker", this.props.className),
            getItemText: (field: WorkItemField) => field.name,            
            options: this.state.allowedFields,
            limitedToAllowedOptions: true
        } as ISimpleComboProps<WorkItemField>;

        return <SimpleCombo {...props} />;
    }

    private _getComboOptions(allowedFieldTypes: FieldType[]): WorkItemField[] {
        const allFields = this._fieldStore.getAll();
        if (allFields && allowedFieldTypes) {
            return allFields.filter(f => allowedFieldTypes.indexOf(f.type) !== -1);          
        }
        
        return allFields;
    }
}