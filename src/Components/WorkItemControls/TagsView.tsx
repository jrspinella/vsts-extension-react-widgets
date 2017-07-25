import "./TagsView.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

export interface ITagsViewProps extends React.HTMLProps<HTMLLabelElement> {
    tags: string[];
}

export var TagsView: React.StatelessComponent<ITagsViewProps> =
    (props: ITagsViewProps): JSX.Element => {
        let tags = props.tags.filter(tag => tag != null && tag.trim() !== "");
        if (tags.length === 0) {
            return null;
        }
        
        return (
            <div className="tags-view">
                {tags.map((tag: string, index: number) => <Label key={index} className="tag">{tag.trim()}</Label>)}
            </div>
        );
}