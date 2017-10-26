import "./ColorPicker.scss";

import * as React from "react";

import { StringUtils } from "../../Utilities/String";
import {
    BaseComponent, IBaseComponentProps, IBaseComponentState
} from "../Utilities/BaseComponent";
import { AccessibilityColor } from "./Color";

import { DefaultButton } from "OfficeFabric/Button";
import { Callout } from "OfficeFabric/Callout";
import { Label } from "OfficeFabric/Label";
import { autobind } from "OfficeFabric/Utilities";

export interface IColorPickerProps extends IBaseComponentProps {
    selectedColor?: string;
    onChange?: (newColor: string) => void;
    label?: string;
}

export interface IColorPickerState extends IBaseComponentState {
    selectedColor?: string;
    isCalloutOpen?: boolean;
}

export class ColorPicker extends BaseComponent<IColorPickerProps, IColorPickerState> {
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

    protected getDefaultClassName(): string {
        return "color-picker"
    }

    public render(): JSX.Element {
        return <div className={this.getClassName()}>
            {this.props.label && <Label className="color-label">{this.props.label}</Label>}
            <div className="selected-color-container"  ref={(target) => this._targetElement = target }>
                <div className="selected-color" style={{backgroundColor: this.state.selectedColor}} onClick={this._toggleCallout} />
                <DefaultButton className="open-callout-button" iconProps={{iconName: "ChevronDown"}} onClick={this._toggleCallout} />
            </div>
            {this.state.isCalloutOpen && 
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