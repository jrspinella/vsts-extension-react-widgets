/// <reference types="react" />
import "../../Utilities/PasteImagePlugin";
import "../../Utilities/UploadImagePlugin";
import { BaseComponent, IBaseComponentProps, IBaseComponentState } from "./BaseComponent";
import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
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
