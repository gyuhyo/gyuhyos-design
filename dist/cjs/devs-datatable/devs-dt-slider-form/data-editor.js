"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var react_hook_form_1 = require("react-hook-form");
var devs_dt_slider_form_1 = require("./devs-dt-slider-form");
var DataEditor = react_1.default.memo(function (_a) {
    var col = _a.col;
    var _b = (0, devs_dt_context_1.useDt)(), row = _b.focusedRow, dataSource = _b.dataSource, focusedRowForm = _b.focusedRowForm;
    var defaultValue = focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.getValues(col.field);
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: focusedRowForm.control, name: col.field, defaultValue: (0, devs_dt_slider_form_1.getDefaultValue)(defaultValue), rules: { required: col.required }, render: function (_a) {
            var onChange = _a.field.onChange;
            return col.editor({
                value: defaultValue,
                row: row,
                index: rowIndex,
                onChange: onChange,
                setValue: focusedRowForm.setValue,
                getValue: focusedRowForm.getValues,
            });
        } }));
});
exports.default = DataEditor;
