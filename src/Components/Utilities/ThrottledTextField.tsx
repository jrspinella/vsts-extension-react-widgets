import * as React from "react";

import { CoreUtils } from "../../Utilities/Core";
import { StringUtils } from "../../Utilities/String";
import { InfoLabel } from "../InfoLabel";
import { InputError } from "../InputError";
import { BaseFluxComponent, IBaseFluxComponentState } from "./BaseFluxComponent";

import { ITextFieldProps, TextField } from "OfficeFabric/TextField";
import { autobind, css } from "OfficeFabric/Utilities";

export interface IThrottledTextFieldProps extends ITextFieldProps {
    delay?: number;
    info?: string;
    required?: boolean;
}

export interface IThrottledTextFieldState extends IBaseFluxComponentState {
    value?: string;
}

export class ThrottledTextField extends BaseFluxComponent<IThrottledTextFieldProps, IThrottledTextFieldState> {
    private _delayedFunction: CoreUtils.DelayedFunction;

    protected initializeState(): void {
        this.state = {
            value: this.props.value
        };
    }

    public render(): JSX.Element {
        const props = {...this.props, onChanged: this._onChange, className: "throttled-text-field-text"};
        delete props["delay"];
        delete props["info"];
        delete props["required"];
        delete props["errorMessage"];
        delete props["label"];

        const error = this.props.errorMessage || this._getDefaultError();

        return <div className={css("throttled-text-field", this.props.className)}>
            { this.props.label && <InfoLabel className="throttled-text-field-label" label={this.props.label} info={this.props.info} /> }
            <TextField {...props} />
            { error && <InputError className="throttled-text-field-error" error={error} />}
        </div>
    }

    public componentWillUnmount() {
        super.componentWillUnmount();
        this._disposeDelayedFunction();
    }

    public componentWillReceiveProps(nextProps: IThrottledTextFieldProps) {
        super.componentWillReceiveProps(nextProps);
        this._disposeDelayedFunction();
        
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    @autobind
    private _onChange(value: string) {
        this._disposeDelayedFunction();
       
        const fireChange = () => {
            this.setState({
                value: value
            }, () => {
                if (this.props.onChanged) {
                    this.props.onChanged(value);
                }
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

    private _getDefaultError(): string {
        if (this.props.required && StringUtils.isNullOrEmpty(this.state.value)) {
            return "A value is required";
        }
    }
}