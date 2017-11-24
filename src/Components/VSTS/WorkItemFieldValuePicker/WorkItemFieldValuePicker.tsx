import * as React from "react";

import { ClassificationNodeKey } from "../../../Flux/Stores/ClassificationNodeStore";
import { CoreUtils } from "../../../Utilities/Core";
import { GUIDUtils } from "../../../Utilities/Guid";
import { StringUtils } from "../../../Utilities/String";
import { InfoLabel } from "../../InfoLabel";
import { InputError } from "../../InputError";
import { RichEditor } from "../../RichEditor";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { ClassificationPicker } from "../../VSTS/ClassificationPicker";

import { Checkbox } from "OfficeFabric/Checkbox";
import { TextField } from "OfficeFabric/TextField";
import { autobind, css } from "OfficeFabric/Utilities";

import { FieldType, WorkItemField } from "TFS/WorkItemTracking/Contracts";

export interface IFieldValuePickerProps extends IBaseFluxComponentProps {
    value?: any;
    onChange: (value: any) => void;
    field: WorkItemField;
    error?: string;
    label?: string;
    info?: string;
    delay?: number;
}

export interface IFieldValuePickerState extends IBaseFluxComponentState {
    value?: any;
}

export class FieldValuePicker extends BaseFluxComponent<IFieldValuePickerProps, IFieldValuePickerState> {
    private _delayedFunction: CoreUtils.DelayedFunction;

    protected initializeState(): void {
        this.state = {
            value: this.props.value
        };
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this._disposeDelayedFunction();
    }

    public componentWillReceiveProps(nextProps: IFieldValuePickerProps) {
        super.componentWillReceiveProps(nextProps);

        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
        else if (nextProps.field.type !== this.props.field.type) {
            this.setState({
                value: null
            });
        }        
    }

    public render(): JSX.Element {
        const error = this.props.error || this._getDefaultError();

        return (
            <div className={css("work-item-field-value-picker", this.props.className)}>
                { this.props.label && <InfoLabel className="field-value-label" label={this.props.label} info={this.props.info} /> }
                {this._renderPicker()}
                { error && <InputError className="field-value-error" error={error} />}
            </div>
        )
    }

    private _renderPicker(): React.ReactNode {
        const { value } = this.state;        

        switch (this.props.field.type) {
            case FieldType.Boolean:
                const checked = (value == 1 || StringUtils.equals(value as string, "true", true) || value as boolean === true) ? true : false;
                return <Checkbox
                    checked={checked}
                    onChange={this._onBooleanChange}
                />;
            case FieldType.Html:
                return <RichEditor
                    value={value as string}
                    onChange={this._onChange}
                    containerId={GUIDUtils.newGuid()}
                />
            case FieldType.TreePath:
                return <ClassificationPicker
                    type={this.props.field.referenceName === "System.AreaPath" ? ClassificationNodeKey.Area : ClassificationNodeKey.Iteration}
                    onChange={this._onChange} />;
            default:
                return <TextField 
                    value={value}
                    onChanged={this._onChange}
                />;
        }
    }

    @autobind
    private _onBooleanChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) {
        this._onChange(checked);
    }

    @autobind
    private _onChange(value: any) {
        this._disposeDelayedFunction();

        const fireChange = () => {
            this.setState({value: value}, () => {
                this.props.onChange(value);
            });
        }

        if (this.props.delay == null) {
            fireChange();
        }
        else {
            this._delayedFunction = CoreUtils.delay(this, this.props.delay, () => {
                fireChange();
            });
        }      
    }

    private _getDefaultError(): string {
        return "";
    }

    private _disposeDelayedFunction() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
            this._delayedFunction = null;
        }
    }
}