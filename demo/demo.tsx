import "./CommonComponentsDemo.scss";

import * as React from "react";

import { IdentityView } from "../src/Components/IdentityView";
import { InfoLabel } from "../src/Components/InfoLabel";
import { InputError } from "../src/Components/InputError";
import { Loading } from "../src/Components/Loading";


interface ICommonComponentsDemoState {

}

export class CommonComponentsDemo extends React.Component<{}, ICommonComponentsDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        } as ICommonComponentsDemoState;
    }

    public render(): JSX.Element {
        return (
            <div className="flex-container row">                
                <div className="flex-child">
                    <Loading />
                    <InputError error="This is an input error" />
                    <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />
                    <InfoLabel info="Information" label="Info" />
                </div>
            </div>
        );
    }
}