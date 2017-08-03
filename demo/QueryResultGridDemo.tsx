import * as React from "react";

import {QueryResultGrid} from "../src/Components/Grids/WorkItemGrid";

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
                    filterText="Active"              
                    compact={true}      
                    wiql="select [System.Id], [System.State], [System.WorkItemType], [System.AreaPath], [Microsoft.VSTS.Common.Priority], [c1.boolean], [c1.integer], [System.CreatedBy], [System.AssignedTo], [System.State],[System.Title],  [System.Tags] from Workitems where [System.TeamProject] = @project and [System.WorkItemType] <> '' and [System.State] <> ''"                     
                />
    }
}