/// <reference types="react" />
import "./VssCombo.scss";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "../Utilities/BaseFluxComponent";
export interface IVssComboProps extends IBaseFluxComponentProps {
    value?: string;
    options?: any;
    onChange: (newValue: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
}
export declare class VssCombo extends BaseFluxComponent<IVssComboProps, IBaseFluxComponentState> {
    private _control;
    refs: {
        [key: string]: (Element);
        container: (HTMLElement);
    };
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IVssComboProps): void;
    private _dispose();
}
