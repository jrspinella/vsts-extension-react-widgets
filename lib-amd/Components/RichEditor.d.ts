/// <reference types="react" />
import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
import { IBaseComponentProps, IBaseComponentState, BaseComponent } from "./BaseComponent";
import "../Utils/PasteImagePlugin";
import "../Utils/UploadImagePlugin";
export interface IRichEditorProps extends IBaseComponentProps {
    containerId: string;
    data?: string;
    delay?: number;
    onChange?: (newValue: string) => void;
    editorOptions?: any;
}
export declare class RichEditor extends BaseComponent<IRichEditorProps, IBaseComponentState> {
    private _richEditorContainer;
    private _delayedFunction;
    protected getDefaultClassName(): string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IRichEditorProps): void;
    render(): JSX.Element;
    private _onChange();
    private _fireChange();
}
