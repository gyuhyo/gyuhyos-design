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
import GyudDtTheadTr from "./gyud-dt-thead-tr";
import GyudDtTh from "./gyud-dt-th";
import { GyudDtEmptyHeaderCell, GyudDtRowCheckHeaderCell, GyudDtRowNumberHeaderCell, } from "./gyud-dt-before-cells";
var GyudTheadTrInner = React.memo(function (_a) {
    var children = _a.children, depth = _a.depth;
    var options = useGyudDt(function (state) { return state; }).options;
    return (_jsxs(GyudDtTheadTr, { children: [depth === 1 && options.isShowRowNumber && (_jsx(GyudDtRowNumberHeaderCell, {})), depth === 1 && options.isRowCheckable && _jsx(GyudDtRowCheckHeaderCell, {}), children, depth === 1 && _jsx(GyudDtEmptyHeaderCell, {})] }, depth));
});
var GyudDtThead = function () {
    var _a = useGyudDt(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, getFlatColumns = _a.getFlatColumns, getLastNodes = _a.getLastNodes, scrollOffset = _a.scrollOffset, setTheadRef = _a.setTheadRef;
    var maxDepth = getMaxDepth();
    var columns = getFlatColumns();
    var lastNodes = getLastNodes();
    var genRows = React.useCallback(function (columns) {
        return Array.from({ length: maxDepth }, function (_, depth) { return depth + 1; }).map(function (depth) { return (_jsx(GyudTheadTrInner, __assign({ depth: depth }, { children: columns &&
                columns
                    .filter(function (column) { return column.depth === depth; })
                    .map(function (column) { return (_jsx(GyudDtTh, { column: column, rowSpan: column.rowSpan || 1, colSpan: column.colSpan || 1, isLastNode: lastNodes.includes(column) }, column.field)); }) }), depth)); });
    }, [columns, maxDepth]);
    return (_jsx(GyudDtTHead, __assign({ className: "gyud-dt-thead", scrollOffset: scrollOffset, ref: function (ref) { return setTheadRef(ref); } }, { children: genRows(columns).map(function (row) { return row; }) })));
};
export default GyudDtThead;
var GyudDtTHead = newStyled.thead(function (_a) {
    var scrollOffset = _a.scrollOffset;
    return ({
        display: "table-header-group",
        position: "sticky",
        top: 0,
        boxShadow: scrollOffset > 0 ? "0px 5px 12px #00000050" : "none",
        zIndex: 2,
        transition: "box-shadow 200ms ease-in-out",
    });
});
