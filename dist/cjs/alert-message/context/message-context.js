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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessage = exports.MessageProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = __importStar(require("react"));
var __1 = __importDefault(require(".."));
var MessageContext = (0, react_1.createContext)(undefined);
exports.MessageProvider = react_1.default.memo(function (_a) {
    var children = _a.children;
    var _b = __read((0, react_1.useState)([]), 2), messages = _b[0], setMessages = _b[1];
    var showMessage = function (props) {
        return new Promise(function (resolve) {
            setMessages(function (prev) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return __spreadArray(__spreadArray([], __read(prev), false), [
                    {
                        alertID: Date.now().toString(),
                        type: (_a = props.type) !== null && _a !== void 0 ? _a : "default",
                        title: (_b = props.title) !== null && _b !== void 0 ? _b : "메시지",
                        message: props.message,
                        okCaption: (_c = props.okCaption) !== null && _c !== void 0 ? _c : "확인",
                        cancelCaption: (_d = props.cancelCaption) !== null && _d !== void 0 ? _d : "취소",
                        isOkButtonVisible: (_e = props.isOkButtonVisible) !== null && _e !== void 0 ? _e : true,
                        onOkClick: function (e) {
                            if (props.onOkClick)
                                props.onOkClick(e);
                            resolve(true); // 확인 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        isCancelButtonVisible: (_f = props.isCancelButtonVisible) !== null && _f !== void 0 ? _f : true,
                        onCancelClick: function (e) {
                            if (props.onCancelClick)
                                props.onCancelClick(e);
                            resolve(false); // 취소 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        isCloseButtonVisible: (_g = props.isCloseButtonVisible) !== null && _g !== void 0 ? _g : true,
                        onCloseClick: function (e) {
                            if (props.onCloseClick)
                                props.onCloseClick(e);
                            resolve(false); // 닫기 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        footerStart: (_h = props.footerStart) !== null && _h !== void 0 ? _h : undefined,
                        duration: props.duration,
                    },
                ], false);
            });
        });
    };
    var removeMessage = function (alertID) {
        setMessages(function (current) { return current.filter(function (m) { return m.alertID !== alertID; }); });
    };
    return ((0, jsx_runtime_1.jsxs)(MessageContext.Provider, __assign({ value: { showMessage: showMessage } }, { children: [children, messages.map(function (msg) { return ((0, jsx_runtime_1.jsx)(__1.default, { setIsShow: function (isVisible) {
                    if (!isVisible) {
                        setMessages(function (current) {
                            return current.filter(function (m) { return m.alertID !== msg.alertID; });
                        });
                    }
                }, type: msg.type, title: msg.title, message: msg.message, okCaption: msg.okCaption, cancelCaption: msg.cancelCaption, isOkButtonVisible: msg.isOkButtonVisible, onOkClick: msg.onOkClick, isCancelButtonVisible: msg.isCancelButtonVisible, onCancelClick: msg.onCancelClick, isCloseButtonVisible: msg.isCancelButtonVisible, onCloseClick: msg.onCloseClick, footerStart: msg.footerStart, duration: msg.duration }, msg.alertID)); })] })));
});
var useMessage = function () {
    var context = (0, react_1.useContext)(MessageContext);
    if (!context) {
        throw new Error("message must be used within a MessageProvider");
    }
    return context;
};
exports.useMessage = useMessage;
