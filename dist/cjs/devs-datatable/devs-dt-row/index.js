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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var react_2 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var message_context_1 = require("../../alert-message/context/message-context");
var devs_dt_context_1 = require("../context/devs-dt-context");
var devs_dt_cell_1 = __importDefault(require("../devs-dt-cell"));
var dayjs_1 = __importDefault(require("dayjs"));
var RowNumberCell = function (_a) {
    var index = _a.index;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-index-cell", style: { "--width": "50px" } }, { children: index + 1 })));
};
var RowCheckCell = function (_a) {
    var data = _a.data, checked = _a.checked, setDataSource = _a.setDataSource, setValue = _a.setValue, multipleRowCheck = _a.multipleRowCheck, rowCheckable = _a.rowCheckable;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: { "--width": "30px" } }, { children: rowCheckable && ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked || false, style: { cursor: "pointer" }, onChange: function (e) {
                e.stopPropagation();
                setValue("checked", !checked);
                setDataSource(function (prev) {
                    if (checked === false && multipleRowCheck === false) {
                        return prev.map(function (p) {
                            return p.rowId === data.rowId
                                ? __assign(__assign({}, p), { checked: true }) : __assign(__assign({}, p), { checked: false });
                        });
                    }
                    if (checked === true && data.mode !== "c") {
                        return prev.map(function (p) {
                            return p.rowId === data.rowId
                                ? __assign(__assign({}, p), { checked: false, mode: "r" }) : __assign({}, p);
                        });
                    }
                    return prev.map(function (p) {
                        return p.rowId === data.rowId ? __assign(__assign({}, p), { checked: !checked }) : __assign({}, p);
                    });
                });
            } })) })));
};
var RowChangeOrderCell = function (_a) {
    var mode = _a.mode, dragHandleProps = _a.dragHandleProps;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-change-order-cell devs-dt-sticky-col", style: {
            "--width": "30px",
            cursor: mode !== "c" ? "grab" : "unset !important",
        } }, dragHandleProps, { children: mode !== "c" && "\u2195" })));
};
var RowExpandCell = function (_a) {
    var setDataSource = _a.setDataSource, data = _a.data, index = _a.index;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: { "--width": "30px", cursor: "pointer" }, onClick: function (e) {
            e.stopPropagation();
            setDataSource(function (prev) {
                return prev.map(function (p) {
                    return p.rowId === data.rowId ? __assign(__assign({}, p), { expand: !p.expand }) : __assign({}, p);
                });
            });
        } }, { children: (0, jsx_runtime_1.jsx)("button", { className: "expand_ico2 ".concat(data.expand ? "expand_ico_active2" : "") }) })));
};
var getDefaultValue = function (_a) {
    var col = _a.col, row = _a.row, rowIndex = _a.rowIndex, val = _a.val;
    if (col.defaultValue !== undefined) {
        var value = col.defaultValue({
            row: row,
            value: val,
            index: rowIndex,
        });
        return value;
    }
    return val;
};
function DevsDtRow(_a) {
    var _b, _c, _d, _e;
    var data = _a.data, index = _a.index, rowKey = _a.rowKey, lastNode = _a.lastNode, dragProvided = _a.dragProvided, dragSnapshot = _a.dragSnapshot;
    var _f = __read(react_2.default.useState(0), 2), forceReRender = _f[0], setForceReRender = _f[1];
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var _g = (0, devs_dt_context_1.useDt)(), setDataSource = _g.setDataSource, options = _g.options, formsRef = _g.formsRef, focusedRow = _g.focusedRow, setFocusedRow = _g.setFocusedRow, editCount = _g.editCount, dataSource = _g.dataSource, setSliderFormOpen = _g.setSliderFormOpen, setFocusedRowForm = _g.setFocusedRowForm, editMode = _g.editMode, currentPage = _g.currentPage, focusedCell = _g.focusedCell;
    var idx = (currentPage - 1) * ((_b = options === null || options === void 0 ? void 0 : options.paginationLimit) !== null && _b !== void 0 ? _b : 20) + index;
    var getDefaultValues = react_2.default.useMemo(function () {
        var hasDefaultValueColumns = lastNode
            .filter(function (f) { return f.defaultValue; })
            .reduce(function (prev, curr) {
            prev[curr.field] = null;
            return prev;
        }, {});
        var dataKeys = Object.keys(Object.assign(data, hasDefaultValueColumns));
        var defaultValuesData = dataKeys.reduce(function (prev, curr) {
            var findKey = lastNode.find(function (f) { return f.field === curr; });
            if (!findKey) {
                prev[curr] = data[curr];
            }
            else {
                var d = (data === null || data === void 0 ? void 0 : data[curr]) === null ? null : data[curr];
                if (data[curr]) {
                    d =
                        findKey.type === "date" || findKey.type === "datetime"
                            ? (0, dayjs_1.default)(data[curr]).tz("Asia/Seoul")
                            : data[curr];
                }
                prev[curr] = getDefaultValue({
                    col: findKey,
                    row: data,
                    rowIndex: index,
                    val: d,
                });
            }
            return prev;
        }, {});
        return defaultValuesData;
    }, []);
    var form = (0, react_hook_form_1.useForm)({
        defaultValues: getDefaultValues,
        mode: "onSubmit",
        reValidateMode: "onChange",
        criteriaMode: "all",
        delayError: 200,
        progressive: true,
        shouldFocusError: true,
        shouldUseNativeValidation: true,
    });
    var control = form.control, register = form.register, errors = form.formState.errors, setValue = form.setValue, getValues = form.getValues, setError = form.setError, watch = form.watch, trigger = form.trigger, reset = form.reset;
    var prevRow = react_2.default.useMemo(function () {
        return dataSource[idx - 1];
    }, [dataSource[idx - 1]]);
    var nextRow = react_2.default.useMemo(function () {
        return dataSource[idx + 1];
    }, [dataSource[idx + 1]]);
    react_2.default.useEffect(function () {
        if (!Object.keys(formsRef.current).includes(rowKey)) {
            formsRef.current[rowKey] = __assign(__assign({}, form), { forceRerender: function () { return setForceReRender(function (prev) { return ++prev; }); } });
        }
    }, []);
    react_2.default.useEffect(function () {
        setValue("mode", data.mode);
        setValue("checked", data.checked);
    }, [data.mode, data.checked]);
    var handleActionSliderForm = function () {
        if ((options === null || options === void 0 ? void 0 : options.multipleEdit) === false) {
            if (editCount > 0) {
                showMessage({
                    title: "경고",
                    type: "warnning",
                    message: "다른 데이터를 수정할 경우 기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
                    onOkClick: function () {
                        return setDataSource(function (prev) {
                            return prev
                                .filter(function (x) { return x.mode !== "c"; })
                                .map(function (p) {
                                return p.rowId === data.rowId
                                    ? __assign(__assign({}, p), { mode: "u", checked: true }) : __assign(__assign({}, p), { mode: "r", checked: false });
                            });
                        });
                    },
                    onCancelClick: function () { },
                });
            }
            else {
                setFocusedRowForm(null);
                setTimeout(function () { return setFocusedRowForm(form); }, 1);
                setSliderFormOpen(true);
            }
        }
        else {
            setFocusedRowForm(null);
            setTimeout(function () { return setFocusedRowForm(form); }, 1);
            setSliderFormOpen(true);
        }
    };
    var onEditModeClick = function (e) {
        var _a, _b, _c;
        if ((options === null || options === void 0 ? void 0 : options.readonly) === true)
            return;
        if (!((_b = (_a = options === null || options === void 0 ? void 0 : options.rowEditable) === null || _a === void 0 ? void 0 : _a.call(options, { index: idx, row: data })) !== null && _b !== void 0 ? _b : true))
            return;
        if (((_c = options === null || options === void 0 ? void 0 : options.onBeforeRowEdit) === null || _c === void 0 ? void 0 : _c.call(options, { index: idx, row: data })) === false)
            return;
        if ((options === null || options === void 0 ? void 0 : options.showEditModeSelector) && editMode === "slider") {
            handleActionSliderForm();
            return;
        }
        if ((options === null || options === void 0 ? void 0 : options.editMode) === "slider" &&
            ((options === null || options === void 0 ? void 0 : options.editType) === undefined || (options === null || options === void 0 ? void 0 : options.editType) === "row")) {
            handleActionSliderForm();
            return;
        }
        if (data.mode === "r" &&
            (options === null || options === void 0 ? void 0 : options.editMode) !== "slider" &&
            ((options === null || options === void 0 ? void 0 : options.editType) === undefined || (options === null || options === void 0 ? void 0 : options.editType) === "row")) {
            if ((options === null || options === void 0 ? void 0 : options.multipleEdit) === false) {
                if (editCount > 0) {
                    showMessage({
                        title: "경고",
                        type: "warnning",
                        message: "다른 데이터를 수정할 경우\n기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
                        onOkClick: function () {
                            return setDataSource(function (prev) {
                                return prev
                                    .filter(function (x) { return x.mode !== "c"; })
                                    .map(function (p) {
                                    return p.rowId === data.rowId
                                        ? __assign(__assign({}, p), { mode: "u", checked: true }) : __assign(__assign({}, p), { mode: "r", checked: false });
                                });
                            });
                        },
                        onCancelClick: function () { },
                    });
                }
                else {
                    setDataSource(function (prev) {
                        return prev.map(function (p) {
                            return p.rowId === data.rowId
                                ? __assign(__assign({}, p), { mode: p.mode === "c" ? "c" : "u", checked: true }) : __assign({}, p);
                        });
                    });
                }
            }
            else {
                setDataSource(function (prev) {
                    return prev.map(function (p) {
                        return p.rowId === data.rowId
                            ? __assign(__assign({}, p), { mode: p.mode === "c" ? "c" : "u", checked: true }) : __assign({}, p);
                    });
                });
            }
        }
    };
    var GetAutoFocus = react_2.default.useCallback(function (field) {
        var updatables = lastNode.filter(function (x) { return x.updatable === true || x.updatable === undefined; });
        if ((options === null || options === void 0 ? void 0 : options.editType) === "cell") {
            if (field === focusedCell &&
                updatables.find(function (f) { return f.field === field; })) {
                return true;
            }
            else {
                return false;
            }
        }
        if (data.mode === "c") {
            var editables = lastNode.filter(function (x) { return x.editable === true || x.editable === undefined; });
            if (editables.length === 0) {
                return false;
            }
            else {
                return editables[0].field === field;
            }
        }
        else if (data.mode === "u") {
            if (field === focusedCell &&
                updatables.find(function (f) { return f.field === field; })) {
                return true;
            }
            if (updatables.length === 0) {
                return false;
            }
            else {
                return updatables[0].field === field;
            }
        }
        return false;
    }, [lastNode, data, focusedCell]);
    var RowForceRerender = function () {
        setForceReRender(function (prev) { return ++prev; });
    };
    return ((0, jsx_runtime_1.jsxs)("tr", __assign({ className: "devs-dt-row".concat((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.rowId) === data.rowId ? " devs-dt-focused-row" : "").concat(data.checked === true ? " devs-dt-checked-row" : ""), onDoubleClick: onEditModeClick, onClick: function () {
            setFocusedRow(data);
            if (data.mode === "r") {
                setSliderFormOpen(false);
            }
        }, "data-edit-mode": data.mode, ref: dragProvided.innerRef }, dragProvided.draggableProps, { style: __assign({}, dragProvided.draggableProps.style), css: (0, react_1.css)((_c = options === null || options === void 0 ? void 0 : options.rowStyle) === null || _c === void 0 ? void 0 : _c.call(options, {
            index: idx,
            row: data,
            prevRow: prevRow,
            nextRow: nextRow,
        })) }, { children: [(options === null || options === void 0 ? void 0 : options.enabledRowOrder) && ((0, jsx_runtime_1.jsx)(RowChangeOrderCell, { mode: data.mode, dragHandleProps: dragProvided.dragHandleProps })), (options === null || options === void 0 ? void 0 : options.enabledExpand) && ((0, jsx_runtime_1.jsx)(RowExpandCell, { setDataSource: setDataSource, data: data, index: idx })), (options === null || options === void 0 ? void 0 : options.showRowNumber) && (0, jsx_runtime_1.jsx)(RowNumberCell, { index: idx }), (options === null || options === void 0 ? void 0 : options.enabledRowCheck) && ((0, jsx_runtime_1.jsx)(RowCheckCell, { data: data, checked: data.checked, setDataSource: setDataSource, setValue: setValue, multipleRowCheck: options.multipleRowCheck, rowCheckable: (_e = (_d = options === null || options === void 0 ? void 0 : options.rowCheckable) === null || _d === void 0 ? void 0 : _d.call(options, { index: idx, row: data })) !== null && _e !== void 0 ? _e : true })), lastNode &&
                lastNode.map(function (col, idx) {
                    var _a, _b, _c;
                    if ((options === null || options === void 0 ? void 0 : options.editMode) === "slider") {
                        register(col.field, {
                            required: col.required,
                            value: watch(col.field),
                        });
                    }
                    return ((0, jsx_runtime_1.jsx)(devs_dt_cell_1.default, { register: register, control: control, col: col, mode: data.mode, defaultValue: watch(col.field), error: errors.hasOwnProperty(col.field), autoFocus: (_b = (_a = col.autoFocus) === null || _a === void 0 ? void 0 : _a.call(col, data.mode)) !== null && _b !== void 0 ? _b : GetAutoFocus(col.field), row: data, prevRow: prevRow, nextRow: nextRow, setValue: setValue, merge: (_c = data._merge) === null || _c === void 0 ? void 0 : _c[col.field], rowIndex: index, getValue: getValues, trigger: trigger, watch: watch, forceRerender: RowForceRerender }, "".concat(rowKey, "-").concat(forceReRender, "-").concat(col.field)));
                })] })));
}
exports.default = react_2.default.memo(DevsDtRow);
