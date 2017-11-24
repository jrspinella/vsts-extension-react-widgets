import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Badge, ColorPicker, IdentityView, InfoLabel, InputError, RichEditor, TeamPicker, SimpleCombo,
    WorkItemFieldPicker, WorkItemStateView, WorkItemTagsView, WorkItemTitleView, WorkItemTypePicker,
    ClassificationPicker, ClassificationNodeKey
} from "../lib/debug";

import { FieldType } from "TFS/WorkItemTracking/Contracts";

import { initializeIcons } from "@uifabric/icons";
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { INavLink, Nav } from "office-ui-fabric-react/lib/Nav";
import { autobind } from "office-ui-fabric-react/lib/Utilities";

export interface ICommonComponentsDemoState {
    selectedComponent: string;
    fieldValue?: string;
    teamValue?: string;
    witValue?: string;
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

    private _renderComponent(): React.ReactNode {
        switch (this.state.selectedComponent) {
            case "classificationpicker":
                return <ClassificationPicker
                    label="Area path"
                    type={ClassificationNodeKey.Area}
                    required={true}
                    onChange={(v) => console.log(v)}
                    info="Select a area path" />;
            case "teampicker": 
                return <TeamPicker
                    selectedValue={this.state.teamValue}
                    label="Team"
                    required={true}
                    delay={200}
                    info="Select a team"
                    onChange={(o, v) => this.setState({teamValue: o ? o.name : v})}
                />
            case "witpicker": 
                return <WorkItemTypePicker
                    selectedValue={this.state.witValue}
                    label="Work item type"
                    required={true}
                    delay={200}
                    info="Select a wit"
                    onChange={(o, v) => this.setState({witValue: o ? o.name : v})}
                />
            case "fieldpicker": 
                return <WorkItemFieldPicker
                    selectedValue={this.state.fieldValue}
                    required={true}
                    allowedFieldTypes={[FieldType.Html, FieldType.DateTime]}
                    label="Field"
                    delay={200}
                    info="Select a field"
                    onChange={(o,v) => this.setState({fieldValue: o ? o.name : v})}
                />
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
                return <WorkItemTitleView onClick={() => alert("click")} workItemId={1} title="Active" workItemType="Bug" />;  
            case "colorpicker":
                return <ColorPicker label="color" info="Select a color" onChange={(v) => console.log(v)} />;
            case "stateview":
                return <WorkItemStateView state="Active" workItemType="Bug" />;                
            case "inputerror":
                return <InputError error="This is an input error" />;
            case "identityview":
                return <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />;
            case "infolabel":
                return <InfoLabel info="Information" label="Info" />;
            case "tagsview":
                return <WorkItemTagsView tags={["hello", "foo", "bar"]} />;
            case "combo":
                return <SimpleCombo options={[]} selectedValue="123" onChange={() => console.log("a")} error="this is error" label="Combo" info="abcd" />;
            case "richeditor":
                return <RichEditor 
                    onChange={(v) => console.log(v)} 
                    error="this is error" label="Combo" info="abcd"
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
                name: "FieldPicker",
                key: "fieldpicker",
                url: "",
                forceAnchor: true
            },
            {
                name: "ClassificationPicker",
                key: "classificationpicker",
                url: "",
                forceAnchor: true
            },
            {
                name: "WitPicker",
                key: "witpicker",
                url: "",
                forceAnchor: true
            },
            {
                name: "TeamPicker",
                key: "teampicker",
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