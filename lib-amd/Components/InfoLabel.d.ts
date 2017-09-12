/// <reference types="react" />
import "./InfoLabel.scss";
import * as React from "react";
import { IBaseComponentProps } from "./BaseComponent";
export interface IInfoLabelProps extends IBaseComponentProps {
    label: string;
    info: string;
}
export declare var InfoLabel: React.StatelessComponent<IInfoLabelProps>;
