import * as React from "react";

import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
import { IBaseComponentProps, IBaseComponentState, BaseComponent } from "./BaseComponent";

export interface IRichEditorProps extends IBaseComponentProps {
    containerId: string;
    data: string;
    onChange: (newValue: string) => void;
    editorOptions?: any;
}

export class RichEditor extends BaseComponent<IRichEditorProps, IBaseComponentState> {
    private _richEditorContainer: any;

    protected getDefaultClassName(): string {
        return "rich-editor";
    }

    public componentDidMount() {
        this._richEditorContainer = $("#" + this.props.containerId);
        this._richEditorContainer
            .trumbowyg(this.props.editorOptions || {})
            .on("tbwchange", () => this.props.onChange(this._richEditorContainer.trumbowyg("html")))
            .on("tbwblur", () => this.props.onChange(this._richEditorContainer.trumbowyg("html")));
        
        this._richEditorContainer.trumbowyg("html", this.props.data);
    }

    public componentWillUnmount() {
        this._richEditorContainer.trumbowyg("destroy");
    }

    public componentWillReceiveProps(nextProps: IRichEditorProps) {
        if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
            this._richEditorContainer.trumbowyg("html", nextProps.data);
        }
    }

    public render() {
        return (
            <div id={this.props.containerId} className={this.getClassName()}>
                
            </div>
        );
    }
}