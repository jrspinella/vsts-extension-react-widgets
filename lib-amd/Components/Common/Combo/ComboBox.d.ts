/// <reference types="react" />
import * as Combos from "VSS/Controls/Combos";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../BaseComponent";
export interface IComboBoxProps extends IBaseComponentProps {
    value?: string;
    options?: Combos.IComboOptions;
    onChange: (newValue: string) => void;
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
