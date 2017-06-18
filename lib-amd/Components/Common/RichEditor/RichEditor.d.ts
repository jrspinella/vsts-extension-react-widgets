/// <reference types="react" />
import * as React from "react";
import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
export interface IRichEditorProps {
    containerId: string;
    placeholder?: string;
    data: string;
    onChange: (newValue: string) => void;
    editorOptions?: any;
}
export declare class RichEditor extends React.Component<IRichEditorProps, {}> {
    private _richEditorContainer;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IRichEditorProps): void;
    render(): JSX.Element;
}
