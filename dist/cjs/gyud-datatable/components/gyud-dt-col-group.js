"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
var context_1 = require("../context");
var gyud_dt_col_1 = __importDefault(require("./gyud-dt-col"));
var GyudDtColGroup = function () {
    var _a = (0, context_1.useGyudDt)(function (state) { return state; }), getLastNodes = _a.getLastNodes, options = _a.options;
    var columns = getLastNodes();
    return ((0, jsx_runtime_1.jsxs)(GyudDtColGroupWrapper, { children: [options.isShowRowNumber && ((0, jsx_runtime_1.jsx)(gyud_dt_col_1.default, { column: { field: "rowNumber", title: "Row Number", width: 55 } })), options.isRowCheckable && ((0, jsx_runtime_1.jsx)(gyud_dt_col_1.default, { column: { field: "rowCheck", title: "Row Check", width: 25 } })), columns.map(function (column) { return ((0, jsx_runtime_1.jsx)(gyud_dt_col_1.default, { column: column }, column.field)); }), (0, jsx_runtime_1.jsx)(gyud_dt_col_1.default, { column: { field: "empty-cell", title: "", width: "100%" } })] }));
};
exports.default = GyudDtColGroup;
var GyudDtColGroupWrapper = styled_1.default.colgroup({
    display: "table-column-group",
});
