/// <reference types="react" />
import "./ColorPicker.scss";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "../Utilities/BaseFluxComponent";
export interface IColorPickerProps extends IBaseFluxComponentProps {
    selectedColor?: string;
    onChange?: (newColor: string) => void;
    label?: string;
}
export interface IColorPickerState extends IBaseFluxComponentState {
    selectedColor?: string;
    isCalloutOpen?: boolean;
}
export declare class ColorPicker extends BaseFluxComponent<IColorPickerProps, IColorPickerState> {
    private _targetElement;
    protected initializeState(): void;
    componentWillReceiveProps(nextProps: IColorPickerProps): void;
    render(): JSX.Element;
    private _renderColorItem(color, index);
    private _selectColor(color);
    private _toggleCallout();
    private _onCalloutDismiss();
}
