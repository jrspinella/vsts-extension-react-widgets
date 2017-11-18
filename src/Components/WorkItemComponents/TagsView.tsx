import "./TagsView.css";

import * as React from "react";

import { IBaseFluxComponentProps } from "../Utilities/BaseFluxComponent";

import { Label } from "OfficeFabric/Label";
import { css } from "OfficeFabric/Utilities";

export interface ITagsViewProps extends IBaseFluxComponentProps {
    tags: string[];
}

export var TagsView: React.StatelessComponent<ITagsViewProps> =
    (props: ITagsViewProps): JSX.Element => {
        let tags = props.tags.filter(tag => tag != null && tag.trim() !== "");
        if (tags.length === 0) {
            return null;
        }
        
        return <div className={css("tags-view", props.className)}>
            {tags.map((tag: string, index: number) => <Label key={index} className="tag">{tag.trim()}</Label>)}
        </div>;
}