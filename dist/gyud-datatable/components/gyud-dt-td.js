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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context";
var GyudDtTd = function (_a) {
    var column = _a.column, rowId = _a.rowId, data = _a.data;
    var _b = __read(React.useState(false), 2), onLoad = _b[0], setOnLoad = _b[1];
    var tdRef = React.useRef(null);
    var _c = useGyudDt(function (state) { return state; }), setFocusedCell = _c.setFocusedCell, focusedCell = _c.focusedCell, setDataSource = _c.setDataSource, columns = _c.columns;
    var isFocused = React.useMemo(function () { return focusedCell.rowId === rowId && focusedCell.field === column.field; }, [focusedCell, rowId, column.field]);
    var isRowFocused = React.useMemo(function () { return focusedCell.rowId === rowId; }, [focusedCell, rowId]);
    var getStickyPosition = React.useMemo(function () {
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
    return (_jsx(GyudDtTdWrapper, __assign({ ref: function (e) {
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
        } }, { children: _jsx(GyudDtTdContent, __assign({ className: "gyud-dt-td-content" }, { children: data })) }), column.field));
};
export default GyudDtTd;
var GyudDtTdContent = newStyled.div({
    position: "relative",
    width: "100%",
    height: "100%",
    alignContent: "center",
    padding: "0px 3px",
});
var GyudDtTdWrapper = newStyled.td({
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
