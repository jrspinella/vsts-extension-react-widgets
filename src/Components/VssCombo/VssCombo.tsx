import "./VssCombo.scss";

import * as React from "react";

import { InputError } from "../InputError";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { Label } from "OfficeFabric/Label";
import { css } from "OfficeFabric/Utilities";

import * as Controls from "VSS/Controls";
import * as Combos from "VSS/Controls/Combos";

export interface IVssComboProps extends IBaseFluxComponentProps {
    value?: string;
    options?: any;
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
}

export class VssCombo extends BaseFluxComponent<IVssComboProps, IBaseFluxComponentState> {
    private _control: Combos.Combo;

    /**
     * Reference to the combo control DOM
     */
    public refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };

    public render(): JSX.Element {
        return <div className={css("vss-combobox", this.props.className)}>
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

    public componentWillReceiveProps(nextProps: IVssComboProps) {        
        this._control.setInputText(nextProps.value || "");
    }

    private _dispose(): void {
        if (this._control) {
            this._control.dispose();
            this._control = null;
        }
    }
}
