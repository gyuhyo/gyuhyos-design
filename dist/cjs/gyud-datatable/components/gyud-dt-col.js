"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
var GyudDtCol = function (_a) {
    var column = _a.column;
    return ((0, jsx_runtime_1.jsx)(GyudDtColWrapper, { "data-field": column.field, style: {
            width: typeof column.width === "string"
                ? column.width
                : "".concat(column.width || 100, "px"),
        } }, column.field));
};
exports.default = GyudDtCol;
var GyudDtColWrapper = styled_1.default.col({
    display: "table-column",
});
