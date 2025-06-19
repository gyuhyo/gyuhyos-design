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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var styled_1 = __importDefault(require("@emotion/styled"));
var React = __importStar(require("react"));
var alertMessageBody = (0, react_1.css)({
    flex: "1 1 0%",
    padding: 12,
    borderBottom: "1px solid #ccc",
    alignContent: "center",
});
var AlertMessageBody = React.memo(function (_a) {
    var message = _a.message, input = _a.input, inputOption = _a.inputOption, value = _a.value, setValue = _a.setValue;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: alertMessageBody }, { children: [typeof message === "string" ? ((0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({ whiteSpace: "pre-wrap" }) }, { children: message }))) : (message), input && ((0, jsx_runtime_1.jsx)(InputBox, { children: (0, jsx_runtime_1.jsx)(Input, __assign({ value: value, onChange: function (e) { return setValue(e.target.value); } }, inputOption)) }))] })));
});
var InputBox = styled_1.default.div({
    marginTop: 12,
});
var Input = styled_1.default.input({
    width: "100%",
    height: 30,
    maxWidth: 400,
    border: "1px solid #ddd",
    padding: "14px 7px",
    marginTop: 3,
});
exports.default = AlertMessageBody;
