"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var alert_message_body_1 = __importDefault(require("./alert-message-body"));
var alert_message_footer_1 = __importDefault(require("./alert-message-footer"));
var alert_message_header_1 = __importDefault(require("./alert-message-header"));
var backdrop = (0, react_1.css)({
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    visibility: "visible",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(0, 0, 0, 0.5)",
    opacity: 0,
    backdropFilter: "blur(3px)",
    zIndex: 3,
    transition: "backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out",
});
var visibleAlert = (0, react_1.css)({
    opacity: 1,
    visibility: "visible",
    transition: "opacity 200ms ease-in-out",
});
var hiddenAlert = (0, react_1.css)({
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 200ms ease-in-out, visibility 0ms ease-in-out 200ms",
});
var wrapperOpenKeyframe = (0, react_1.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    0% {\n        transform: scale(0);\n        opacity: 0;\n    }\n\n    100% {\n        transform: scale(1);\n        opacity: 1;\n    }\n"], ["\n    0% {\n        transform: scale(0);\n        opacity: 0;\n    }\n\n    100% {\n        transform: scale(1);\n        opacity: 1;\n    }\n"])));
var wrapperCloseKeyframe = (0, react_1.keyframes)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    0% {\n        transform: scale(1);\n        opacity: 1;\n    }\n\n    100% {\n        transform: scale(0);\n        opacity: 0;\n    }\n"], ["\n    0% {\n        transform: scale(1);\n        opacity: 1;\n    }\n\n    100% {\n        transform: scale(0);\n        opacity: 0;\n    }\n"])));
var alertMessageWrapper = (0, react_1.css)({
    minWidth: 300,
    maxWidth: 400,
    minHeight: 150,
    background: "rgb(255, 255, 255)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    animation: "".concat(wrapperOpenKeyframe, " 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards"),
    boxShadow: "5px 5px 11px rgba(0, 0, 0, 0.2), -5px -5px 11px rgba(0, 0, 0, 0.2)",
});
var alertmessageWrapperClose = (0, react_1.css)({
    animation: "".concat(wrapperCloseKeyframe, " 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards"),
});
var AlertMessage = function (props) {
    var _a = React.useState(true), isShowState = _a[0], setIsShowState = _a[1];
    var setIsShow = props.setIsShow, type = props.type, title = props.title, message = props.message, okCaption = props.okCaption, cancelCaption = props.cancelCaption, isOkButtonVisible = props.isOkButtonVisible, onOkClick = props.onOkClick, isCancelButtonVisible = props.isCancelButtonVisible, onCancelClick = props.onCancelClick, isCloseButtonVisible = props.isCloseButtonVisible, onCloseClick = props.onCloseClick, footerStart = props.footerStart;
    var closeAlert = function () {
        setIsShowState(false);
        var timer = setTimeout(function () {
            setIsShow(false);
        }, 500);
        return function () { return clearTimeout(timer); };
    };
    React.useEffect(function () {
        if (typeof window === undefined)
            return;
        document.activeElement.blur();
        var closeKeyDownPopup = function (e) {
            if (e.key === "Enter")
                closeAlert();
        };
        window.addEventListener("keydown", closeKeyDownPopup);
        return function () {
            window.removeEventListener("keydown", closeKeyDownPopup);
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: [backdrop, isShowState ? visibleAlert : hiddenAlert] }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ css: [
                alertMessageWrapper,
                isShowState ? undefined : alertmessageWrapperClose,
            ] }, { children: [(0, jsx_runtime_1.jsx)(alert_message_header_1.default, { type: type, title: title, isCloseButtonVisible: isCloseButtonVisible, onCloseClick: onCloseClick, closeAlert: closeAlert }), (0, jsx_runtime_1.jsx)(alert_message_body_1.default, { message: message }), (0, jsx_runtime_1.jsx)(alert_message_footer_1.default, { footerStart: footerStart, isOkButtonVisible: isOkButtonVisible, onOkClick: onOkClick, okCaption: okCaption, closeAlert: closeAlert, isCancelButtonVisible: isCancelButtonVisible, onCancelClick: onCancelClick, cancelCaption: cancelCaption })] })) })));
};
exports.default = React.memo(AlertMessage);
var templateObject_1, templateObject_2;
