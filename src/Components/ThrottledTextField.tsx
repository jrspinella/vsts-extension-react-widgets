import * as React from "react";

import { TextField, ITextFieldProps } from "OfficeFabric/TextField";
import { autobind } from "OfficeFabric/Utilities";

import { CoreUtils } from "../Utils/Core";

export interface IThrottledTextFieldProps extends ITextFieldProps {
    delay?: number;
}

export class ThrottledTextField extends React.Component<IThrottledTextFieldProps, {}> {
    private _delayedFunction: CoreUtils.DelayedFunction;

    public render(): JSX.Element {
        const props = {...this.props, onChanged: this._onChange}
        return <TextField {...props} />;
    }

    public componentWillUnmount() {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }
    }

    @autobind
    private _onChange(newValue: string) {
        if (this._delayedFunction) {
            this._delayedFunction.cancel();
        }

        const fireChange = () => {
            if (this.props.onChanged) {
                this.props.onChanged(newValue);
            }
        }

        if (this.props.delay == null) {
            fireChange();
        }
        else {
            this._delayedFunction = CoreUtils.delay(this, this.props.delay, () => {
                fireChange();
            });
        }
    }
}