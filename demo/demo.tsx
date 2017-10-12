import * as React from "react";
import * as ReactDOM from "react-dom";

import { initializeIcons } from "@uifabric/icons";
import {Fabric} from "OfficeFabric/Fabric";
import {CommonComponentsDemo} from "./CommonComponentsDemo";
import {QueryResultGridDemo} from "./QueryResultGridDemo";
import { Hub, IHub } from "VSSUI/Hub";
import { IHubViewState, HubViewState } from "VSSUI/Utilities/HubViewState";
import { VssIconType } from "VSSUI/VssIcon";
import { IHubBreadcrumbItem, HubHeader } from "VSSUI/HubHeader";

function getHeaderItems(): IHubBreadcrumbItem[] {
    return [{
        key: "vso",
        text: "VSO",
        onClick: () => {
            alert("VSO clicked.");
        }
    },
    {
        key: ".npm",
        text: ".npm",
        onClick: () => {
            alert(".npm clicked.");
        }
    },
    {
        key: "default",
        text: "default",
        onClick: () => {
            alert("default clicked.");
        }
    }] as IHubBreadcrumbItem[];
}

export class Demo extends React.Component<{}, {}> {
    private _hubViewState: IHubViewState;
    private _hub: IHub;

    constructor(props: {}, context?: any) {
        super(props, context);
        this._hubViewState = new HubViewState();

        this.state = {
        };
    }

    public render(): JSX.Element {
        return (   
            <Fabric>         
            <Hub
                componentRef={(hub => { this._hub = hub; })}
                hubViewState={this._hubViewState}
                commands={[
                    { key: "add-file", name: "New file", important: true, iconProps: { iconName: "CalculatorAddition", iconType: VssIconType.fabric }, onClick: () => alert("Aa") }
                ]}>

                <HubHeader
                    title="My Page Title"
                    breadcrumbItems={getHeaderItems()}
                    iconProps={{
                        iconType: VssIconType.fabric,
                        iconName: "Page"
                    }}                    
                    maxBreadcrumbItemWidth="340px"
                />
            </Hub>
            </Fabric>
        );
    }
}

export function init() {
    initializeIcons();
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}