import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import DataRender from "./data-render";
import TextInput from "./text-input";
import NumberInput from "./number-input";
import DateInput from "./date-input";
import DateTimeInput from "./date-time-input";
import SelectInput from "./select-input";
import TextAreaInput from "./text-area-input";
import DataEditor from "./data-editor";
var DataFormItemRenderer = React.memo(function (_a) {
    var focusedRow = _a.focusedRow, node = _a.node;
    var isNotUpdate = ((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "r" || (focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "u") &&
        node.updatable === false;
    var isNotInsert = ((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "r" || (focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "c") &&
        node.editable === false;
    var isNotEditing = isNotUpdate || isNotInsert;
    var isRender = node.render !== undefined;
    if (isNotEditing) {
        return isRender ? _jsx(DataRender, { col: node }) : focusedRow[node.field];
    }
    if (node.editor !== undefined)
        return _jsx(DataEditor, { col: node });
    if (node.type === undefined)
        return _jsx(TextInput, { col: node });
    if (node.type === "number")
        return _jsx(NumberInput, { col: node });
    if (node.type === "date")
        return _jsx(DateInput, { col: node });
    if (node.type === "datetime")
        return _jsx(DateTimeInput, { col: node });
    if (node.type === "select")
        return _jsx(SelectInput, { col: node });
    if (node.type === "textarea")
        return _jsx(TextAreaInput, { col: node });
});
export default DataFormItemRenderer;
