"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var DataRender = react_1.default.memo(function (_a) {
    var col = _a.col;
    var _b = (0, devs_dt_context_1.useDt)(), row = _b.focusedRow, dataSource = _b.dataSource, focusedRowForm = _b.focusedRowForm;
    var defaultValue = row === null || row === void 0 ? void 0 : row[col.field];
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return col.render({
        value: defaultValue,
        row: row,
        index: rowIndex,
        getValue: focusedRowForm.getValues,
        watch: focusedRowForm.watch,
    });
});
exports.default = DataRender;
