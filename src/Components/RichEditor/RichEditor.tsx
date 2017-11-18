import "trumbowyg/dist/ui/trumbowyg.min.css";
import "trumbowyg/dist/trumbowyg";
import "./RichEditor.css";

import * as React from "react";

import { CoreUtils } from "../../Utilities/Core";
import "../../Utilities/PasteImagePlugin";
import { StaticObservable } from "../../Utilities/StaticObservable";
import "../../Utilities/UploadImagePlugin";
import { InfoLabel } from "../InfoLabel";
import { InputError } from "../InputError";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { autobind, css } from "OfficeFabric/Utilities";

export interface IRichEditorProps extends IBaseFluxComponentProps {
    containerId: string;
    data?: string;
    delay?: number;
    onChange?: (newValue: string) => void;
    editorOptions?: any;
    getPastedImageUrl?: (data: string) => Promise<string>;
    label?: string;
    info?: string;
    error?: string;
}

export class RichEditor extends BaseFluxComponent<IRichEditorProps, IBaseFluxComponentState> {
    private _richEditorContainer: JQuery;
    private _delayedFunction: CoreUtils.DelayedFunction;

    public componentDidMount() {
        super.componentDidMount();

        StaticObservable.getInstance().unsubscribe(this._onImagePaste, "imagepasted");
        StaticObservable.getInstance().subscribe(this._onImagePaste, "imagepasted");

        this._richEditorContainer = $("#" + this.props.containerId);
        this._richEditorContainer
            .trumbowyg(this.props.editorOptions || {})
            .on("tbwchange", this._onChange)
            .on("tbwblur", this._fireChange);
        
        this._richEditorContainer.trumbowyg("html", this.props.data || "");
    }

    public componentWillUnmount() {
        super.componentWillUnmount();

        StaticObservable.getInstance().unsubscribe(this._onImagePaste, "imagepasted");

        this._richEditorContainer.trumbowyg("destroy");
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
    }

    public componentWillReceiveProps(nextProps: IRichEditorProps) {
        super.componentWillReceiveProps(nextProps);

        if (nextProps.data !== this._richEditorContainer.trumbowyg("html")) {
            this._richEditorContainer.trumbowyg("html", nextProps.data || "");
        }
    }

    public render() {
        return <div className="rich-editor-container">
            { this.props.label && <InfoLabel className="rich-editor-label" label={this.props.label} info={this.props.info} /> }
            <div className="progress-bar" style={{visibility: this.state.loading ? "visible" : "hidden"}} />
            <div id={this.props.containerId} className={css("rich-editor", this.props.className)} />
            { this.props.error && <InputError className="rich-editor-error" error={this.props.error} /> }
        </div>;
    }

    @autobind
    private _onChange() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
       
        if (this.props.delay == null) {
            this._fireChange();
        }
        else {
            this._delayedFunction = CoreUtils.delay(this, this.props.delay, () => {
                this._fireChange();
            });
        }      
    }

    @autobind
    private _fireChange() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
        
        if (this.props.onChange) {
            this.props.onChange(this._richEditorContainer.trumbowyg("html"));
        }
    }

    @autobind
    private async _onImagePaste(args: {data: string, callback: (url: string) => void}) {
        if (!this.props.getPastedImageUrl) {
            return;
        }
        
        this.setState({loading: true});

        try {
            const imageUrl = await this.props.getPastedImageUrl(args.data);   
            args.callback(imageUrl);
            this.setState({loading: false});
        }
        catch (e) {
            args.callback(null);
            this.setState({loading: false});
        }
    }  
}