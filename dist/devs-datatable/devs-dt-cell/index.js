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
import dayjs from "dayjs";
import React from "react";
import { Controller, } from "react-hook-form";
import { DatePicker, InputNumber, Select } from "antd";
import { useDt } from "../context/devs-dt-context";
function DevsDtCell(_a) {
    var _b, _c;
    var register = _a.register, control = _a.control, col = _a.col, mode = _a.mode, defaultValue = _a.defaultValue, error = _a.error, autoFocus = _a.autoFocus, row = _a.row, merge = _a.merge;
    var _d = useDt(), focusedRow = _d.focusedRow, focusedCell = _d.focusedCell, setFocusedCell = _d.setFocusedCell;
    var cellRef = React.useRef(null);
    var classString = React.useMemo(function () {
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
    var cellComp = React.useMemo(function () {
        if (col.type === "date") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: defaultValue ? dayjs(defaultValue) : null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(DatePicker, __assign({ size: "small", placeholder: "\uB0A0\uC9DC \uC120\uD0DD", defaultValue: defaultValue ? dayjs(defaultValue) : null, onChange: function (_, v) { return onChange(v); }, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "select") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(Select, __assign({ size: "small", onChange: onChange, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions, { children: col.options &&
                            col.options.map(function (op) { return (_jsx(Select.Option, __assign({ value: op.value }, { children: op.label }), op.value)); }) })));
                } }));
        }
        if (col.type === "number") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(InputNumber, __assign({ size: "small", onChange: onChange, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.editor !== undefined) {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return col.editor({
                        value: defaultValue,
                        rowData: row,
                        index: -1,
                        onChange: onChange,
                    });
                } }));
        }
        return (_jsx("input", __assign({}, register(col.field, {
            required: col.required ? "필수 입력사항 입니다." : false,
        }), { type: "text", defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
    }, [col]);
    var Cell = React.useMemo(function () {
        if (mode === undefined ||
            mode === "r" ||
            (mode === "u" && col.updatable === false) ||
            (mode === "c" && col.editable === false)) {
            if (col.render !== undefined) {
                return col.render({ value: defaultValue, rowData: row, index: -1 });
            }
            else {
                return _jsx("span", { children: defaultValue });
            }
        }
        else {
            return cellComp;
        }
    }, [defaultValue, row, col, mode]);
    if (merge !== undefined && merge.hidden === true) {
        return (_jsx("td", { ref: cellRef, className: classString, rowSpan: 0, "data-hidden": true, "data-width": col.width, style: __assign({ display: "none", "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : "left" }, col.style) }));
    }
    return (_jsx("td", __assign({ ref: cellRef, className: classString, rowSpan: merge === null || merge === void 0 ? void 0 : merge.rowSpan, "data-hidden": false, "data-width": col.width, style: __assign({ "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_c = col.align) !== null && _c !== void 0 ? _c : "left" }, col.style) }, { children: Cell })));
}
export default React.memo(DevsDtCell);
