import * as React from "react";
import * as ReactDOM from "react-dom";

import { Badge, ColorPicker, IdentityView, InfoLabel, InputError } from "../src/Components";
import { StateView, TagsView, TitleView } from "../src/Components/WorkItemComponents";

import { DirectionalHint } from "OfficeFabric/Callout";
import { Fabric } from "OfficeFabric/Fabric";
import { INavLink, Nav } from "OfficeFabric/Nav";

interface ICommonComponentsDemoState {
    selectedComponent: string;
}

export class Demo extends React.Component<{}, ICommonComponentsDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
            selectedComponent: "badge"
        } as ICommonComponentsDemoState;
    }

    public render(): JSX.Element {
        return (
            <Fabric style={{display: "flex"}}>    
                <Nav                     
                    groups={[
                        {
                            links: this._getNavGroups()
                        }
                    ]}
                    onLinkClick={(_ev, navLink: INavLink) => {
                        this.setState({selectedComponent: navLink.key});
                    }}
                    initialSelectedKey={this._getNavGroups()[0].key}
                    selectedKey={this.state.selectedComponent}
                />  
                <div style={{borderLeft: "1px solid #ccc", padding: "20px 20px 10px 10px"}}>
                    {this._renderComponent()}
                </div>
            </Fabric>
        );
    }

    private _renderComponent(): JSX.Element {
        switch (this.state.selectedComponent) {
            case "badge":
                return <div>
                    <Badge notificationCount={4}>
                        <div>
                            on click
                        </div>
                    </Badge>
                    <Badge notificationCount={4} showCalloutOnHover={true} directionalHint={DirectionalHint.bottomLeftEdge}>
                        <div>
                            on hover
                        </div>
                    </Badge>
                </div>;
            case "titleview":
                return <TitleView onClick={() => alert("click")} workItemId={1} title="Active" workItemType="Bug" />;  
            case "colorpicker":
                return <ColorPicker label="color" />;
            case "stateview":
                return <StateView state="Active" workItemType="Bug" />;                
            case "inputerror":
                return <InputError error="This is an input error" />;
            case "identityview":
                return <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />;
            case "infolabel":
                return <InfoLabel info="Information" label="Info" />;
            case "tagsview":
                return <TagsView tags={["hello", "foo", "bar"]} />;
        }
    }

    private _getNavGroups(): INavLink[] {
        return [
            {
                name: "Badge",
                key: "badge",
                url: "",
                forceAnchor: true
            },
            {
                name: "TitleView",
                key: "titleview",
                url: "",
                forceAnchor: true
            },
            {
                name: "StateView",
                key: "stateview",
                url: "",
                forceAnchor: true
            },
            {
                name: "TagsView",
                key: "tagsview",
                url: "",
                forceAnchor: true
            },
            {
                name: "InputError",
                key: "inputerror",
                url: "",
                forceAnchor: true
            },
            {
                name: "IdentityView",
                key: "identityview",
                url: "",
                forceAnchor: true
            },
            {
                name: "InfoLabel",
                key: "infolabel",
                url: "",
                forceAnchor: true
            },
            {
                name: "ColorPicker",
                key: "colorpicker",
                url: "",
                forceAnchor: true
            }
        ];
    }
}

export function init() {
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}