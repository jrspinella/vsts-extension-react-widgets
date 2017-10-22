/// <reference types="react" />
import * as React from "react";
export declare type ModuleComponentSelector<TProps> = (...modules: any[]) => React.ComponentClass<TProps> | React.StatelessComponent<TProps>;
export declare function getAsyncLoadedComponent<TProps = {}>(modules: string[], moduleComponentSelector: ModuleComponentSelector<TProps>, componentWhileLoading?: () => JSX.Element, onLoadStart?: () => void, onLoadEnd?: () => void): (props: TProps) => JSX.Element;
