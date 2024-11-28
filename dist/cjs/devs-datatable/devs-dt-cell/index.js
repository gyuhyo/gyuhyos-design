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
var dayjs_1 = __importDefault(require("dayjs"));
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var antd_1 = require("antd");
var devs_dt_context_1 = require("../context/devs-dt-context");
function DevsDtCell(_a) {
    var _b, _c, _d, _e, _f;
    var register = _a.register, control = _a.control, col = _a.col, mode = _a.mode, defaultValue = _a.defaultValue, error = _a.error, autoFocus = _a.autoFocus, row = _a.row, merge = _a.merge;
    var _g = (0, devs_dt_context_1.useDt)(), focusedRow = _g.focusedRow, focusedCell = _g.focusedCell, setFocusedCell = _g.setFocusedCell;
    var cellRef = react_1.default.useRef(null);
    var classString = react_1.default.useMemo(function () {
        var classes = [];
        if (cellRef.current) {
            var refClasses = cellRef.current.classList.value.split(" ");
            if (refClasses.indexOf("devs-dt-cell") === -1) {
                refClasses.push("devs-dt-cell");
            }
            if (col.sticky == true &&
                refClasses.indexOf("devs-dt-sticky-col") === -1) {
                refClasses.push("devs-dt-sticky-col");
            }
            if (error) {
                if (refClasses.indexOf("devs-dt-cell-error") === -1) {
                    refClasses.push("devs-dt-cell-error");
                }
            }
            else {
                var index_1 = refClasses.indexOf("devs-dt-cell-error");
                if (index_1 > -1) {
                    refClasses.splice(index_1, 1);
                }
            }
            classes = refClasses;
        }
        else {
            classes = ["devs-dt-cell"];
            if (col.sticky == true) {
                classes.push("devs-dt-sticky-col");
            }
        }
        var index = classes.indexOf("devs-dt-focused-cell");
        if (index > -1) {
            classes.splice(index, 1);
        }
        if (focusedRow === row && focusedCell === col.field && index === -1) {
            classes.push("devs-dt-focused-cell");
        }
        return classes.join(" ");
    }, [col.sticky, error, focusedCell, focusedRow]);
    var cellComp = react_1.default.useMemo(function () {
        if (col.type === "date") {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue ? (0, dayjs_1.default)(defaultValue) : null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return ((0, jsx_runtime_1.jsx)(antd_1.DatePicker, __assign({ size: "small", placeholder: "\uB0A0\uC9DC \uC120\uD0DD", defaultValue: defaultValue ? (0, dayjs_1.default)(defaultValue) : null, onChange: function (_, v) { return onChange(v); }, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "select") {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return ((0, jsx_runtime_1.jsx)(antd_1.Select, __assign({ size: "small", onChange: onChange, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions, { children: col.options &&
                            col.options.map(function (op) { return ((0, jsx_runtime_1.jsx)(antd_1.Select.Option, __assign({ value: op.value }, { children: op.label }), op.value)); }) })));
                } }));
        }
        if (col.type === "number") {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return ((0, jsx_runtime_1.jsx)(antd_1.InputNumber, __assign({ size: "small", onChange: onChange, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.editor !== undefined) {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return col.editor({
                        value: defaultValue,
                        rowData: row,
                        index: -1,
                        onChange: onChange,
                    });
                } }));
        }
        return ((0, jsx_runtime_1.jsx)("input", __assign({}, register(col.field, {
            required: col.required ? "필수 입력사항 입니다." : false,
        }), { type: "text", defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
    }, [col]);
    var Cell = react_1.default.useMemo(function () {
        if (mode === undefined ||
            mode === "r" ||
            (mode === "u" && col.updatable === false) ||
            (mode === "c" && col.editable === false)) {
            if (col.render !== undefined) {
                return col.render({ value: defaultValue, rowData: row, index: -1 });
            }
            else {
                return (0, jsx_runtime_1.jsx)("span", { children: defaultValue });
            }
        }
        else {
            return cellComp;
        }
    }, [defaultValue, row, col, mode]);
    if (merge !== undefined && merge.hidden === true) {
        return ((0, jsx_runtime_1.jsx)("td", { ref: cellRef, className: classString, rowSpan: 0, "data-hidden": true, "data-width": col.width, style: __assign({ display: "none", "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : "left" }, col.style) }));
    }
    return ((0, jsx_runtime_1.jsx)("td", __assign({ ref: cellRef, className: classString, rowSpan: merge === null || merge === void 0 ? void 0 : merge.rowSpan, "data-hidden": false, "data-width": (_c = col.width) !== null && _c !== void 0 ? _c : 100, "data-editable": (_d = col.editable) !== null && _d !== void 0 ? _d : true, "data-updatable": (_e = col.updatable) !== null && _e !== void 0 ? _e : true, style: __assign({ "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_f = col.align) !== null && _f !== void 0 ? _f : "left" }, col.style) }, { children: Cell })));
}
exports.default = react_1.default.memo(DevsDtCell);
