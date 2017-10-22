/// <reference types="react" />
import "./ColorPicker.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
export interface IColorPickerProps extends IBaseComponentProps {
    selectedColor?: string;
    onChange?: (newColor: string) => void;
    label?: string;
}
export interface IColorPickerState extends IBaseComponentState {
    selectedColor?: string;
    isCalloutOpen?: boolean;
}
export declare class ColorPicker extends BaseComponent<IColorPickerProps, IColorPickerState> {
    private _targetElement;
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _renderColorItem(color, index);
    private _selectColor(color);
    private _toggleCallout();
    private _onCalloutDismiss();
}
