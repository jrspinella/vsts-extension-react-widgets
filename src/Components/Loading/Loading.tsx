import "./Loading.css";

import * as React from "react";

import { Spinner, SpinnerSize } from "OfficeFabric/Spinner";

export var Loading: React.StatelessComponent<any> = (): JSX.Element => {
    return (
        <div className="content-loading">
            <Spinner className="loading-spinner" size={SpinnerSize.large} />
        </div>
    );
};