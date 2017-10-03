/// <reference types="react" />
import "./FilterInput.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
export interface IFilterInputProps extends IBaseComponentProps {
    onChange?: (filterText: string) => void;
    onSearch?: (filterText: string) => void;
    onClear?: () => void;
    placeholder?: string;
}
export interface IFilterInputState extends IBaseComponentState {
    value?: string;
}
export declare class FilterInput extends BaseComponent<IFilterInputProps, IFilterInputState> {
    private _textField;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _onKeyDown(ev);
    private _onChange(newValue);
    private _onClearInputKeyPress(ev);
    private _clearText();
    private _focus();
}
