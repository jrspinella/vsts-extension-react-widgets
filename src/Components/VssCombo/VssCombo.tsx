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
import { Combo } from "VSS/Controls/Combos";

export interface IVssComboProps extends IBaseFluxComponentProps {
    value?: string;
    options?: string[];
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    required?: boolean;
    delay?: number;
}

export interface IVssComboState extends IBaseFluxComponentState {
    value?: string;
}

export class VssCombo extends BaseFluxComponent<IVssComboProps, IVssComboState> {
    private _control: Combo;
    private _delayedFunction: CoreUtils.DelayedFunction;

    /**
     * Reference to the combo control DOM
     */
    public refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    public render(): JSX.Element {
        const error = this.props.error || this._getDefaultError();

        return <div className={css("vss-combobox", this.props.className)}>
            { this.props.label && <InfoLabel className="vss-combo-label" label={this.props.label} info={this.props.info} /> }
            <div ref="container"></div>
            { error && <InputError className="vss-combo-error" error={error} />}
        </div>
    }

    public componentDidMount(): void {
        super.componentDidMount();

        this._control = Control.create(Combo, $(this.refs.container), {
            type: "list",
            mode: "drop",
            allowEdit: true,
            source: this.props.options,
            change: this._onChange
        });

        this._control.setInputText(this.props.value || "");
        this._control.setEnabled(!this.props.disabled);
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this._dispose();
    }

    public componentWillReceiveProps(nextProps: IVssComboProps) {
        super.componentWillReceiveProps(nextProps);

        if (nextProps.value !== this.props.value) {
            this._control.setInputText(nextProps.value || "");
            this.setState({
                value: nextProps.value
            });
        }
        this._control.setEnabled(!nextProps.disabled);
        this._control.setSource(nextProps.options);
    }

    private _dispose(): void {
        if (this._control) {
            this._control.dispose();
            this._control = null;
        }

        this._disposeDelayedFunction();
    }

    private _getDefaultError(): string {
        if (this.props.required && StringUtils.isNullOrEmpty(this.state.value)) {
            return "A value is required";
        }
    }

    @autobind
    private _onChange() {
        this._disposeDelayedFunction();
       
        if (this.props.delay == null) {
            this._fireChange();
        }
        else {
            this._delayedFunction = CoreUtils.delay(this, this.props.delay, () => {
                this._fireChange();
            });
        }      
    }

    @autobind
    private _fireChange() {
        this._disposeDelayedFunction();
        
        const value = this._control.getText();
        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    private _disposeDelayedFunction() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
            this._delayedFunction = null;
        }
    }
}
