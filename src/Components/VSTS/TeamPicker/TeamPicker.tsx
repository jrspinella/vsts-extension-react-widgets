import * as React from "react";

import { TeamActions } from "../../../Flux/Actions/TeamActions";
import { BaseStore, StoreFactory } from "../../../Flux/Stores/BaseStore";
import { TeamStore } from "../../../Flux/Stores/TeamStore";
import { StringUtils } from "../../../Utilities/String";
import {
    BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
} from "../../Utilities/BaseFluxComponent";
import { VssCombo } from "../../VssCombo";

import { autobind, css } from "OfficeFabric/Utilities";

export interface ITeamPickerProps extends IBaseFluxComponentProps {
    value?: string;
    onChange?: (teamId: string) => void;
    error?: string;
    label?: string;
    info?: string;
    disabled?: boolean;
    delay?: number;
    required?: boolean;
}

export interface ITeamPickerState extends IBaseFluxComponentState {
    comboOptions?: string[];
    value?: string;
}

export class TeamPicker extends BaseFluxComponent<ITeamPickerProps, ITeamPickerState> {
    private _teamStore = StoreFactory.getInstance<TeamStore>(TeamStore);

    protected initializeState(): void {
        this.state = {
            value: this.props.value || ""
        };
    }

    protected getStores(): BaseStore<any, any, any>[] {
        return [this._teamStore];
    }

    public componentDidMount() {
        super.componentDidMount();
        if (this._teamStore.isLoaded()) {
            this.setState({
                comboOptions: this._teamStore.getAll().map(team => team.name)
            });
        }
        else {
            TeamActions.initializeTeams();
        }        
    }

    public componentWillReceiveProps(nextProps: ITeamPickerProps) {
        super.componentWillReceiveProps(nextProps);
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }        
    }

    protected getStoresState(): ITeamPickerState {
        const allTeams = this._teamStore.getAll();
        return {
            comboOptions: allTeams ? allTeams.map(team => team.name) : null
        }
    }

    public render(): JSX.Element {       
        let value: string;
        if (this.state.value && this._teamStore.getItem(this.state.value)) {
            value = this._teamStore.getItem(this.state.value).name;
        }
        else {
            value = this.state.value
        }

        const allTeamsLoaded = this.state.comboOptions != null;
        const error = this.props.error || this._getDefaultError(value);

        return <VssCombo 
            className={css("team-picker", this.props.className)}
            value={!allTeamsLoaded ? "" : value} 
            disabled={!allTeamsLoaded ? true : this.props.disabled}
            delay={this.props.delay}
            required={!allTeamsLoaded ? false : this.props.required}
            label={this.props.label} 
            info={this.props.info}
            error={!allTeamsLoaded ? "" : error}
            options={this.state.comboOptions || []} 
            onChange={this._onChange} />;
    }

    @autobind
    private _onChange(teamName: string) {
        const team = this._teamStore.getItem(teamName);
        const value = team ? team.id : teamName;

        this.setState({value: value}, () => {
            this.props.onChange(value);
        });
    }

    private _getDefaultError(teamId: string): string {
        if (StringUtils.isNullOrEmpty(teamId)) {
            return this.props.required ? "A team is required." : null;
        }
        
        return !this._teamStore.itemExists(teamId) ? "This team doesn't exist in the current project" : null;
    }
}