/// <reference types="react" />
import * as React from "react";
import { BaseStore } from "../../Flux/Stores/BaseStore";
export interface IBaseComponentProps {
    className?: string;
}
export interface IBaseComponentState {
    loading?: boolean;
}
export declare class BaseComponent<TProps extends IBaseComponentProps, TState extends IBaseComponentState> extends React.Component<TProps, TState> {
    constructor(props: TProps, context?: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getStores(): BaseStore<any, any, any>[];
    protected getStoresState(): TState;
    protected getDefaultClassName(): string;
    protected getClassName(): string;
    protected initializeState(): void;
    private _onStoreChanged();
}
