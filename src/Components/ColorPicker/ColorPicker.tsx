import "./ColorPicker.css";

import * as React from "react";

import { StringUtils } from "../../Utilities/String";
import { InfoLabel } from "../InfoLabel";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";
import { AccessibilityColor } from "./Color";

import { DefaultButton } from "OfficeFabric/Button";
import { Callout } from "OfficeFabric/Callout";
import { autobind, css } from "OfficeFabric/Utilities";

export interface IColorPickerProps extends IBaseFluxComponentProps {
    selectedColor?: string;
    onChange: (newColor: string) => void;
    label?: string;
    info?: string;
}

export interface IColorPickerState extends IBaseFluxComponentState {
    selectedColor?: string;
    isCalloutOpen?: boolean;
}

export class ColorPicker extends BaseFluxComponent<IColorPickerProps, IColorPickerState> {
    private _targetElement: HTMLElement;

    protected initializeState() {
        this.state = {
            selectedColor: this.props.selectedColor || "#FFFFFF",
            isCalloutOpen: false
        };
    }

    public componentWillReceiveProps(nextProps: IColorPickerProps) {
        if (!StringUtils.equals(nextProps.selectedColor, this.state.selectedColor, true)) {
            this.setState({selectedColor: nextProps.selectedColor || "#FFFFFF"});
        }
    }

    public render(): JSX.Element {
        return <div className={css("color-picker", this.props.className)}>
            { this.props.label && <InfoLabel className="color-picker-label" label={this.props.label} info={this.props.info} /> }

            <div className="selected-color-container"  ref={(target) => this._targetElement = target }>
                <div className="selected-color" style={{backgroundColor: this.state.selectedColor}} onClick={this._toggleCallout} />
                <DefaultButton className="open-callout-button" iconProps={{iconName: "ChevronDown"}} onClick={this._toggleCallout} />
            </div>

            { this.state.isCalloutOpen && 
                <Callout 
                    className="colors-callout"
                    isBeakVisible={false}
                    onDismiss={ this._onCalloutDismiss }
                    setInitialFocus={ true }
                    target={this._targetElement}>
                    <ul className="colors-list">
                        {AccessibilityColor.FullPaletteColors.map(this._renderColorItem)}
                    </ul>
                </Callout>
            }
        </div>
    }

    @autobind
    private _renderColorItem(color: AccessibilityColor, index: number) {
        const isSelected = StringUtils.equals(this.state.selectedColor, color.asHex(), true);
        
        return <li 
            key={index} 
            className={isSelected ? "color-list-item selected" : "color-list-item"} 
            onClick={() => this._selectColor(color.asHex())}
            style={{backgroundColor: color.asRgb()}}>
            
            {isSelected && <div className="inner" />}
        </li>;
    }

    private _selectColor(color: string) {
        this.setState({selectedColor: color, isCalloutOpen: false});
        this.props.onChange(color);
    }

    @autobind
    private _toggleCallout() {
        this.setState({isCalloutOpen: !this.state.isCalloutOpen});
    }

    @autobind
    private _onCalloutDismiss() {
        this.setState({isCalloutOpen: false});
    }
}