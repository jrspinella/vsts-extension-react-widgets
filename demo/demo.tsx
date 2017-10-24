import * as React from "react";
import * as ReactDOM from "react-dom";

import { IdentityView } from "../src/Components/IdentityView";
import { InfoLabel } from "../src/Components/InfoLabel";
import { InputError } from "../src/Components/InputError";
import { StateView } from "../src/Components/WorkItemComponents";

interface ICommonComponentsDemoState {

}

export class Demo extends React.Component<{}, ICommonComponentsDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        } as ICommonComponentsDemoState;
    }

    public render(): JSX.Element {
        return (
            <div className="flex-container row">                
                <div className="flex-child">
                    <StateView state="Active" workItemType="Bug" />
                    <InputError error="This is an input error" />
                    <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />
                    <InfoLabel info="Information" label="Info" />
                </div>
            </div>
        );
    }
}

export function init() {
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}