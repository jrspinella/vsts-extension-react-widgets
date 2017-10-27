import "./ComboBox.scss";

import * as React from "react";

import { InputError } from "../InputError";
import {
    BaseComponent, IBaseComponentProps, IBaseComponentState
} from "../Utilities/BaseComponent";

import { Label } from "OfficeFabric/Label";

import * as Controls from "VSS/Controls";
import * as Combos from "VSS/Controls/Combos";

export interface IComboBoxProps extends IBaseComponentProps {
    value?: string;
    options?: any;
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
}

export class ComboBox extends BaseComponent<IComboBoxProps, IBaseComponentState> {
    private _control: Combos.Combo;

    /**
     * Reference to the combo control DOM
     */
    public refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };

    protected getDefaultClassName(): string {
        return "vss-combobox";
    }

    public render(): JSX.Element {
        return <div className={this.getClassName()}>
            {this.props.label && <Label className="combo-label" required={this.props.required}>{this.props.label}</Label>}
            <div ref="container"></div>
            { this.props.error && <InputError error={this.props.error} />}
        </div>
    }

    public componentDidMount(): void {
        this._control = Controls.Control.create(Combos.Combo, $(this.refs.container), {...this.props.options || {}, change: () => {
            this.props.onChange(this._control.getText());
        }});

        this._control.setInputText(this.props.value || "");
    }

    public componentWillUnmount(): void {
        this._dispose();
    }

    public componentWillReceiveProps(nextProps: IComboBoxProps) {        
        this._control.setInputText(nextProps.value || "");
    }

    private _dispose(): void {
        if (this._control) {
            this._control.dispose();
            this._control = null;
        }
    }
}
