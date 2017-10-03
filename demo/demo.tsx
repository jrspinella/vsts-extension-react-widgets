import * as React from "react";
import * as ReactDOM from "react-dom";

import { initializeIcons } from "@uifabric/icons";
import {Fabric} from "OfficeFabric/Fabric";
import {CommonComponentsDemo} from "./CommonComponentsDemo";
import {QueryResultGridDemo} from "./QueryResultGridDemo";
import { Hub } from "../src/Components/Hub";

export class Demo extends React.Component<{}, {}> {

    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        };
    }

    public render(): JSX.Element {
        return (   
            <Fabric>         
            <Hub 
                title="This is a hub"
                onTitleRender={ () => <span>Hello</span> }
                favoriteStarProps={{
                    isFavorite: false,
                    onChange: f => console.log(f)
                }}
                pivotProps={{
                    initialSelectedKey: "Common",
                    onPivotClick: (key: string) => console.log(key),
                    pivots: [
                        {
                            key: "Common",
                            text: "Common",
                            itemCount: 5,                            
                            commands: [
                                {
                                    key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery1", name: "Open as query 1", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                            ],
                            overflowCommands: [
                                {
                                    key: "OpenQuery2", name: "Open as query 2", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery3", name: "Open as query 3", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                            ],
                            farCommands: [
                                {
                                    key: "OpenQuery3", name: "Open as query 3", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    }
                                }
                            ]
                        },
                        {
                            key: "Grid",
                            text: "Work item grid",
                            commands: [                                
                                {
                                    key: "OpenQuery aa", name: "Open as querya  aa", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery1", name: "Open as query bb", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async () => {
                                        alert("h");
                                    },                                
                                },
                            ],
                            filterProps: {
                                delay: 200,
                                placeholder: "asas",
                                onChange: v => console.log(v),
                                onSearch: v => console.log(v),
                                onClear: () => console.log("clear")
                            }
                        },
                        {
                            key: "c",
                            text: "Editor",
                            itemCount: 100,
                            commands: []
                        }
                    ],
                    onRenderPivotContent: (key: string) => {
                        if (key === "Grid") {
                            return <QueryResultGridDemo />;
                        }
                        if (key === "Common") {
                            return <CommonComponentsDemo />;
                        }
                        return <h1>abc</h1>;
                    }
                }} />
            </Fabric>
        );
    }
}

export function init() {
    initializeIcons();
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}