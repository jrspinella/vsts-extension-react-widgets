define(["require", "exports", "tslib", "react", "../Components/IdentityView", "../Components/WorkItemComponents/StateView", "../Components/WorkItemComponents/TagsView", "../Components/WorkItemComponents/TitleView", "./Date", "./String", "OfficeFabric/Label", "OfficeFabric/Tooltip", "TFS/WorkItemTracking/Contracts", "TFS/WorkItemTracking/Services"], function (require, exports, tslib_1, React, IdentityView_1, StateView_1, TagsView_1, TitleView_1, Date_1, String_1, Label_1, Tooltip_1, Contracts_1, Services_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function workItemFieldValueComparer(w1, w2, field, sortAsc) {
        var v1 = w1.fields[field.referenceName];
        var v2 = w2.fields[field.referenceName];
        var compareValue;
        if (String_1.StringUtils.equals(field.referenceName, "System.Id", true)) {
            compareValue = (w1.id > w2.id) ? 1 : -1;
        }
        else if (field.type === Contracts_1.FieldType.DateTime) {
            var date1 = new Date(v1 || null);
            var date2 = new Date(v2 || null);
            compareValue = Date_1.DateUtils.defaultComparer(date1, date2);
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            var b1 = v1 == null ? "" : (!v1 ? "False" : "True");
            var b2 = v2 == null ? "" : (!v2 ? "False" : "True");
            compareValue = String_1.StringUtils.ignoreCaseComparer(b1, b2);
        }
        else if (field.type === Contracts_1.FieldType.Integer || field.type === Contracts_1.FieldType.Double) {
            if (v1 == null && v2 == null) {
                compareValue = 0;
            }
            else if (v1 == null && v2 != null) {
                compareValue = -1;
            }
            else if (v1 != null && v2 == null) {
                compareValue = 1;
            }
            else {
                compareValue = (v1 > v2) ? 1 : -1;
            }
        }
        else {
            compareValue = String_1.StringUtils.ignoreCaseComparer(v1, v2);
        }
        return sortAsc ? compareValue : -1 * compareValue;
    }
    exports.workItemFieldValueComparer = workItemFieldValueComparer;
    function workItemFieldCellRenderer(item, field, options) {
        var text = item.fields[field.referenceName] != null ? item.fields[field.referenceName] : "";
        var className = "work-item-grid-cell";
        var innerElement;
        var noTooltip = false;
        if (field.type === Contracts_1.FieldType.DateTime) {
            var dateStr = item.fields[field.referenceName];
            if (!dateStr) {
                text = "";
            }
            else {
                var date = new Date(dateStr);
                text = Date_1.DateUtils.format(date, "mm/dd/yyyy h:MM TT");
            }
            innerElement = React.createElement(Label_1.Label, { className: className }, text);
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            var boolValue = item.fields[field.referenceName];
            text = boolValue == null ? "" : (!boolValue ? "False" : "True");
            innerElement = React.createElement(Label_1.Label, { className: className }, text);
        }
        else if (field.isIdentity) {
            text = item.fields[field.referenceName] || "";
            innerElement = React.createElement(IdentityView_1.IdentityView, { identityDistinctName: text });
            noTooltip = true;
        }
        else {
            switch (field.referenceName.toLowerCase()) {
                case "system.id":
                    text = item.id.toString();
                    innerElement = React.createElement(Label_1.Label, { className: className }, text);
                    break;
                case "system.title":
                    innerElement = React.createElement(TitleView_1.TitleView, { className: className, workItemId: item.id, onClick: options && options.onClick, title: item.fields["System.Title"], workItemType: item.fields["System.WorkItemType"] });
                    break;
                case "system.state":
                    innerElement = React.createElement(StateView_1.StateView, { className: className, state: item.fields["System.State"], workItemType: item.fields["System.WorkItemType"] });
                    break;
                case "system.tags":
                    var tagsArr = (item.fields[field.referenceName] || "").split(";");
                    innerElement = React.createElement(TagsView_1.TagsView, { tags: tagsArr });
                    break;
                default:
                    innerElement = React.createElement(Label_1.Label, { className: className }, item.fields[field.referenceName]);
                    break;
            }
        }
        if (noTooltip) {
            return innerElement;
        }
        return (React.createElement(Tooltip_1.TooltipHost, { content: text, delay: Tooltip_1.TooltipDelay.medium, overflowMode: Tooltip_1.TooltipOverflowMode.Parent, directionalHint: 4 }, innerElement));
    }
    exports.workItemFieldCellRenderer = workItemFieldCellRenderer;
    function getColumnSize(field) {
        if (String_1.StringUtils.equals(field.referenceName, "System.Id", true)) {
            return { minWidth: 40, maxWidth: 70 };
        }
        else if (String_1.StringUtils.equals(field.referenceName, "System.WorkItemType", true)) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else if (String_1.StringUtils.equals(field.referenceName, "System.Title", true)) {
            return { minWidth: 150, maxWidth: 300 };
        }
        else if (String_1.StringUtils.equals(field.referenceName, "System.State", true)) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else if (String_1.StringUtils.equals(field.referenceName, "System.Tags", true)) {
            return { minWidth: 100, maxWidth: 250 };
        }
        else if (field.type === Contracts_1.FieldType.TreePath) {
            return { minWidth: 150, maxWidth: 350 };
        }
        else if (field.type === Contracts_1.FieldType.Boolean) {
            return { minWidth: 40, maxWidth: 70 };
        }
        else if (field.type === Contracts_1.FieldType.DateTime) {
            return { minWidth: 80, maxWidth: 150 };
        }
        else if (field.type === Contracts_1.FieldType.Double ||
            field.type === Contracts_1.FieldType.Integer ||
            field.type === Contracts_1.FieldType.PicklistDouble ||
            field.type === Contracts_1.FieldType.PicklistInteger) {
            return { minWidth: 50, maxWidth: 100 };
        }
        else {
            return { minWidth: 100, maxWidth: 250 };
        }
    }
    exports.getColumnSize = getColumnSize;
    function openWorkItemDialog(e, item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newTab, workItemNavSvc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTab = e ? e.ctrlKey : false;
                        return [4, Services_1.WorkItemFormNavigationService.getService()];
                    case 1:
                        workItemNavSvc = _a.sent();
                        return [4, workItemNavSvc.openWorkItem(item.id, newTab)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    }
    exports.openWorkItemDialog = openWorkItemDialog;
});
