// import "./FieldValuePicker.css";

// import * as React from "react";

// import { WorkItemFieldActions } from "../../Flux/Actions/WorkItemFIeldActions";
// import { BaseStore, StoreFactory } from "../../Flux/Stores/BaseStore";
// import { WorkItemFieldStore } from "../../Flux/Stores/WorkItemFieldStore";
// import {
//     BaseFluxComponent, IBaseFluxComponentProps, IBaseFluxComponentState
// } from "../Utilities/BaseFluxComponent";

// import { IComboBoxOption, IComboBoxProps, VirtualizedComboBox } from "OfficeFabric/ComboBox";
// import { autobind, css } from "OfficeFabric/Utilities";
// import { WorkItemField } from 'TFS/WorkItemTracking/Contracts';

// export interface IFieldValuePickerProps extends IBaseFluxComponentProps {
//     value?: string;
//     onValueChanged?: (value: string | number | Date) => void;
//     field: WorkItemField;
// }

// export interface IFieldValuePickerState extends IBaseFluxComponentState {
    
// }

// export class FieldValuePicker extends BaseFluxComponent<IFieldValuePickerProps, IFieldValuePickerState> {
//     protected initializeState(): void {
//         this.state = {};
//     }

//     public render(): JSX.Element {
//         return (
//             <div className={css("work-item-field-picker", this.props.className)}>
//                 <VirtualizedComboBox {...comboProps} />
//             </div>
//         )
//     }

//     @autobind
//     private _onChanged(option?: IComboBoxOption, _index?: number, value?: string) {
//         this.props.onValueChanged(option ? option.key as string : (value || ""));
//     }
// }