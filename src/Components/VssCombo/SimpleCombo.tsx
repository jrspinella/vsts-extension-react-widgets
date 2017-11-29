import "./VssCombo.css";

import * as React from "react";

import { CoreUtils } from "../../Utilities/Core";
import { StringUtils } from "../../Utilities/String";
import { InfoLabel } from "../InfoLabel";
import { InputError } from "../InputError";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { autobind, css } from "OfficeFabric/Utilities";

import { Control } from "VSS/Controls";
import { Combo, IComboOptions } from "VSS/Controls/Combos";

export interface ISimpleComboProps<T> extends IBaseFluxComponentProps {
    selectedOption?: T;
    selectedValue?: string;
    options?: T[];
    getItemText?: (option: T) => string;
    onChange: (option: T, value?: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    required?: boolean;
    delay?: number;
    limitedToAllowedOptions?: boolean;
}

export interface ISimpleComboState<T> extends IBaseFluxComponentState {
    selectedOption?: T;
    selectedValue?: string;
}

export class SimpleCombo<T> extends BaseFluxComponent<ISimpleComboProps<T>, ISimpleComboState<T>> {
    private _control: Combo;
    private _delayedFunction: CoreUtils.DelayedFunction;
    private _nameToOptionMap: IDictionaryStringTo<T>;
    private _container: HTMLDivElement;

    private _containerRefCallback = (container: HTMLDivElement) => { this._container = container; };

    protected initializeState(): void {
        this.state = {
            selectedOption: this.props.selectedOption,
            selectedValue: this.props.selectedValue || ""
        };
    }

    public render(): JSX.Element {
        const error = this.props.error || this._getDefaultError();

        return <div className={css("vss-combobox", "simple-combo", this.props.className)}>
            { this.props.label && <InfoLabel className="vss-combo-label" label={this.props.label} info={this.props.info} /> }
            <div ref={this._containerRefCallback}></div>
            { error && <InputError className="vss-combo-error" error={error} />}
        </div>
    }

    public componentDidMount(): void {
        super.componentDidMount();

        this._buildOptionsMap(this.props.options, this.props.getItemText);
        const comboOptions = {
            type: "list",
            mode: "drop",
            value: this._getTextValue(this.props.selectedOption, this.props.selectedValue, this.props.getItemText),
            allowEdit: true,
            source: this.props.options.map(o => this._getTextValue(o, null, this.props.getItemText)),
            enabled: !this.props.disabled,
            change: this._onChange
        } as IComboOptions;

        this._control = Control.create(Combo, $(this._container), comboOptions);
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this._dispose();
    }

    public componentWillReceiveProps(nextProps: ISimpleComboProps<T>) {
        super.componentWillReceiveProps(nextProps);

        this._disposeDelayedFunction();
        const nextValue = this._getTextValue(nextProps.selectedOption, nextProps.selectedValue, nextProps.getItemText);
        const currentValue = this._getTextValue(this.state.selectedOption, this.state.selectedValue, this.props.getItemText);

        if (nextValue !== currentValue) {
            this._control.setInputText(nextValue);
            this.setState({
                selectedOption: nextProps.selectedOption,
                selectedValue: nextProps.selectedValue
            });
        }

        if (nextProps.disabled !== this.props.disabled) {
            this._control.setEnabled(!nextProps.disabled);
        }        
    }

    private _buildOptionsMap(options: T[], getItemText?: (option: T) => string) {
        this._nameToOptionMap = {};
        for (const option of options) {
            const value = this._getTextValue(option, null, getItemText);
            this._nameToOptionMap[value.toLowerCase()] = option;
        }
    }

    private _dispose(): void {
        if (this._control) {
            this._control.dispose();
            this._control = null;
        }

        this._disposeDelayedFunction();
    }

    private _getTextValue<T>(option: T, value?: string, getItemText?: (option: T) => string): string {
        let v = value;

        if (option) {
            v = getItemText ? getItemText(option) : `${option}`;
        }

        return v || "";
    }

    private _getDefaultError(): string {
        const {
            required,
            limitedToAllowedOptions
        } = this.props;

        const {
            selectedOption,
            selectedValue
        } = this.state;

        if (required && !selectedOption && StringUtils.isNullOrEmpty(selectedValue)) {
            return "A value is required.";
        }
        if (limitedToAllowedOptions && !selectedOption && !this._isSelectedValueValid(selectedValue)) {
            return "This value is not in the list of allowed values.";
        }

        return null;
    }

    private _isSelectedValueValid(value: string): boolean {
        return (this._nameToOptionMap && this._nameToOptionMap[(value || "").toLowerCase()]) ? true : false;
    }

    @autobind
    private _onChange() {
        this._disposeDelayedFunction();
       
        const fireChange = () => {
            let value = this._control.getText();
            const option = (this._nameToOptionMap && this._nameToOptionMap[value.toLowerCase()]) || null;

            if (option) {
                value = null;
            }

            this.setState({
                selectedOption: option, 
                selectedValue: value
            }, () => {
                this.props.onChange(option, value);
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

    private _disposeDelayedFunction() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
            this._delayedFunction = null;
        }
    }
}
