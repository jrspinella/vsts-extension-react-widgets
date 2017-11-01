/// <reference types="react" />
import "./InfoLabel.scss";
import * as React from "react";
import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";
export interface IInfoLabelProps extends IBaseFluxComponentProps {
    label: string;
    info: string;
}
export declare var InfoLabel: React.StatelessComponent<IInfoLabelProps>;
