import "trumbowyg/dist/ui/trumbowyg.min.css";
import "./RichEditor.css";

import * as React from "react";
import "trumbowyg/dist/trumbowyg";

import { CoreUtils } from "../../Utilities/Core";
import "../../Utilities/PasteImagePlugin";
import { StaticObservable } from "../../Utilities/StaticObservable";
import { StringUtils } from "../../Utilities/String";
import "../../Utilities/UploadImagePlugin";
import { InfoLabel } from "../InfoLabel";
import { InputError } from "../InputError";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../Utilities/BaseFluxComponent";

import { autobind, css } from "OfficeFabric/Utilities";

export interface IRichEditorProps extends IBaseFluxComponentProps {
    containerId: string;
    value?: string;
    delay?: number;
    onChange: (newValue: string) => void;
    editorOptions?: any;
    getPastedImageUrl?: (value: string) => Promise<string>;
    label?: string;
    info?: string;
    error?: string;
    required?: boolean;
}

export interface IRichEditorState extends IBaseFluxComponentState {
    value?: string;
}

export class RichEditor extends BaseFluxComponent<IRichEditorProps, IRichEditorState> {
    private _richEditorContainer: JQuery;
    private _delayedFunction: CoreUtils.DelayedFunction;

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    public componentDidMount() {
        super.componentDidMount();

        StaticObservable.getInstance().unsubscribe(this._onImagePaste, "imagepasted");
        StaticObservable.getInstance().subscribe(this._onImagePaste, "imagepasted");

        this._richEditorContainer = $("#" + this.props.containerId);
        this._richEditorContainer
            .trumbowyg(this.props.editorOptions || {})
            .on("tbwchange", this._onChange)
            .on("tbwblur", this._fireChange);
        
        this._richEditorContainer.trumbowyg("html", this.props.value || "");
    }

    public componentWillUnmount() {
        super.componentWillUnmount();

        StaticObservable.getInstance().unsubscribe(this._onImagePaste, "imagepasted");

        this._richEditorContainer.trumbowyg("destroy");
        this._disposeDelayedFunction();
    }

    public componentWillReceiveProps(nextProps: IRichEditorProps) {
        super.componentWillReceiveProps(nextProps);

        if (nextProps.value !== this.props.value) {
            this._richEditorContainer.trumbowyg("html", nextProps.value || "");
            this.setState({
                value: nextProps.value
            });
        }
    }

    public render() {
        const error = this.props.error || this._getDefaultError();

        return <div className="rich-editor-container">
            { this.props.label && <InfoLabel className="rich-editor-label" label={this.props.label} info={this.props.info} /> }
            <div className="progress-bar" style={{visibility: this.state.loading ? "visible" : "hidden"}} />
            <div id={this.props.containerId} className={css("rich-editor", this.props.className)} />
            { error && <InputError className="rich-editor-error" error={error} /> }
        </div>;
    }

    private _getDefaultError(): string {
        if (this.props.required && StringUtils.isNullOrEmpty(this.state.value)) {
            return "A value is required";
        }
    }

    @autobind
    private _onChange() {
        this._disposeDelayedFunction();
       
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
        this._disposeDelayedFunction();
        
        const value = this._richEditorContainer.trumbowyg("html");
        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    @autobind
    private async _onImagePaste(args: {imageData: string, callback: (url: string) => void}) {
        if (!this.props.getPastedImageUrl) {
            return;
        }
        
        this.setState({loading: true});

        try {
            const imageUrl = await this.props.getPastedImageUrl(args.imageData);   
            args.callback(imageUrl);
            this.setState({loading: false});
        }
        catch (e) {
            args.callback(null);
            this.setState({loading: false});
        }
    }

    private _disposeDelayedFunction() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
            this._delayedFunction = null;
        }
    }
}