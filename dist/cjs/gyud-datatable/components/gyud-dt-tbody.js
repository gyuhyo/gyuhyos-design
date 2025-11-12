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
var styled_1 = __importDefault(require("@emotion/styled"));
var gyud_dt_context_1 = require("../context/gyud-dt-context");
var GyudDtTBody = function (_a) {
    var children = _a.children;
    var tbodyRef = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }).tbodyRef;
    return (0, jsx_runtime_1.jsx)(GyudDtTBodyWrapper, __assign({ ref: tbodyRef }, { children: children }));
};
exports.default = GyudDtTBody;
var GyudDtTBodyWrapper = styled_1.default.tbody({
    position: "relative",
    display: "table-row-group",
    height: "100%",
    width: "100%",
});
