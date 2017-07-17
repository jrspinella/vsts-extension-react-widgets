import * as React from "react";

import {QueryResultGrid, ColumnPosition} from "../src/Components/Grids/WorkItemGrid";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";

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
                    commandBarProps={{
                        hideSearchBox: true,
                        hideCommandBar: true
                    }}
                    wiql="select [System.Id], [System.WorkItemType], [System.AreaPath], [Microsoft.VSTS.Common.Priority], [c1.boolean], [c1.integer], [System.CreatedBy], [System.Title], [System.AssignedTo], [System.State], [System.Tags] from Workitems where [System.TeamProject] = @project and [System.WorkItemType] <> '' and [System.State] <> ''"                     
                />
    }
}