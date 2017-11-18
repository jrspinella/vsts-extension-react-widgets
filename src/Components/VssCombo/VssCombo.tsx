import "./VssCombo.css";

import * as React from "react";

import { InfoLabel } from "../InfoLabel";
import { InputError } from "../InputError";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { css } from "OfficeFabric/Utilities";

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
}

export class VssCombo extends BaseFluxComponent<IVssComboProps, IBaseFluxComponentState> {
    private _control: Combo;

    /**
     * Reference to the combo control DOM
     */
    public refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };

    public render(): JSX.Element {
        return <div className={css("vss-combobox", this.props.className)}>
            { this.props.label && <InfoLabel className="vss-combo-label" label={this.props.label} info={this.props.info} /> }
            <div ref="container"></div>
            { this.props.error && <InputError className="vss-combo-error" error={this.props.error} />}
        </div>
    }

    public componentDidMount(): void {
        this._control = Control.create(Combo, $(this.refs.container), {
            type: "list",
            mode: "drop",
            allowEdit: true,
            source: this.props.options,
            change: () => {
                this.props.onChange(this._control.getText());
            }
        });

        this._control.setInputText(this.props.value || "");
        this._control.setEnabled(!this.props.disabled);
    }

    public componentWillUnmount(): void {
        this._dispose();
    }

    public componentWillReceiveProps(nextProps: IVssComboProps) {
        this._control.setInputText(nextProps.value || "");
        this._control.setEnabled(!nextProps.disabled);
        this._control.setSource(nextProps.options);
    }

    private _dispose(): void {
        if (this._control) {
            this._control.dispose();
            this._control = null;
        }
    }
}
