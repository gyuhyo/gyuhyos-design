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
var context_1 = require("../context");
var styled_1 = __importDefault(require("@emotion/styled"));
var gyud_dt_td_1 = __importDefault(require("./gyud-dt-td"));
var gyud_dt_before_cells_1 = require("./gyud-dt-before-cells");
var GyudDtTbodyTr = function (_a) {
    var index = _a.index, style = _a.style, data = _a.data;
    var _b = (0, context_1.useGyudDt)(function (state) { return state; }), getLastNodes = _b.getLastNodes, options = _b.options;
    var columns = getLastNodes();
    return ((0, jsx_runtime_1.jsxs)(GyudDtTrWrapper, __assign({ className: "gyud-dt-row ".concat(index % 2 === 0 ? "gyud-dt-even-row" : "gyud-dt-odd-row"), style: __assign(__assign({}, style), { width: "max-content" }) }, { children: [options.isShowRowNumber && (0, jsx_runtime_1.jsx)(gyud_dt_before_cells_1.GyudDtRowNumberCell, { index: index }), options.isRowCheckable && (0, jsx_runtime_1.jsx)(gyud_dt_before_cells_1.GyudDtRowCheckCell, {}), columns &&
                columns.map(function (column) { return ((0, jsx_runtime_1.jsx)(gyud_dt_td_1.default, { column: column, rowId: data.rowId, data: data[column.field] }, column.field)); })] }), index));
};
exports.default = react_1.default.memo(GyudDtTbodyTr);
var GyudDtTrWrapper = styled_1.default.tr({
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
