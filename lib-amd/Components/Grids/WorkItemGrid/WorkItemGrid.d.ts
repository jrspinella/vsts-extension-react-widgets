/// <reference types="react" />
import "./WorkItemsGrid.scss";
import { IBaseComponentState } from "../../Common/BaseComponent";
import { IWorkItemGridProps } from "./WorkItemGrid.Props";
import { BaseComponent } from "../../Common/BaseComponent";
export declare class WorkItemGrid extends BaseComponent<IWorkItemGridProps, IBaseComponentState> {
    protected initializeState(): void;
    protected getDefaultClassName(): string;
    render(): JSX.Element;
    private _mapFieldsToColumn(fields);
    private _getCommandBarProps();
    private _getContextMenuProps();
    private _onItemInvoked(workItem, index?, ev?);
    private _itemComparer(workItem1, workItem2, field, sortOrder);
    private _itemFilter(workItem, filterText, field);
    private _getWiql(workItems?);
}
