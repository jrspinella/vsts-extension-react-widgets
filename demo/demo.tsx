import * as React from "react";
import * as ReactDOM from "react-dom";

import {Pivot, PivotItem} from "OfficeFabric/Pivot";
import {CommonComponentsDemo} from "./CommonComponentsDemo";
import {QueryResultGridDemo} from "./QueryResultGridDemo";
import {Hub} from "../src/Components/Common/Hub/Hub";

export class Demo extends React.Component<{}, {}> {

    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        };
    }

    public render(): JSX.Element {
        return (
            // <Pivot>
            //     <PivotItem linkText='Common'>
            //         <CommonComponentsDemo />
            //     </PivotItem>
            //     <PivotItem linkText='Work item grid'>
            //         <QueryResultGridDemo />
            //     </PivotItem>
            // </Pivot>
            <Hub 
                title="This is a hub" 
                favoriteStarProps={{
                    isFavorite: false,
                    onChange: f => console.log(f)
                }}
                pivotProps={{
                    initialSelectedKey: "b",
                    onPivotClick: (key: string, ev?: React.MouseEvent<HTMLElement>) => console.log(key),
                    pivots: [
                        {
                            key: "a",
                            text: "Favorites",
                            itemCount: 5,
                            commands: [
                                {
                                    key: "OpenQuery", name: "Open as query", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery1", name: "Open as query 1", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                            ],
                            overflowCommands: [
                                {
                                    key: "OpenQuery2", name: "Open as query 2", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery3", name: "Open as query 3", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                            ],
                            farCommands: [
                                {
                                    key: "resultCount", 
                                    name: "5 results", 
                                    className: "result-count"                                
                                }
                            ]
                        },
                        {
                            key: "b",
                            text: "All",                                    
                            commands: [
                                {
                                    key: "OpenQuery aa", name: "Open as querya  aa", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                                {
                                    key: "OpenQuery1", name: "Open as query bb", title: "Open all workitems as a query", iconProps: {iconName: "OpenInNewWindow"}, 
                                    onClick: async (event?: React.MouseEvent<HTMLElement>) => {
                                        alert("h");
                                    },                                
                                },
                            ],
                        },
                        {
                            key: "c",
                            text: "Editor",
                            itemCount: 100,
                            commands: []
                        }
                    ],
                    onRenderPivotContent: (key: string) => {
                        return <h1>{key}</h1>;
                    }
                }} />
        );
    }
}

export function init() {
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}