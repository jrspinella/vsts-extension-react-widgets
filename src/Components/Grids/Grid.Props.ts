import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";
import { IContextualMenuItem } from "OfficeFabric/ContextualMenu";

import { IBaseComponentProps, IBaseComponentState } from "../Common/BaseComponent"; 

export interface IGridProps extends IBaseComponentProps {
    items: any[];
    columns: GridColumn[];
    noResultsText?: string;
    selectionMode?: SelectionMode;
    contextMenuProps?: IContextMenuProps;
    onItemInvoked?: (item: any, index: number) => void;
    events?: IGridEvents;
    setKey?: string;
    filterText?: string;
    selectionPreservedOnEmptyClick?: boolean;
}

export interface IGridState extends IBaseComponentState {
    items?: any[];
    isContextMenuVisible?: boolean;
    contextMenuTarget?: MouseEvent;
    sortColumn?: GridColumn;
    sortOrder?: SortOrder;
}

export interface GridColumn {
    key: string;
    name: string;
    minWidth: number;
    maxWidth?: number;
    resizable?: boolean;
    sortFunction?: (item1: any, item2: any, sortOrder: SortOrder) => number;
    filterFunction?: (item: any, filterText: string) => boolean;
    onRenderCell?: (item?: any, index?: number) => JSX.Element;
    data?: any;
}

export interface IContextMenuProps {
    menuItems?: (selectedItems: any[]) => IContextualMenuItem[];
}

export interface IGridEvents {
    onSelectionChanged?: (selectedItems: any[]) => void;
}

export enum SortOrder {
    ASC,
    DESC
}