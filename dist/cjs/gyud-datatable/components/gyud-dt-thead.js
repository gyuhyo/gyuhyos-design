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
var styled_1 = __importDefault(require("@emotion/styled"));
var context_1 = require("../context");
var gyud_dt_thead_tr_1 = __importDefault(require("./gyud-dt-thead-tr"));
var gyud_dt_th_1 = __importDefault(require("./gyud-dt-th"));
var gyud_dt_before_cells_1 = require("./gyud-dt-before-cells");
var GyudTheadTrInner = react_1.default.memo(function (_a) {
    var children = _a.children, depth = _a.depth;
    var options = (0, context_1.useGyudDt)(function (state) { return state; }).options;
    return ((0, jsx_runtime_1.jsxs)(gyud_dt_thead_tr_1.default, { children: [depth === 1 && options.isShowRowNumber && ((0, jsx_runtime_1.jsx)(gyud_dt_before_cells_1.GyudDtRowNumberHeaderCell, {})), depth === 1 && options.isRowCheckable && (0, jsx_runtime_1.jsx)(gyud_dt_before_cells_1.GyudDtRowCheckHeaderCell, {}), children, depth === 1 && (0, jsx_runtime_1.jsx)(gyud_dt_before_cells_1.GyudDtEmptyHeaderCell, {})] }, depth));
});
var GyudDtThead = function () {
    var _a = (0, context_1.useGyudDt)(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, getFlatColumns = _a.getFlatColumns, getLastNodes = _a.getLastNodes, scrollOffset = _a.scrollOffset, setTheadRef = _a.setTheadRef;
    var maxDepth = getMaxDepth();
    var columns = getFlatColumns();
    var lastNodes = getLastNodes();
    var genRows = react_1.default.useCallback(function (columns) {
        return Array.from({ length: maxDepth }, function (_, depth) { return depth + 1; }).map(function (depth) { return ((0, jsx_runtime_1.jsx)(GyudTheadTrInner, __assign({ depth: depth }, { children: columns &&
                columns
                    .filter(function (column) { return column.depth === depth; })
                    .map(function (column) { return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.default, { column: column, rowSpan: column.rowSpan || 1, colSpan: column.colSpan || 1, isLastNode: lastNodes.includes(column) }, column.field)); }) }), depth)); });
    }, [columns, maxDepth]);
    return ((0, jsx_runtime_1.jsx)(GyudDtTHead, __assign({ className: "gyud-dt-thead", scrollOffset: scrollOffset, ref: function (ref) { return setTheadRef(ref); } }, { children: genRows(columns).map(function (row) { return row; }) })));
};
exports.default = GyudDtThead;
var GyudDtTHead = styled_1.default.thead(function (_a) {
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
