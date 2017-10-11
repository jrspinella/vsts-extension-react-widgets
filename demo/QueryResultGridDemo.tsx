import * as React from "react";

import {QueryResultGrid} from "../src/Components/QueryResultGrid";

interface IQueryResultGridDemoState {

}

export class QueryResultGridDemo extends React.Component<{}, IQueryResultGridDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        } as IQueryResultGridDemoState;
    }

    public render(): JSX.Element {
        return <QueryResultGrid 
                    project={VSS.getWebContext().project.id}
                    selectionPreservedOnEmptyClick={true}
                    items={null}
                    wiql="select [System.Id], [System.CreatedDate], [System.State], [System.WorkItemType], [System.AreaPath], [System.AssignedTo] from Workitems where [System.TeamProject] = @project and [System.WorkItemType] <> '' and [System.State] <> ''"                     
                />
    }
}