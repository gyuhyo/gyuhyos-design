"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var data_render_1 = __importDefault(require("./data-render"));
var text_input_1 = __importDefault(require("./text-input"));
var number_input_1 = __importDefault(require("./number-input"));
var date_input_1 = __importDefault(require("./date-input"));
var date_time_input_1 = __importDefault(require("./date-time-input"));
var select_input_1 = __importDefault(require("./select-input"));
var text_area_input_1 = __importDefault(require("./text-area-input"));
var data_editor_1 = __importDefault(require("./data-editor"));
var DataFormItemRenderer = react_1.default.memo(function (_a) {
    var focusedRow = _a.focusedRow, node = _a.node;
    var isNotUpdate = ((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "r" || (focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "u") &&
        node.updatable === false;
    var isNotInsert = ((focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "r" || (focusedRow === null || focusedRow === void 0 ? void 0 : focusedRow.mode) === "c") &&
        node.editable === false;
    var isNotEditing = isNotUpdate || isNotInsert;
    var isRender = node.render !== undefined;
    if (isNotEditing) {
        return isRender ? (0, jsx_runtime_1.jsx)(data_render_1.default, { col: node }) : focusedRow[node.field];
    }
    if (node.editor !== undefined)
        return (0, jsx_runtime_1.jsx)(data_editor_1.default, { col: node });
    if (node.type === undefined)
        return (0, jsx_runtime_1.jsx)(text_input_1.default, { col: node });
    if (node.type === "number")
        return (0, jsx_runtime_1.jsx)(number_input_1.default, { col: node });
    if (node.type === "date")
        return (0, jsx_runtime_1.jsx)(date_input_1.default, { col: node });
    if (node.type === "datetime")
        return (0, jsx_runtime_1.jsx)(date_time_input_1.default, { col: node });
    if (node.type === "select")
        return (0, jsx_runtime_1.jsx)(select_input_1.default, { col: node });
    if (node.type === "textarea")
        return (0, jsx_runtime_1.jsx)(text_area_input_1.default, { col: node });
});
exports.default = DataFormItemRenderer;
