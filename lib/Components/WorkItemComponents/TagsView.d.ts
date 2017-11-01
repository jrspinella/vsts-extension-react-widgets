/// <reference types="react" />
import "./TagsView.scss";
import * as React from "react";
import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";
export interface ITagsViewProps extends IBaseFluxComponentProps {
    tags: string[];
}
export declare var TagsView: React.StatelessComponent<ITagsViewProps>;
