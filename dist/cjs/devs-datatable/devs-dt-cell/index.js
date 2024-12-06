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
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var advancedFormat_1 = __importDefault(require("dayjs/plugin/advancedFormat"));
var localeData_1 = __importDefault(require("dayjs/plugin/localeData"));
var weekday_1 = __importDefault(require("dayjs/plugin/weekday"));
var weekOfYear_1 = __importDefault(require("dayjs/plugin/weekOfYear"));
var weekYear_1 = __importDefault(require("dayjs/plugin/weekYear"));
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var antd_1 = require("antd");
var devs_dt_context_1 = require("../context/devs-dt-context");
dayjs_1.default.extend(customParseFormat_1.default);
dayjs_1.default.extend(advancedFormat_1.default);
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(localeData_1.default);
dayjs_1.default.extend(weekOfYear_1.default);
dayjs_1.default.extend(weekYear_1.default);
dayjs_1.default.locale("ko");
function DevsDtCell(_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var register = _a.register, control = _a.control, col = _a.col, mode = _a.mode, defaultValue = _a.defaultValue, error = _a.error, autoFocus = _a.autoFocus, row = _a.row, merge = _a.merge, setValue = _a.setValue, rowIndex = _a.rowIndex;
    var _j = (0, devs_dt_context_1.useDt)(), focusedRow = _j.focusedRow, focusedCell = _j.focusedCell, setFocusedCell = _j.setFocusedCell, setDataSource = _j.setDataSource, setColumns = _j.setColumns;
    var cellRef = react_1.default.useRef(null);
    var divRef = react_1.default.useRef(null);
    react_1.default.useEffect(function () {
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
                    return ((0, jsx_runtime_1.jsx)(antd_1.DatePicker, __assign({ size: "small", placeholder: "\uB0A0\uC9DC \uC120\uD0DD", defaultValue: defaultValue ? (0, dayjs_1.default)(defaultValue) : null, onChange: function (_, v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                });
                            }
                        }, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "select") {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return ((0, jsx_runtime_1.jsx)(antd_1.Select, __assign({ size: "small", showSearch: true, onChange: function (v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                });
                            }
                        }, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions, { children: col.options &&
                            col.options.map(function (op) { return ((0, jsx_runtime_1.jsx)(antd_1.Select.Option, __assign({ value: op.value }, { children: op.label }), op.value)); }) })));
                } }));
        }
        if (col.type === "number") {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return ((0, jsx_runtime_1.jsx)(antd_1.InputNumber, __assign({ size: "small", onChange: function (v) {
                            onChange(v);
                            if (col.onChange !== undefined) {
                                col.onChange({
                                    value: v,
                                    row: row,
                                    index: rowIndex,
                                    setDataSource: setDataSource,
                                    setValue: setValue,
                                });
                            }
                        }, defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
                } }));
        }
        if (col.type === "textarea") {
            return ((0, jsx_runtime_1.jsx)("textarea", __assign({}, register(col.field, {
                required: col.required,
                onChange: function (e) {
                    if (col.onChange !== undefined) {
                        col.onChange({
                            value: e.target.value,
                            row: row,
                            index: rowIndex,
                            setDataSource: setDataSource,
                            setValue: setValue,
                        });
                    }
                },
            }), { defaultValue: defaultValue || null, autoFocus: autoFocus }, col.inputOptions)));
        }
        if (col.editor !== undefined) {
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { control: control, name: col.field, defaultValue: defaultValue || null, rules: { required: col.required }, render: function (_a) {
                    var onChange = _a.field.onChange;
                    return col.editor({
                        value: defaultValue,
                        row: row,
                        index: rowIndex,
                        onChange: onChange,
                    });
                } }));
        }
        return ((0, jsx_runtime_1.jsx)("input", __assign({}, register(col.field, {
            required: col.required,
            onChange: function (e) {
                if (col.onChange !== undefined) {
                    col.onChange({
                        value: e.target.value,
                        row: row,
                        index: rowIndex,
                        setDataSource: setDataSource,
                        setValue: setValue,
                    });
                }
            },
        }), { type: "text", defaultValue: defaultValue || null, autoFocus: autoFocus, autoComplete: "off" }, col.inputOptions)));
    }, [col, autoFocus, defaultValue, row, rowIndex]);
    var Cell = react_1.default.useMemo(function () {
        if (mode === undefined ||
            mode === "r" ||
            (mode === "u" && col.updatable === false) ||
            (mode === "c" && col.editable === false)) {
            if (col.render !== undefined) {
                return col.render({ value: defaultValue, row: row, index: rowIndex });
            }
            else {
                return ((0, jsx_runtime_1.jsx)("span", { children: col.type === "number"
                        ? defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toLocaleString()
                        : defaultValue }));
            }
        }
        else {
            return cellComp;
        }
    }, [defaultValue, row, col, mode]);
    if (merge !== undefined && merge.hidden === true) {
        return ((0, jsx_runtime_1.jsx)("td", { ref: cellRef, className: classString, rowSpan: 0, "data-hidden": true, "data-width": col.width, style: __assign({ display: "none", "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : "left" }, col.style) }));
    }
    return ((0, jsx_runtime_1.jsxs)("td", __assign({ ref: cellRef, className: classString, rowSpan: merge === null || merge === void 0 ? void 0 : merge.rowSpan, "data-hidden": false, "data-width": (_c = col.width) !== null && _c !== void 0 ? _c : 100, "data-editable": (_d = col.editable) !== null && _d !== void 0 ? _d : true, "data-updatable": (_e = col.updatable) !== null && _e !== void 0 ? _e : true, "data-required": (_f = col.required) !== null && _f !== void 0 ? _f : false, onClick: function () { return setFocusedCell(col.field); }, style: __assign({ "--width": col.width ? "".concat(col.width, "px") : "100px", textAlign: (_g = col.align) !== null && _g !== void 0 ? _g : "left" }, (_h = col.style) === null || _h === void 0 ? void 0 : _h.call(col, { target: "thead", value: defaultValue, row: row })) }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ ref: divRef, style: {
                    position: "relative",
                    overflow: "hidden",
                    whiteSpace: "pre",
                    textOverflow: "ellipsis",
                    wordBreak: "keep-all",
                    width: "100%",
                    height: "100%",
                    alignContent: "center",
                    zIndex: 2,
                } }, { children: Cell })), (0, jsx_runtime_1.jsx)("div", { className: "devs-dt-bg-cell" })] })));
}
exports.default = react_1.default.memo(DevsDtCell);
