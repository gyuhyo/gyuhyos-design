var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useDt } from "../context/devs-dt-context";
import { getDefaultValue } from "./devs-dt-slider-form";
import { useFormErrors } from "./data-form-error-context";
var TextArea = Input.TextArea;
var TextAreaInput = React.memo(function (_a) {
    var col = _a.col;
    var errors = useFormErrors();
    var _b = useDt(), row = _b.focusedRow, dataSource = _b.dataSource, setDataSource = _b.setDataSource, focusedRowForm = _b.focusedRowForm;
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
            return (_jsx(TextArea, __assign({ status: (errors === null || errors === void 0 ? void 0 : errors.hasOwnProperty(col.field)) ? "error" : undefined, style: { width: "100%" }, defaultValue: getDefaultValue({
                    val: defaultValue,
                    col: col,
                    row: row,
                    rowIndex: rowIndex,
                }), onChange: function (v) {
                    onChange(v);
                    if (col.onChange !== undefined) {
                        col.onChange({
                            value: v,
                            row: row,
                            index: rowIndex,
                            setDataSource: setDataSource,
                            setValue: focusedRowForm.setValue,
                            getValue: focusedRowForm.getValues,
                        });
                    }
                } }, col.inputOptions)));
        } }));
});
export default React.memo(TextAreaInput);
