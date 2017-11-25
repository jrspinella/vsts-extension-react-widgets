import * as React from "react";

import { ClassificationNodeKey } from "../../../Flux/Stores/ClassificationNodeStore";
import { GUIDUtils } from "../../../Utilities/Guid";
import { StringUtils } from "../../../Utilities/String";
import { RichEditor } from "../../RichEditor";
import { ThrottledTextField } from "../../Utilities/ThrottledTextField";
import { ClassificationPicker } from "../../VSTS/ClassificationPicker";

import { Checkbox } from "OfficeFabric/Checkbox";

import { FieldType, WorkItemField } from "TFS/WorkItemTracking/Contracts";

export interface IWorkItemFieldValuePickerProps {
    className?: string;
    value?: any;
    onChange: (value: any) => void;
    field: WorkItemField;
    error?: string;
    label?: string;
    info?: string;
    delay?: number;
    required?: boolean;
}

export var WorkItemFieldValuePicker: React.StatelessComponent<IWorkItemFieldValuePickerProps> =
    (props: IWorkItemFieldValuePickerProps): JSX.Element => { 
        const {value} = props;
        const defaultProps = {...props};
        delete defaultProps["field"];

        switch (props.field.type) {
            case FieldType.Boolean:
                const checked = (value == 1 || StringUtils.equals(value as string, "true", true) || value as boolean === true) ? true : false;
                return <Checkbox
                    checked={checked}
                    onChange={(_e, checked: boolean) => props.onChange(checked)}
                />;
            case FieldType.Html:
                const htmlProps = {...defaultProps, containerId: GUIDUtils.newGuid()};
                return <RichEditor {...htmlProps} />;
            case FieldType.TreePath:
                const treeProps = {
                    ...defaultProps, 
                    type: props.field.referenceName === "System.AreaPath" ? ClassificationNodeKey.Area : ClassificationNodeKey.Iteration
                };
                return <ClassificationPicker {...treeProps} />;
            default:
                const textProps = {
                    ...defaultProps, 
                    onChanged: props.onChange,
                    errorMessage: props.error
                };
                delete defaultProps["onChange"];

                return <ThrottledTextField {...textProps} />;
        }
    }