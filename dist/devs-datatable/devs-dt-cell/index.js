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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { DatePicker, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import React from "react";
import { Controller, } from "react-hook-form";
import { useDt } from "../context/devs-dt-context";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
function DevsDtCell(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var register = _a.register, control = _a.control, col = _a.col, mode = _a.mode, defaultValue = _a.defaultValue, error = _a.error, autoFocus = _a.autoFocus, row = _a.row, merge = _a.merge, setValue = _a.setValue, getValue = _a.getValue, rowIndex = _a.rowIndex, trigger = _a.trigger;
    var _j = useDt(), focusedRow = _j.focusedRow, focusedCell = _j.focusedCell, setFocusedCell = _j.setFocusedCell, setDataSource = _j.setDataSource, setColumns = _j.setColumns, options = _j.options, editMode = _j.editMode, tbody = _j.tbody;
    var isCellEdit = React.useMemo(function () {
        var _a;
        if ((options === null || options === void 0 ? void 0 : options.editType) === undefined || (options === null || options === void 0 ? void 0 : options.editType) === "row")
            return false;
        return (_a = row.editedCells) === null || _a === void 0 ? void 0 : _a.includes(col.field);
    }, [options === null || options === void 0 ? void 0 : options.editType, row]);
    var cellRef = React.useRef(null);
    var divRef = React.useRef(null);
    React.useEffect(function () {
        var updateColumnWidth = function (columns, targetField, newWidth) {
            return columns.map(function (column) {
                // 컬럼이 자식 컬럼을 가지는 경우
                if (column.children) {
                    return __assign(__assign({}, column), { children: updateColumnWidth(column.children, targetField, newWidth) });
                }
                // field가 일치하는 컬럼을 찾아서 width 업데이트
                if (column.field === targetField) {
                    return __assign(__assign({}, column), { width: newWidth });
                }
                return column;
            });
        };
        var checkOverflow = function () {
            var _a;
            var tdElement = cellRef.current;
            var divElement = divRef.current;
            if (!tdElement || !divElement)
                return;
            // td의 실제 너비
            var tdWidth = tdElement.getBoundingClientRect().width;
            // div의 콘텐츠 너비
            var contentWidth = divElement.scrollWidth;
            // 콘텐츠가 td보다 크다면
            if (contentWidth > tdWidth && contentWidth > ((_a = col.width) !== null && _a !== void 0 ? _a : 100)) {
                setColumns(function (prev) {
                    return updateColumnWidth(prev, col.field, contentWidth + 12);
                });
            }
        };
        // 초기에 한 번 실행
        checkOverflow();
    }, []);
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
        if ((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.rowId) === row.rowId &&
            focusedCell === col.field &&
            index === -1) {
            classes.push("devs-dt-focused-cell");
        }
        return classes.join(" ");
    }, [col.sticky, error, focusedCell, focusedRow]);
    var getDefaultValue = function (val) {
        if (col.defaultValue !== undefined) {
            return col.defaultValue({
                row: row,
                value: defaultValue,
                index: rowIndex,
                getValue: getValue,
            });
        }
        return val;
    };
    var cellComp = React.useMemo(function () {
        if (col.editor !== undefined) {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: getDefaultValue(defaultValue || null), rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return col.editor({
                        value: defaultValue,
                        row: row,
                        index: rowIndex,
                        onChange: onChange,
                        setValue: setValue,
                        getValue: getValue,
                    });
                } }));
        }
        if (col.type === "date") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: getDefaultValue(defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null), rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(DatePicker, __assign({ size: "small", placeholder: "\uB0A0\uC9DC \uC120\uD0DD", defaultValue: getDefaultValue(defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null), onChange: function (_, v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                    getValue: getValue,
                                });
                            }
                        }, autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "datetime") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: getDefaultValue(defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null), rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(DatePicker, __assign({ size: "small", placeholder: "\uB0A0\uC9DC/\uC2DC\uAC04 \uC120\uD0DD", defaultValue: getDefaultValue(defaultValue ? dayjs(defaultValue).tz("Asia/Seoul") : null), showTime: true, onChange: function (_, v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                    getValue: getValue,
                                });
                            }
                        }, autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "select") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: getDefaultValue(defaultValue || null), rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(Select, __assign({ size: "small", showSearch: true, onChange: function (v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                    getValue: getValue,
                                });
                            }
                        }, defaultValue: getDefaultValue(defaultValue || null), autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus }, col.inputOptions, { children: col.options &&
                            col.options.map(function (op) { return (_jsx(Select.Option, __assign({ value: op.value }, { children: op.label }), op.value)); }) })));
                } }));
        }
        if (col.type === "number") {
            return (_jsx(Controller, { control: control, name: col.field, defaultValue: getDefaultValue(defaultValue || null), rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return (_jsx(InputNumber, __assign({ size: "small", onChange: function (v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                    getValue: getValue,
                                });
                            }
                        }, defaultValue: getDefaultValue(defaultValue || null), autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "textarea") {
            return (_jsx("textarea", __assign({}, register(col.field, {
                required: col.required,
                onChange: function (e) {
                    if (col.onChange !== undefined) {
                        col.onChange({
                            value: e.target.value,
                            row: row,
                            index: rowIndex,
                            setDataSource: setDataSource,
                            setValue: setValue,
                            getValue: getValue,
                        });
                    }
                },
            }), { defaultValue: getDefaultValue(defaultValue || null), autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus }, col.inputOptions)));
        }
        return (_jsx("input", __assign({}, register(col.field, {
            required: col.required,
            onChange: function (e) {
                if (col.onChange !== undefined) {
                    col.onChange({
                        value: e.target.value,
                        row: row,
                        index: rowIndex,
                        setDataSource: setDataSource,
                        setValue: setValue,
                        getValue: getValue,
                    });
                }
            },
        }), { type: "text", defaultValue: getDefaultValue(defaultValue || null), autoFocus: (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click" ? true : autoFocus, autoComplete: "off" }, col.inputOptions)));
    }, [col, autoFocus, defaultValue, row, rowIndex]);
    var GetCell = function () {
        var _a, _b;
        if (col.render !== undefined) {
            return col.render({
                value: defaultValue,
                row: row,
                index: rowIndex,
                getValue: getValue,
            });
        }
        else {
            if (col.type === "number") {
                return _jsx("span", { children: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toLocaleString() });
            }
            if (col.type === "date") {
                if (defaultValue && dayjs(defaultValue).isValid()) {
                    return (_jsx("span", { children: dayjs(defaultValue).tz("Asia/Seoul").format("YYYY-MM-DD") }));
                }
            }
            if (col.type === "datetime") {
                if (defaultValue && dayjs(defaultValue).isValid()) {
                    return (_jsx("span", { children: dayjs(defaultValue)
                            .tz("Asia/Seoul")
                            .format("YYYY-MM-DD HH:mm:ss") }));
                }
            }
            if (col.type === "select") {
                return (_jsx("span", { children: (_b = (_a = col.options) === null || _a === void 0 ? void 0 : _a.find(function (op) { return op.value === defaultValue; })) === null || _b === void 0 ? void 0 : _b.label }));
            }
            return _jsx("span", { children: defaultValue });
        }
    };
    var Cell = React.useMemo(function () {
        var rowEditCheck = mode === undefined ||
            mode === "r" ||
            (mode === "u" && col.updatable === false) ||
            (mode === "c" && col.editable === false);
        var cellEditCheck = (options === null || options === void 0 ? void 0 : options.editType) === "cell" && isCellEdit === false;
        if ((options === null || options === void 0 ? void 0 : options.editType) === undefined || (options === null || options === void 0 ? void 0 : options.editType) === "row") {
            if ((options === null || options === void 0 ? void 0 : options.editMode) === "slider") {
                return GetCell();
            }
            if (rowEditCheck) {
                return GetCell();
            }
            else {
                return cellComp;
            }
        }
        else {
            if (cellEditCheck) {
                return GetCell();
            }
            else {
                return cellComp;
            }
        }
    }, [defaultValue, row, col, mode, isCellEdit]);
    var onCellEditChange = React.useCallback(function (clickType) {
        var _a, _b, _c;
        if ((options === null || options === void 0 ? void 0 : options.readonly) === true ||
            col.editable === false ||
            col.updatable === false)
            return;
        if (((_a = options === null || options === void 0 ? void 0 : options.onBeforeCellEdit) === null || _a === void 0 ? void 0 : _a.call(options, {
            index: rowIndex,
            row: row,
            value: defaultValue,
        })) === false)
            return;
        if (clickType === "doubleClick" && (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "click")
            return;
        if (clickType === "click" &&
            ((options === null || options === void 0 ? void 0 : options.cellEditClickType) === undefined ||
                (options === null || options === void 0 ? void 0 : options.cellEditClickType) === "doubleClick"))
            return;
        if (!((_c = (_b = options === null || options === void 0 ? void 0 : options.rowEditable) === null || _b === void 0 ? void 0 : _b.call(options, { index: rowIndex, row: row })) !== null && _c !== void 0 ? _c : true))
            return;
        if ((options === null || options === void 0 ? void 0 : options.editType) === "cell" && isCellEdit === false) {
            setValue("editedCells", __spreadArray(__spreadArray([], __read(row.editedCells), false), [col.field], false));
            setDataSource(function (prev) {
                return prev.map(function (x) {
                    if (x.rowId === row.rowId) {
                        return __assign(__assign({}, x), { checked: true, editedCells: __spreadArray(__spreadArray([], __read(x.editedCells), false), [col.field], false) });
                    }
                    return x;
                });
            });
        }
    }, [options, isCellEdit]);
    if (merge !== undefined && merge.hidden === true) {
        return (_jsx("td", { ref: cellRef, className: classString, rowSpan: 0, "data-hidden": true, "data-width": col.width, style: __assign({ display: "none", "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : "left" }, col.style) }));
    }
    return (_jsxs("td", __assign({ ref: cellRef, className: classString, rowSpan: merge === null || merge === void 0 ? void 0 : merge.rowSpan, "data-field": col.field, "data-hidden": false, "data-width": (_c = col.width) !== null && _c !== void 0 ? _c : 100, "data-edit-mode": isCellEdit, "data-editable": (_d = col.editable) !== null && _d !== void 0 ? _d : true, "data-updatable": (_e = col.updatable) !== null && _e !== void 0 ? _e : true, "data-required": (_f = col.required) !== null && _f !== void 0 ? _f : false, onClick: function () {
            setFocusedCell(col.field);
            onCellEditChange("click");
        }, onDoubleClick: function () { return onCellEditChange("doubleClick"); }, style: __assign({ "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_g = col.align) !== null && _g !== void 0 ? _g : "left" }, (_h = col.style) === null || _h === void 0 ? void 0 : _h.call(col, {
            target: "tbody",
            value: defaultValue,
            row: row,
        })) }, { children: [_jsx("div", __assign({ ref: divRef, style: {
                    position: "relative",
                    overflow: "hidden",
                    whiteSpace: "pre",
                    textOverflow: "ellipsis",
                    wordBreak: "keep-all",
                    width: "100%",
                    height: "100%",
                    alignContent: "center",
                    zIndex: 2,
                } }, { children: Cell })), _jsx("div", { className: "devs-dt-bg-cell" })] })));
}
export default React.memo(DevsDtCell, function (prev, curr) {
    var prevGetValue = prev.getValue, prevRegister = prev.register, prevSetValue = prev.setValue, prevTrigger = prev.trigger, prevControl = prev.control, prevProps = __rest(prev, ["getValue", "register", "setValue", "trigger", "control"]);
    var currGetValue = curr.getValue, currRegister = curr.register, currSetValue = curr.setValue, currTrigger = curr.trigger, currControl = curr.control, currProps = __rest(curr, ["getValue", "register", "setValue", "trigger", "control"]);
    return JSON.stringify(prevProps) === JSON.stringify(currProps);
});
