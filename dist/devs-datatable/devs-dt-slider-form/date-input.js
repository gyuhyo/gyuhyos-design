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
import React from "react";
import { useDt } from "../context/devs-dt-context";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getDefaultValue } from "./devs-dt-slider-form";
import { useFormErrors } from "./data-form-error-context";
var DateInput = React.memo(function (_a) {
    var _b;
    var col = _a.col;
    var errors = useFormErrors();
    var _c = useDt(), row = _c.focusedRow, dataSource = _c.dataSource, setDataSource = _c.setDataSource, focusedRowForm = _c.focusedRowForm;
    var defaultValue = (_b = focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.getValues(col.field)) !== null && _b !== void 0 ? _b : undefined;
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return (_jsx(Controller, { control: focusedRowForm.control, name: col.field, defaultValue: getDefaultValue({
            val: defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : undefined,
            col: col,
            row: row,
            rowIndex: rowIndex,
            getValue: focusedRowForm.getValues,
        }), rules: { required: col.required }, render: function (_a) {
            var onChange = _a.field.onChange;
            return (_jsx(DatePicker, __assign({ status: (errors === null || errors === void 0 ? void 0 : errors.hasOwnProperty(col.field)) ? "error" : undefined, style: { width: "100%" }, placeholder: "\uB0A0\uC9DC \uC120\uD0DD", defaultValue: getDefaultValue({
                    val: defaultValue
                        ? dayjs(defaultValue).tz("Asia/Seoul")
                        : undefined,
                    col: col,
                    row: row,
                    rowIndex: rowIndex,
                    getValue: focusedRowForm.getValues,
                }), onChange: function (_, v) {
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
export default React.memo(DateInput);
