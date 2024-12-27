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
/** @jsxImportSource @emotion/react */
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var devs_dt_context_1 = require("../context/devs-dt-context");
var devs_dt_cell_1 = __importDefault(require("../devs-dt-cell"));
var message_context_1 = require("../../alert-message/context/message-context");
var react_2 = require("@emotion/react");
var RowNumberCell = function (_a) {
    var index = _a.index;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-index-cell", style: { "--width": "50px" } }, { children: index + 1 })));
};
var RowCheckCell = function (_a) {
    var data = _a.data, checked = _a.checked, setDataSource = _a.setDataSource, setValue = _a.setValue, multipleRowCheck = _a.multipleRowCheck;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-sticky-col", style: { "--width": "30px" } }, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked || false, style: { cursor: "pointer" }, onChange: function (e) {
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
            } }) })));
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
function DevsDtRow(_a) {
    var _b;
    var data = _a.data, index = _a.index, rowKey = _a.rowKey, lastNode = _a.lastNode, dragProvided = _a.dragProvided, dragSnapshot = _a.dragSnapshot;
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var _c = (0, devs_dt_context_1.useDt)(), columns = _c.columns, keyField = _c.keyField, setDataSource = _c.setDataSource, options = _c.options, formsRef = _c.formsRef, focusedRow = _c.focusedRow, setFocusedRow = _c.setFocusedRow, focusedCell = _c.focusedCell, editCount = _c.editCount, dataSource = _c.dataSource;
    var form = (0, react_hook_form_1.useForm)({
        defaultValues: data,
        mode: "all",
    });
    var control = form.control, register = form.register, handleSubmit = form.handleSubmit, errors = form.formState.errors, setValue = form.setValue, getValues = form.getValues, reset = form.reset, watch = form.watch, trigger = form.trigger;
    var prevRow = react_1.default.useMemo(function () {
        return dataSource[index - 1];
    }, [dataSource[index - 1]]);
    var nextRow = react_1.default.useMemo(function () {
        return dataSource[index + 1];
    }, [dataSource[index + 1]]);
    react_1.default.useEffect(function () {
        if (!Object.keys(formsRef.current).includes(rowKey)) {
            formsRef.current[rowKey] = form;
        }
    }, []);
    react_1.default.useEffect(function () {
        setValue("mode", data.mode);
        setValue("checked", data.checked);
    }, [data.mode, data.checked]);
    var onEditModeClick = function (e) {
        var _a, _b, _c;
        if ((options === null || options === void 0 ? void 0 : options.readonly) === true)
            return;
        if (!((_b = (_a = options === null || options === void 0 ? void 0 : options.rowEditable) === null || _a === void 0 ? void 0 : _a.call(options, { index: index, row: data })) !== null && _b !== void 0 ? _b : true))
            return;
        if (((_c = options === null || options === void 0 ? void 0 : options.onBeforeRowEdit) === null || _c === void 0 ? void 0 : _c.call(options, { index: index, row: data })) === false)
            return;
        if (data.mode === "r" &&
            ((options === null || options === void 0 ? void 0 : options.editType) === undefined || (options === null || options === void 0 ? void 0 : options.editType) === "row")) {
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
                    setDataSource(function (prev) {
                        return prev.map(function (p) {
                            return p.rowId === data.rowId
                                ? __assign(__assign({}, p), { mode: "u", checked: true }) : __assign({}, p);
                        });
                    });
                }
            }
            else {
                setDataSource(function (prev) {
                    return prev.map(function (p) {
                        return p.rowId === data.rowId
                            ? __assign(__assign({}, p), { mode: "u", checked: true }) : __assign({}, p);
                    });
                });
            }
        }
    };
    var GetAutoFocus = react_1.default.useCallback(function (field) {
        var focusabled = false;
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
            var updatables = lastNode.filter(function (x) { return x.updatable === true || x.updatable === undefined; });
            if (updatables.length === 0) {
                return false;
            }
            else {
                return updatables[0].field === field;
            }
        }
        else {
            focusabled = false;
        }
        return focusabled;
    }, [lastNode, data]);
    return ((0, jsx_runtime_1.jsxs)("tr", __assign({ className: "devs-dt-row".concat((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.rowId) === data.rowId ? " devs-dt-focused-row" : "").concat(data.checked === true ? " devs-dt-checked-row" : ""), onSubmit: handleSubmit(function () { }), onDoubleClick: onEditModeClick, onClick: function () { return setFocusedRow(data); }, "data-edit-mode": data.mode, ref: dragProvided.innerRef }, dragProvided.draggableProps, { style: __assign({}, dragProvided.draggableProps.style), css: (0, react_2.css)((_b = options === null || options === void 0 ? void 0 : options.rowStyle) === null || _b === void 0 ? void 0 : _b.call(options, {
            index: index,
            row: data,
            prevRow: prevRow,
            nextRow: nextRow,
        })) }, { children: [(options === null || options === void 0 ? void 0 : options.enabledRowOrder) && ((0, jsx_runtime_1.jsx)(RowChangeOrderCell, { mode: data.mode, dragHandleProps: dragProvided.dragHandleProps })), (options === null || options === void 0 ? void 0 : options.enabledExpand) && ((0, jsx_runtime_1.jsx)(RowExpandCell, { setDataSource: setDataSource, data: data, index: index })), (options === null || options === void 0 ? void 0 : options.showRowNumber) && (0, jsx_runtime_1.jsx)(RowNumberCell, { index: index }), (options === null || options === void 0 ? void 0 : options.enabledRowCheck) && ((0, jsx_runtime_1.jsx)(RowCheckCell, { data: data, checked: data.checked, setDataSource: setDataSource, setValue: setValue, multipleRowCheck: options.multipleRowCheck })), lastNode &&
                lastNode.map(function (col, idx) {
                    var _a, _b, _c;
                    return ((0, jsx_runtime_1.jsx)(devs_dt_cell_1.default, { register: register, control: control, col: col, mode: data.mode, defaultValue: data[col.field], error: errors.hasOwnProperty(col.field), autoFocus: (_b = (_a = col.autoFocus) === null || _a === void 0 ? void 0 : _a.call(col, data.mode)) !== null && _b !== void 0 ? _b : GetAutoFocus(col.field), row: data, setValue: setValue, merge: (_c = data._merge) === null || _c === void 0 ? void 0 : _c[col.field], rowIndex: index, getValue: getValues, trigger: trigger }, "".concat(rowKey, "-").concat(col.field)));
                })] })));
}
exports.default = react_1.default.memo(DevsDtRow);
