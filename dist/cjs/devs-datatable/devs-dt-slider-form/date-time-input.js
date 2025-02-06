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
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var react_hook_form_1 = require("react-hook-form");
var antd_1 = require("antd");
var dayjs_1 = __importDefault(require("dayjs"));
var devs_dt_slider_form_1 = require("./devs-dt-slider-form");
var data_form_error_context_1 = require("./data-form-error-context");
var DateTimeInput = react_1.default.memo(function (_a) {
    var _b;
    var col = _a.col;
    var errors = (0, data_form_error_context_1.useFormErrors)();
    var _c = (0, devs_dt_context_1.useDt)(), row = _c.focusedRow, dataSource = _c.dataSource, setDataSource = _c.setDataSource, focusedRowForm = _c.focusedRowForm;
    var defaultValue = (_b = focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.getValues(col.field)) !== null && _b !== void 0 ? _b : undefined;
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: focusedRowForm.control, name: col.field, defaultValue: (0, devs_dt_slider_form_1.getDefaultValue)({
            val: defaultValue ? (0, dayjs_1.default)(defaultValue).tz("Asia/Seoul") : undefined,
            col: col,
            row: row,
            rowIndex: rowIndex,
            getValue: focusedRowForm.getValues,
        }), rules: { required: col.required }, render: function (_a) {
            var onChange = _a.field.onChange;
            return ((0, jsx_runtime_1.jsx)(antd_1.DatePicker, __assign({ status: (errors === null || errors === void 0 ? void 0 : errors.hasOwnProperty(col.field)) ? "error" : undefined, style: { width: "100%" }, placeholder: "\uB0A0\uC9DC/\uC2DC\uAC04 \uC120\uD0DD", showTime: true, defaultValue: (0, devs_dt_slider_form_1.getDefaultValue)({
                    val: defaultValue
                        ? (0, dayjs_1.default)(defaultValue).tz("Asia/Seoul")
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
exports.default = react_1.default.memo(DateTimeInput);
