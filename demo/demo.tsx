import * as React from "react";
import * as ReactDOM from "react-dom";

import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { INavLink, Nav } from "office-ui-fabric-react/lib/Nav";
import { autobind } from "office-ui-fabric-react/lib/Utilities";

import { initializeIcons } from "@uifabric/icons";
import {
    Badge, ColorPicker, IdentityView, InfoLabel, InputError, RichEditor, StateView, TagsView,
    TitleView, VssCombo
} from "../lib";

export interface ICommonComponentsDemoState {
    selectedComponent: string;
}

const delay = (duration) =>
new Promise(resolve => setTimeout(resolve, duration));

export class Demo extends React.Component<{}, ICommonComponentsDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
            selectedComponent: "combo"
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
                <div style={{flex: 1, borderLeft: "1px solid #ccc", padding: "20px 20px 10px 10px"}}>
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
            case "combo":
                return <VssCombo value="123" onChange={() => console.log("a")} error="this is error" label="Combo" required={true} />;
            case "richeditor":
                return <RichEditor 
                    containerId="rich-editor-demo" 
                    getPastedImageUrl={this._getImageUrl}
                    editorOptions={{
                        svgPath: `../node_modules/trumbowyg/dist/ui/icons.svg`,
                        btns: [
                            ['formatting'],
                            ['bold', 'italic'], 
                            ['link'],
                            ['upload'],
                            ['removeformat'],
                            ['fullscreen']
                        ]
                    }} />;
        }
    }

    @autobind
    private async _getImageUrl() {
        await delay(3000);
        return "https://static.pexels.com/photos/278312/pexels-photo-278312.jpeg";
    }

    private _getNavGroups(): INavLink[] {
        return [
            {
                name: "Combo",
                key: "combo",
                url: "",
                forceAnchor: true
            },
            {
                name: "RichEditor",
                key: "richeditor",
                url: "",
                forceAnchor: true
            },
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
    initializeIcons();
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}