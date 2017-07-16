/// <reference types="react" />
import "./TagsView.scss";
import * as React from "react";
export interface ITagsViewProps extends React.HTMLProps<HTMLLabelElement> {
    tags: string[];
}
export declare var TagsView: React.StatelessComponent<ITagsViewProps>;
