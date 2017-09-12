/// <reference types="react" />
import "trumbowyg/dist/trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.min.css";
import { IBaseComponentProps, IBaseComponentState, BaseComponent } from "./BaseComponent";
export interface IRichEditorProps extends IBaseComponentProps {
    containerId: string;
    data: string;
    onChange: (newValue: string) => void;
    editorOptions?: any;
}
export declare class RichEditor extends BaseComponent<IRichEditorProps, IBaseComponentState> {
    private _richEditorContainer;
    protected getDefaultClassName(): string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IRichEditorProps): void;
    render(): JSX.Element;
}
