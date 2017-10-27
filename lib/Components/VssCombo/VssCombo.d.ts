/// <reference types="react" />
import "./VssCombo.scss";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "../Utilities/BaseComponent";
export interface IVssComboProps extends IBaseComponentProps {
    value?: string;
    options?: any;
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
}
export declare class VssCombo extends BaseComponent<IVssComboProps, IBaseComponentState> {
    private _control;
    refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IVssComboProps): void;
    private _dispose();
}
