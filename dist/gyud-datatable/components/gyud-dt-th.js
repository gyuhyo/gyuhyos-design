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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React from "react";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context";
import { setColumnStickyPosition } from "../core";
var GyudDtTh = function (_a) {
    var column = _a.column, rowSpan = _a.rowSpan, colSpan = _a.colSpan, isLastNode = _a.isLastNode;
    var _b = useGyudDt(function (state) { return state; }), tableRef = _b.tableRef, setColumnWidth = _b.setColumnWidth, getLastNodes = _b.getLastNodes, options = _b.options, columns = _b.columns;
    var resizingColumnRef = React.useRef(null);
    var handleMouseMove = React.useCallback(function (e) {
        if (resizingColumnRef.current) {
            var _a = resizingColumnRef.current, startX = _a.startX, startWidth = _a.startWidth;
            var deltaX = e.clientX - startX;
            var newWidth_1 = Math.max(startWidth + deltaX, 100);
            if (tableRef === null || tableRef === void 0 ? void 0 : tableRef.current) {
                setColumnStickyPosition({
                    tableRef: tableRef.current,
                    lastNodes: getLastNodes(),
                    field: column.field,
                    options: options,
                });
                resizingColumnRef.current.newWidth = newWidth_1;
                var cols = tableRef.current.querySelectorAll("[data-field=\"".concat(column.field, "\"]"));
                if (cols) {
                    cols.forEach(function (col) {
                        col.style.width = "".concat(newWidth_1, "px");
                    });
                }
            }
        }
    }, [tableRef]);
    var handleMouseUp = React.useCallback(function () {
        var _a, _b;
        setColumnWidth(column.field, (_b = (_a = resizingColumnRef.current) === null || _a === void 0 ? void 0 : _a.newWidth) !== null && _b !== void 0 ? _b : 100);
        resizingColumnRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);
    var handleMouseDown = React.useCallback(function (e) {
        var _a, _b, _c, _d;
        resizingColumnRef.current = {
            startX: e.clientX,
            startWidth: (_b = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) !== null && _b !== void 0 ? _b : 100,
            newWidth: (_d = (_c = e.currentTarget.parentElement) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width) !== null && _d !== void 0 ? _d : 100,
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [tableRef, handleMouseUp]);
    var getStickyPosition = React.useMemo(function () {
        if (!column.sticky ||
            !getLastNodes()
                .filter(function (f) { return f.sticky; })
                .includes(column))
            return 0;
        var lastNodes = getLastNodes().filter(function (f) { return f.sticky; });
        var index = lastNodes.indexOf(column);
        var offsetLeft = 0;
        if (options.isShowRowNumber)
            offsetLeft += 55;
        if (options.isRowCheckable)
            offsetLeft += 25;
        offsetLeft += lastNodes.slice(0, index).reduce(function (acc, node) {
            var width = typeof node.width === "number"
                ? node.width
                : parseInt(node.width);
            return acc + width;
        }, 0);
        return offsetLeft;
    }, [column.sticky, getLastNodes, options, columns]);
    return (_jsx(GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell", rowSpan: rowSpan, colSpan: colSpan, "data-is-last-node": isLastNode, "data-is-last-sticky-col": column.isLastStickyCol, "data-field": column.field, style: {
            position: column.sticky ? "sticky" : "relative",
            left: column.sticky ? getStickyPosition : "auto",
            width: "".concat(column.width || 100, "px"),
            zIndex: column.sticky ? 2 : 1,
        } }, { children: _jsxs(GyudDtThCotent, { children: [column.title, isLastNode && (_jsx(GyudDtThResizeHandle, { className: "gyud-dt-th-resize-handle", onMouseDown: handleMouseDown }))] }) }), column.field));
};
export default React.memo(GyudDtTh);
export var GyudDtThWrapper = newStyled.th({
    display: "table-cell",
    height: "40px",
    background: "linear-gradient(180deg, #f0f0f0, #d9d9d9)",
    zIndex: 2,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    padding: 0,
    "&[data-is-last-node='true']:hover": {
        background: "linear-gradient(180deg, #e5e5e5, #cccccc) !important",
    },
    ":has(.gyud-dt-th-resize-handle:hover)": {
        borderInlineEndColor: "#b7b7b7",
    },
});
export var GyudDtThCotent = newStyled.div({
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
export var GyudDtThResizeHandle = newStyled.div({
    position: "absolute",
    right: 0,
    top: 0,
    width: "5px",
    height: "100%",
    background: "transparent",
    cursor: "col-resize",
    "&:hover": {
        background: "#b7b7b7",
    },
});
