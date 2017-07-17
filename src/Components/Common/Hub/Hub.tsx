import "./Hub.scss";

import * as React from "react";
import { Label } from "OfficeFabric/Label";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";
import { CommandBar } from "OfficeFabric/CommandBar";
import { TextField } from "OfficeFabric/TextField";
import { Icon } from "OfficeFabric/Icon";
import { Pivot, PivotItem, IPivotItemProps } from "OfficeFabric/Pivot";
import { autobind } from "OfficeFabric/Utilities";

import { FavoriteStar, IFavoriteStarProps } from "../FavoriteStar";

export interface IHubProps {
    title: string;
    pivotProps: IPivotProps;
    favoriteStarProps?: IFavoriteStarProps;    
}

export interface IPivotProps {
    initialSelectedKey?: string;
    onPivotClick?: (selectedPivotKey: string, ev?: React.MouseEvent<HTMLElement>) => void;
    pivots: IPivotItem[];
    onRenderPivotContent: (selectedPivotKey: string) => React.ReactNode;
}

export interface IPivotItem {
    text: string;
    key: string;
    itemCount?: number;
    itemIcon?: string;
    commands?: IContextualMenuItem[];
    overflowCommands?: IContextualMenuItem[];
    farCommands?: IContextualMenuItem[];
    filterProps?: IFilterProps;
}

export interface IFilterProps {
    showFilter: boolean;
    onFilterChange: (filterText: string) => void;
}

export interface IHubState {
    selectedPivotKey: string;
}

export class Hub extends React.Component<IHubProps, IHubState> {
    constructor(props: IHubProps, context?: any) {
        super(props, context);

        this.state = {
            selectedPivotKey: props.pivotProps.initialSelectedKey || props.pivotProps.pivots[0].key
        } as IHubState;
    }

    public componentWillReceiveProps(nextProps: IHubProps) {
        if (nextProps.pivotProps.initialSelectedKey && nextProps.pivotProps.initialSelectedKey !== this.state.selectedPivotKey) {
            this.setState({selectedPivotKey: nextProps.pivotProps.initialSelectedKey});
        }        
    }

    public render(): JSX.Element {
        return (
            <div className="hub">
                { this._renderHeader() }
                
                <div className="hub-pivots-container">
                    <div className="hub-pivots">
                        <Pivot                                    
                            initialSelectedKey={this.props.pivotProps.initialSelectedKey}
                            onLinkClick={(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
                                this.setState({selectedPivotKey: item.props.itemKey});
                                if (this.props.pivotProps.onPivotClick) {
                                    this.props.pivotProps.onPivotClick(item.props.itemKey, ev);
                                }
                            }}>
                            { this._renderPivots() }                
                        </Pivot>
                    </div>
                    <div className="seperator" />
                    { this._renderCommandBar() }
                </div>

                <div className="hub-pivot-content">
                    { this.props.pivotProps.onRenderPivotContent(this.state.selectedPivotKey) }
                </div>
            </div>
        );
    }

    private _renderHeader(): React.ReactNode {
        return <div className="hub-header">
            <Label className="hub-title">{this.props.title}</Label>
            { this.props.favoriteStarProps && <FavoriteStar {...this.props.favoriteStarProps} /> }            
        </div>
    }

    private _renderPivots(): React.ReactNode {
        return this.props.pivotProps.pivots.map((pivotItem: IPivotItem, index: number) => {
            return <PivotItem 
                className="hub-pivot" 
                itemKey={pivotItem.key} 
                itemCount={pivotItem.itemCount}
                itemIcon={pivotItem.itemIcon}
                linkText={pivotItem.text} 
                onRenderItemLink={this._customPivotItemRenderer} />
        });
    }

    @autobind
    private _customPivotItemRenderer(props: IPivotItemProps, defaultRenderer: (props: IPivotItemProps) => JSX.Element): JSX.Element {
        const itemCount = props.itemCount;

        if (itemCount == null) {
            return defaultRenderer(props);
        }
        else {
            const newProps = {...props, itemCount: undefined};
            return <span>
                { defaultRenderer(newProps) }
                <span className="badge">{itemCount}</span>
            </span>;
        }        
  }

    private _renderCommandBar(): React.ReactNode {
        const selectedPivot = this.props.pivotProps.pivots.filter(p => p.key === this.state.selectedPivotKey)[0];

        if ((selectedPivot.commands && selectedPivot.commands.length > 0) ||
            (selectedPivot.overflowCommands && selectedPivot.overflowCommands.length > 0) ||
            (selectedPivot.farCommands && selectedPivot.farCommands.length > 0) ||
            (selectedPivot.filterProps && selectedPivot.filterProps.showFilter)) {
            return <CommandBar 
                        className="hub-pivot-menu-bar"
                        items={selectedPivot.commands || []} 
                        overflowItems={selectedPivot.overflowCommands || []}
                        farItems={this._getFarCommands(selectedPivot)}
                    />;
        }

        return null;
    }

    private _getFarCommands(selectedPivot: IPivotItem): IContextualMenuItem[] {
        let items: IContextualMenuItem[] = [];
        if (selectedPivot.filterProps && selectedPivot.filterProps.showFilter) {
            items.push({
                key: "filter",
                className: "filter-command",
                onRender: (item) => {
                    return <TextField 
                        onRenderAddon={() => <Icon iconName="Filter" />}
                        className="filter-input" 
                        onChanged={filterText => selectedPivot.filterProps.onFilterChange(filterText)}
                        placeholder="Filter by Keyword" />
                }
            });
        }
        return items.concat(selectedPivot.farCommands || []);
    }
}