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
var react_1 = __importDefault(require("react"));
var styled_1 = __importDefault(require("@emotion/styled"));
var context_1 = require("../context");
var GyudDtTd = function (_a) {
    var column = _a.column, rowId = _a.rowId, data = _a.data;
    var _b = __read(react_1.default.useState(false), 2), onLoad = _b[0], setOnLoad = _b[1];
    var tdRef = react_1.default.useRef(null);
    var _c = (0, context_1.useGyudDt)(function (state) { return state; }), setFocusedCell = _c.setFocusedCell, focusedCell = _c.focusedCell, setDataSource = _c.setDataSource, columns = _c.columns;
    var isFocused = react_1.default.useMemo(function () { return focusedCell.rowId === rowId && focusedCell.field === column.field; }, [focusedCell, rowId, column.field]);
    var isRowFocused = react_1.default.useMemo(function () { return focusedCell.rowId === rowId; }, [focusedCell, rowId]);
    var getStickyPosition = react_1.default.useMemo(function () {
        if (!tdRef.current || !column.sticky)
            return 0;
        var parent = tdRef.current.parentElement;
        var index = Array.from((parent === null || parent === void 0 ? void 0 : parent.children) || []).indexOf(tdRef.current);
        var offsetLeft = 0;
        for (var i = 0; i < index; i++) {
            var child = parent === null || parent === void 0 ? void 0 : parent.children[i];
            if ((child === null || child === void 0 ? void 0 : child.classList.contains("gyud-dt-sticky-col")) ||
                child.style.getPropertyValue("position") === "sticky") {
                offsetLeft += child.getBoundingClientRect().width || 0;
            }
        }
        return offsetLeft;
    }, [column.sticky, onLoad]);
    return ((0, jsx_runtime_1.jsx)(GyudDtTdWrapper, __assign({ ref: function (e) {
            if (onLoad || !e)
                return;
            tdRef.current = e;
            setOnLoad(true);
        }, className: "gyud-dt-td gyud-dt-cell", "data-field": column.field, "data-is-cell-focused": isFocused, "data-is-last-sticky-col": column.isLastStickyCol, "data-is-row-focused": isRowFocused, style: {
            position: column.sticky ? "sticky" : "relative",
            left: column.sticky ? getStickyPosition : "auto",
            width: "".concat(column.width || 100, "px"),
            zIndex: column.sticky ? 1 : 0,
        }, onClick: function (e) {
            setFocusedCell({ rowId: rowId, field: column.field });
        }, onDoubleClick: function (e) {
            setDataSource(function (prev) {
                return prev.map(function (p) {
                    var _a;
                    return p.rowId === rowId ? __assign(__assign({}, p), (_a = { mode: "u" }, _a[column.field] = "123", _a)) : p;
                });
            });
        } }, { children: (0, jsx_runtime_1.jsx)(GyudDtTdContent, __assign({ className: "gyud-dt-td-content" }, { children: data })) }), column.field));
};
exports.default = GyudDtTd;
var GyudDtTdContent = styled_1.default.div({
    position: "relative",
    width: "100%",
    height: "100%",
    alignContent: "center",
    padding: "0px 3px",
});
var GyudDtTdWrapper = styled_1.default.td({
    display: "table-cell",
    "&[data-is-row-focused='true']": {
        backgroundColor: "#8fffe2 !important",
    },
    "&[data-is-cell-focused='true']": {
        "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "1px dashed blue",
        },
    },
});
