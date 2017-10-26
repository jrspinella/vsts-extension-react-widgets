/// <reference types="react" />
import "./ComboBox.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
export interface IComboBoxProps extends IBaseComponentProps {
    value?: string;
    options?: any;
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
}
export declare class ComboBox extends BaseComponent<IComboBoxProps, IBaseComponentState> {
    private _control;
    refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IComboBoxProps): void;
    private _dispose();
}
