"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var devs_dt_context_1 = require("../context/devs-dt-context");
var devs_dt_slider_form_1 = require("./devs-dt-slider-form");
var data_form_error_context_1 = require("./data-form-error-context");
var SelectInput = react_1.default.memo(function (_a) {
    var col = _a.col;
    var errors = (0, data_form_error_context_1.useFormErrors)();
    var _b = (0, devs_dt_context_1.useDt)(), row = _b.focusedRow, dataSource = _b.dataSource, setDataSource = _b.setDataSource, focusedRowForm = _b.focusedRowForm;
    var defaultValue = focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.getValues(col.field);
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: focusedRowForm.control, name: col.field, defaultValue: (0, devs_dt_slider_form_1.getDefaultValue)({
            val: defaultValue,
            col: col,
            row: row,
            rowIndex: rowIndex,
        }), rules: { required: col.required }, render: function (_a) {
            var onChange = _a.field.onChange;
            return ((0, jsx_runtime_1.jsx)(antd_1.Select, __assign({ status: (errors === null || errors === void 0 ? void 0 : errors.hasOwnProperty(col.field)) ? "error" : undefined, style: { width: "100%" }, showSearch: true, onChange: function (v) {
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
                }, defaultValue: (0, devs_dt_slider_form_1.getDefaultValue)({
                    val: defaultValue,
                    col: col,
                    row: row,
                    rowIndex: rowIndex,
                }) }, col.inputOptions, { children: col.options &&
                    col.options.map(function (op) { return ((0, jsx_runtime_1.jsx)(antd_1.Select.Option, __assign({ value: op.value }, { children: op.label }), op.value)); }) })));
        } }));
});
exports.default = react_1.default.memo(SelectInput);
