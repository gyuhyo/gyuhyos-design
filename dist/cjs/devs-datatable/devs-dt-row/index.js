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
var react_hook_form_1 = require("react-hook-form");
var devs_dt_context_1 = require("../context/devs-dt-context");
var devs_dt_cell_1 = __importDefault(require("../devs-dt-cell"));
var RowNumberCell = function (_a) {
    var index = _a.index;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-index-cell", style: { "--width": "50px" } }, { children: index + 1 })));
};
var RowCheckCell = function (_a) {
    var data = _a.data, checked = _a.checked, setDataSource = _a.setDataSource, setValue = _a.setValue;
    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-sticky-col", style: { "--width": "30px" } }, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked || false, onChange: function () {
                setValue("checked", !checked);
                setDataSource(function (prev) {
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
function DevsDtRow(_a) {
    var data = _a.data, index = _a.index, rowKey = _a.rowKey, lastNode = _a.lastNode, dragProvided = _a.dragProvided, dragSnapshot = _a.dragSnapshot;
    var _b = (0, devs_dt_context_1.useDt)(), columns = _b.columns, keyField = _b.keyField, setDataSource = _b.setDataSource, options = _b.options, formsRef = _b.formsRef, focusedRow = _b.focusedRow, setFocusedRow = _b.setFocusedRow, focusedCell = _b.focusedCell;
    var form = (0, react_hook_form_1.useForm)({
        defaultValues: data,
    });
    var control = form.control, register = form.register, handleSubmit = form.handleSubmit, errors = form.formState.errors, setValue = form.setValue, reset = form.reset;
    react_1.default.useEffect(function () {
        if (!Object.keys(formsRef.current).includes(rowKey)) {
            formsRef.current[rowKey] = form;
        }
    }, []);
    react_1.default.useEffect(function () {
        setValue("mode", data.mode);
        setValue("checked", data.checked);
    }, [data.mode, data.checked]);
    var onEditModeClick = function () {
        if ((options === null || options === void 0 ? void 0 : options.readonly) === true)
            return;
        if (data.mode === "r") {
            setDataSource(function (prev) {
                return prev.map(function (p) {
                    return p.rowId === data.rowId
                        ? __assign(__assign({}, p), { mode: "u", checked: true }) : __assign({}, p);
                });
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("tr", __assign({ className: "devs-dt-row".concat(focusedRow === data ? " devs-dt-focused-row" : "").concat(data.checked === true ? " devs-dt-checked-row" : ""), onSubmit: handleSubmit(function () { }), onDoubleClick: onEditModeClick, onClick: function () { return setFocusedRow(data); }, "data-edit-mode": data.mode, ref: dragProvided.innerRef }, dragProvided.draggableProps, { style: __assign({}, dragProvided.draggableProps.style) }, { children: [(options === null || options === void 0 ? void 0 : options.enabledRowOrder) && ((0, jsx_runtime_1.jsx)(RowChangeOrderCell, { mode: data.mode, dragHandleProps: dragProvided.dragHandleProps })), (options === null || options === void 0 ? void 0 : options.showRowNumber) && (0, jsx_runtime_1.jsx)(RowNumberCell, { index: index }), (options === null || options === void 0 ? void 0 : options.enabledRowCheck) && ((0, jsx_runtime_1.jsx)(RowCheckCell, { data: data, checked: data.checked, setDataSource: setDataSource, setValue: setValue })), lastNode &&
                lastNode.map(function (col, index) {
                    var _a;
                    var autoFocus = false;
                    var editables = lastNode.filter(function (x) { return x.editable === true || x.editable === undefined; });
                    var updatables = lastNode.filter(function (x) { return x.updatable === true || x.updatable === undefined; });
                    var myEditableIndex = editables.findIndex(function (x) { return x.field === col.field; });
                    var myUpdatableIndex = updatables.findIndex(function (x) { return x.field === col.field; });
                    if (data.mode === "c") {
                        autoFocus = !myEditableIndex;
                    }
                    else if (data.mode === "u") {
                        autoFocus = !myUpdatableIndex;
                    }
                    else {
                        autoFocus = false;
                    }
                    return ((0, jsx_runtime_1.jsx)(devs_dt_cell_1.default, { register: register, control: control, col: col, mode: data.mode, defaultValue: data[col.field], error: errors.hasOwnProperty(col.field), autoFocus: myEditableIndex === 0 || myUpdatableIndex === 0, row: data, merge: (_a = data._merge) === null || _a === void 0 ? void 0 : _a[col.field] }, "".concat(rowKey, "-").concat(col.field)));
                })] })));
}
exports.default = react_1.default.memo(DevsDtRow);
