/// <reference types="react" />
import "../../Utilities/PasteImagePlugin";
import "../../Utilities/UploadImagePlugin";
import { BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState } from "./BaseFluxComponent";
import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
export interface IRichEditorProps extends IBaseFluxComponentProps {
    containerId: string;
    data?: string;
    delay?: number;
    onChange?: (newValue: string) => void;
    editorOptions?: any;
}
export declare class RichEditor extends BaseFluxComponent<IRichEditorProps, IBaseFluxComponentState> {
    private _richEditorContainer;
    private _delayedFunction;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IRichEditorProps): void;
    render(): JSX.Element;
    private _onChange();
    private _fireChange();
}
