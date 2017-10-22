/// <reference types="react" />
import "./TagsView.scss";
import * as React from "react";
import { IBaseComponentProps } from "../Utilities/BaseComponent";
export interface ITagsViewProps extends IBaseComponentProps {
    tags: string[];
}
export declare var TagsView: React.StatelessComponent<ITagsViewProps>;
