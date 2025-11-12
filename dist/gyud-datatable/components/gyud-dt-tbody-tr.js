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
import { useGyudDt } from "../context";
import newStyled from "@emotion/styled";
import GyudDtTd from "./gyud-dt-td";
import { GyudDtRowCheckCell, GyudDtRowNumberCell, } from "./gyud-dt-before-cells";
var GyudDtTbodyTr = function (_a) {
    var index = _a.index, style = _a.style, data = _a.data;
    var _b = useGyudDt(function (state) { return state; }), getLastNodes = _b.getLastNodes, options = _b.options;
    var columns = getLastNodes();
    return (_jsxs(GyudDtTrWrapper, __assign({ className: "gyud-dt-row ".concat(index % 2 === 0 ? "gyud-dt-even-row" : "gyud-dt-odd-row"), style: __assign(__assign({}, style), { width: "max-content" }) }, { children: [options.isShowRowNumber && _jsx(GyudDtRowNumberCell, { index: index }), options.isRowCheckable && _jsx(GyudDtRowCheckCell, {}), columns &&
                columns.map(function (column) { return (_jsx(GyudDtTd, { column: column, rowId: data.rowId, data: data[column.field] }, column.field)); })] }), index));
};
export default React.memo(GyudDtTbodyTr);
var GyudDtTrWrapper = newStyled.tr({
    display: "table-row",
    "&.gyud-dt-odd-row > .gyud-dt-cell": {
        backgroundColor: "#e6e6e6",
    },
    "&.gyud-dt-even-row > .gyud-dt-cell": {
        backgroundColor: "#fff",
    },
    "&:hover > .gyud-dt-td": {
        backgroundColor: "#d1e4ff",
    },
});
