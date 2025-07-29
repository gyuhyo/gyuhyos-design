import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import { useDt } from "../context/devs-dt-context";
import { Controller } from "react-hook-form";
import { getDefaultValue } from "./devs-dt-slider-form";
var DataEditor = React.memo(function (_a) {
    var col = _a.col;
    var _b = useDt(), row = _b.focusedRow, dataSource = _b.dataSource, focusedRowForm = _b.focusedRowForm, setDataSource = _b.setDataSource;
    var defaultValue = focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.getValues(col.field);
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return (_jsx(Controller, { control: focusedRowForm.control, name: col.field, defaultValue: getDefaultValue({
            val: defaultValue,
            col: col,
            row: row,
            rowIndex: rowIndex,
        }), rules: { required: col.required }, render: function (_a) {
            var onChange = _a.field.onChange;
            return col.editor({
                value: defaultValue,
                row: row,
                index: rowIndex,
                onChange: onChange,
                setValue: focusedRowForm.setValue,
                getValue: focusedRowForm.getValues,
                setDataSource: setDataSource,
            });
        } }));
});
export default DataEditor;
