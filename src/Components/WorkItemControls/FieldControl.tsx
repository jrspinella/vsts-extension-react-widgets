import * as React from "react";

import * as WitExtensionContracts  from "TFS/WorkItemTracking/ExtensionContracts";
import { WorkItemFormService } from "TFS/WorkItemTracking/Services";

import {AutoResizableComponent} from "./AutoResizableComponent";
import {IBaseComponentState} from "../Common/BaseComponent"; 

export interface IFieldControlProps {
    fieldName: string;
}

export interface IFieldControlState extends IBaseComponentState {
    error?: string;
    value?: any;
}

export abstract class FieldControl<TP extends IFieldControlProps, TS extends IFieldControlState> extends AutoResizableComponent<TP, TS> {
    public static getInputs<T>() {
        return VSS.getConfiguration().witInputs as T;
    }

    private _flushing: boolean;

    protected initialize() {
         VSS.register(VSS.getContribution().id, {
            onLoaded: (args: WitExtensionContracts.IWorkItemLoadedArgs) => {
                this._invalidate();
            },
            onUnloaded: (args: WitExtensionContracts.IWorkItemChangedArgs) => {
                this._setValue(null);
            },
            onFieldChanged: (args: WitExtensionContracts.IWorkItemFieldChangedArgs) => {
                if (args.changedFields[this.props.fieldName] != null) {
                    this._invalidate();
                }   
            },
        } as WitExtensionContracts.IWorkItemNotificationListener);
    }

    /**
     * Flushes the control's value to the field
     */
    protected async onValueChanged(newValue: any): Promise<void> {
        this._setValue(newValue);

        this._flushing = true;
        let workItemFormService = await WorkItemFormService.getService();
        try {
            await workItemFormService.setFieldValue(this.props.fieldName, newValue);
            this._flushing = false;
        }
        catch (e) {
            this._flushing = false;
            this._onError(`Error in storing the field value: ${e.message}`);
        }
    }    

    protected getErrorMessage(value: string): string {
        return "";
    }

    /**
     * Invalidate the control's value
     */
    private async _invalidate(): Promise<void> {
        if (!this._flushing) {
            let value = await this._getCurrentFieldValue();
            this._setValue(value);
        }

        this.resize();
    }    

    private async _getCurrentFieldValue(): Promise<Object> {
        let workItemFormService = await WorkItemFormService.getService();
        try {
            return await workItemFormService.getFieldValue(this.props.fieldName);
        }
        catch(e) {
            this._onError(`Error in loading the field value: ${e.message}`);
            return null;
        }
    }

    private _setValue(value: any) {
        this.setState({...this.state as any, value: value, error: this.getErrorMessage(value)});
    }    

    private _onError(error: string) {
        this.setState({...this.state as any, error: error});
    }
}