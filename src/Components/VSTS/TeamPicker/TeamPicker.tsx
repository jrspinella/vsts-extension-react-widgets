import * as React from "react";

import { TeamActions } from "../../../Flux/Actions/TeamActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { TeamStore } from "../../../Flux/Stores/TeamStore";
import { BaseFluxComponent, IBaseFluxComponentState } from "../../Utilities/BaseFluxComponent";
import { ISimpleComboProps, SimpleCombo } from "../../VssCombo/SimpleCombo";

import { css } from "OfficeFabric/Utilities";

import { WebApiTeam } from "TFS/Core/Contracts";

export interface ITeamPickerState extends IBaseFluxComponentState {
    allTeams?: WebApiTeam[];
}

export class TeamPicker extends BaseFluxComponent<ISimpleComboProps<WebApiTeam>, ITeamPickerState> {
    private _teamStore = StoreFactory.getInstance<TeamStore>(TeamStore);

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._teamStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._teamStore.isLoaded()) {
            this.setState({
                allTeams: this._teamStore.getAll()
            });
        }
        else {
            TeamActions.initializeTeams();
        }        
    }

    protected getStoresState(): ITeamPickerState {
        return {
            allTeams: this._teamStore.getAll()
        }
    }

    public render(): JSX.Element {
        if (!this.state.allTeams) {
            return null;
        }

        const props = {
            ...this.props,
            className: css("team-picker", this.props.className),
            getItemText: (team: WebApiTeam) => team.name,
            options: this.state.allTeams,
            limitedToAllowedOptions: true
        } as ISimpleComboProps<WebApiTeam>;

        return <SimpleCombo {...props} />;
    }
}