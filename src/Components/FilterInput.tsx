import "./FilterInput.scss";

import * as React from "react";

import { ITextField } from "OfficeFabric/TextField";
import { Icon, IIconProps } from "OfficeFabric/Icon";
import { autobind, KeyCodes } from "OfficeFabric/Utilities";

import { ThrottledTextField } from "./ThrottledTextField";

import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";

export interface IFilterInputProps extends IBaseComponentProps {
    onChange?: (filterText: string) => void;
    onSearch?: (filterText: string) => void;
    onClear?: () => void;
    placeholder?: string;
    delay?: number;
}

export interface IFilterInputState extends IBaseComponentState {
    value?: string;
}

export class FilterInput extends BaseComponent<IFilterInputProps, IFilterInputState> {
    private _textField: ITextField;
    
    protected getDefaultClassName(): string {
        return "filter-input";
    }
        
    public render(): JSX.Element {
        let iconProps: IIconProps = this.state.value ? { 
            iconName: "Clear",
            className: "clear-filter-input",
            tabIndex: 0,
            onClick: this._clearText,
            onKeyPress: this._onClearInputKeyPress,
            role: "button"
        } : undefined;

        return <ThrottledTextField
            componentRef={element => this._textField = element}
            delay={this.props.delay}
            onRenderAddon={() => <Icon iconName="Filter" />}
            className={this.getClassName()}
            iconProps={iconProps}
            value={this.state.value}
            onChanged={this._onChange}
            onKeyDown={this._onKeyDown}
            placeholder={this.props.placeholder} />;
    }

    @autobind
    private _onKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.which === KeyCodes.enter) {
            if (this.props.onSearch) {
                this.props.onSearch(this.state.value);
            }
        }
        else if (ev.which === KeyCodes.escape) {
            this._clearText();
        }
    }

    @autobind
    private _onChange(newValue: string) {
        this.setState({value: newValue});
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    @autobind
    private _onClearInputKeyPress(ev: React.KeyboardEvent<HTMLElement>) {
        if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
            this._clearText();
        }
    }

    @autobind
    private _clearText() {
        this.setState({value: ""});
        if (this.props.onClear) {
            this.props.onClear();
        }
        this._focus();
    }

    private _focus(): void {
        return this._textField.focus();
    }
}