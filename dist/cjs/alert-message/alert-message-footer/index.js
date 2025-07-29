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
var React = __importStar(require("react"));
var button_1 = __importDefault(require("../../button"));
var alertMessageFooter = (0, react_1.css)({
    padding: 12,
    display: "flex",
    flexDirection: "row",
    columnGap: 22,
    justifyContent: "space-between",
    alignItems: "center",
});
var AlertMessageFooter = React.memo(function (_a) {
    var footerStart = _a.footerStart, isOkButtonVisible = _a.isOkButtonVisible, onOkClick = _a.onOkClick, okCaption = _a.okCaption, closeAlert = _a.closeAlert, isCancelButtonVisible = _a.isCancelButtonVisible, onCancelClick = _a.onCancelClick, cancelCaption = _a.cancelCaption, value = _a.value, input = _a.input;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: alertMessageFooter, className: "alert-message-footer" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "alert-message-footer-left" }, { children: footerStart })), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 7,
                }), className: "alert-message-footer-right" }, { children: [isOkButtonVisible && ((0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#1f619d", border: true, borderColor: "#1f619d", color: "#fff", onClick: function (e) {
                            if (onOkClick) {
                                var next = onOkClick(value);
                                if (typeof next === "boolean" && !next)
                                    return;
                            }
                            closeAlert();
                        } }, { children: okCaption }))), isCancelButtonVisible && ((0, jsx_runtime_1.jsx)(button_1.default, __assign({ border: true, onClick: function (e) {
                            if (onCancelClick) {
                                onCancelClick(e);
                            }
                            closeAlert();
                        } }, { children: cancelCaption })))] }))] })));
});
exports.default = AlertMessageFooter;
