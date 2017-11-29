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
import { TreeNode } from "VSS/Controls/TreeView";

export interface ITreeComboProps extends IBaseFluxComponentProps {
    value?: string;
    options?: TreeNode[];
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    required?: boolean;
    delay?: number;
}

export interface ITreeComboState extends IBaseFluxComponentState {
    value?: string;
}

export class TreeCombo extends BaseFluxComponent<ITreeComboProps, ITreeComboState> {
    private _control: Combo;
    private _delayedFunction: CoreUtils.DelayedFunction;
    private _container: HTMLDivElement;

    private _containerRefCallback = (container: HTMLDivElement) => { this._container = container; };

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    public render(): JSX.Element {
        const error = this.props.error || this._getDefaultError();

        return <div className={css("vss-combobox", "tree-combo", this.props.className)}>
            { this.props.label && <InfoLabel className="vss-combo-label" label={this.props.label} info={this.props.info} /> }
            <div ref={this._containerRefCallback}></div>
            { error && <InputError className="vss-combo-error" error={error} />}
        </div>
    }

    public componentDidMount(): void {
        super.componentDidMount();

        let comboOptions = {
            type: "treeSearch",
            mode: "drop",
            allowEdit: true,
            value: this.props.value || "",
            source: this.props.options,
            enabled: !this.props.disabled,
            change: this._onChange,
            initialLevel: 2, 
            sepChar: "\\"
        } as IComboOptions;

        this._control = Control.create(Combo, $(this._container), comboOptions);
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this._dispose();
    }

    public componentWillReceiveProps(nextProps: ITreeComboProps) {
        super.componentWillReceiveProps(nextProps);
        this._disposeDelayedFunction();
        
        if (nextProps.value !== this.state.value) {
            this._control.setInputText(nextProps.value || "");
            this.setState({
                value: nextProps.value
            });
        }

        if (nextProps.disabled !== this.props.disabled) {
            this._control.setEnabled(!nextProps.disabled);
        }
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

        const fireChange = () => {
            const value = this._control.getText();
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

    private _disposeDelayedFunction() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
            this._delayedFunction = null;
        }
    }
}
