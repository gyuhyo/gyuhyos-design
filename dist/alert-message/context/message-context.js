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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import React, { createContext, useContext, useState } from "react";
import AlertMessage from "..";
import { useGyudAccess } from "../../access-context";
import ToastMessage from "../toast-message";
import styled from "@emotion/styled";
var MessageContext = createContext(undefined);
export var MessageProvider = React.memo(function (_a) {
    var children = _a.children;
    var isAccess = useGyudAccess();
    var _b = __read(useState([]), 2), messages = _b[0], setMessages = _b[1];
    var _c = __read(useState([]), 2), toastMessages = _c[0], setToastMessages = _c[1];
    var showMessage = function (props) {
        return new Promise(function (resolve) {
            setMessages(function (prev) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return __spreadArray(__spreadArray([], __read(prev), false), [
                    {
                        alertID: Date.now().toString(),
                        type: (_a = props.type) !== null && _a !== void 0 ? _a : "default",
                        title: (_b = props.title) !== null && _b !== void 0 ? _b : "메시지",
                        message: props.message,
                        okCaption: (_c = props.okCaption) !== null && _c !== void 0 ? _c : "확인",
                        cancelCaption: (_d = props.cancelCaption) !== null && _d !== void 0 ? _d : "취소",
                        isOkButtonVisible: (_e = props.isOkButtonVisible) !== null && _e !== void 0 ? _e : true,
                        input: (_f = props.input) !== null && _f !== void 0 ? _f : false,
                        inputOption: (_g = props.inputOption) !== null && _g !== void 0 ? _g : {},
                        onOkClick: function (e) {
                            if (props.onOkClick)
                                props.onOkClick(e);
                            resolve(true); // 확인 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        isCancelButtonVisible: (_h = props.isCancelButtonVisible) !== null && _h !== void 0 ? _h : true,
                        onCancelClick: function (e) {
                            if (props.onCancelClick)
                                props.onCancelClick(e);
                            resolve(false); // 취소 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        isCloseButtonVisible: (_j = props.isCloseButtonVisible) !== null && _j !== void 0 ? _j : true,
                        onCloseClick: function (e) {
                            if (props.onCloseClick)
                                props.onCloseClick(e);
                            resolve(false); // 닫기 버튼 클릭 시 Promise 해결
                            removeMessage(Date.now().toString());
                        },
                        footerStart: (_k = props.footerStart) !== null && _k !== void 0 ? _k : undefined,
                        duration: props.duration,
                    },
                ], false);
            });
        });
    };
    var removeMessage = function (alertID) {
        setMessages(function (current) { return current.filter(function (m) { return m.alertID !== alertID; }); });
    };
    var showToastMessage = function (props) {
        setToastMessages(function (prev) {
            var _a, _b, _c, _d, _e, _f;
            var align = (_a = props.align) !== null && _a !== void 0 ? _a : "topRight";
            return __spreadArray([
                {
                    id: Date.now().toString(),
                    length: 1,
                    type: (_b = props.type) !== null && _b !== void 0 ? _b : "info",
                    align: align,
                    title: (_c = props.title) !== null && _c !== void 0 ? _c : "",
                    message: (_d = props.message) !== null && _d !== void 0 ? _d : "",
                    duration: (_e = props.duration) !== null && _e !== void 0 ? _e : 3000,
                    startAt: Date.now(),
                    endAt: Date.now() + ((_f = props.duration) !== null && _f !== void 0 ? _f : 3000),
                    removeToastMessage: function (alertId) { return removeToastMessage(alertId); },
                }
            ], __read(prev.map(function (p) { return (__assign(__assign({}, p), { length: p.length + 1 })); })), false);
        });
    };
    var removeToastMessage = function (alertID) {
        setToastMessages(function (current) {
            var filtered = current.filter(function (m) { return m.id !== alertID; });
            return filtered.map(function (x) { return (__assign(__assign({}, x), { length: filtered.indexOf(x) + 1 })); });
        });
    };
    if (isAccess && !isAccess.result) {
        throw new Error("You do not have permission to use package 'gyud'.");
    }
    return (_jsxs(MessageContext.Provider, __assign({ value: { showMessage: showMessage, showToastMessage: showToastMessage } }, { children: [children, messages.map(function (msg) { return (_jsx(AlertMessage, { setIsShow: function (isVisible) {
                    if (!isVisible) {
                        setMessages(function (current) {
                            return current.filter(function (m) { return m.alertID !== msg.alertID; });
                        });
                    }
                }, type: msg.type, title: msg.title, message: msg.message, okCaption: msg.okCaption, cancelCaption: msg.cancelCaption, isOkButtonVisible: msg.isOkButtonVisible, onOkClick: msg.onOkClick, isCancelButtonVisible: msg.isCancelButtonVisible, onCancelClick: msg.onCancelClick, isCloseButtonVisible: msg.isCancelButtonVisible, onCloseClick: msg.onCloseClick, footerStart: msg.footerStart, duration: msg.duration, input: msg.input, inputOption: msg.inputOption }, msg.alertID)); }), toastMessages &&
                toastMessages.map(function (msg) { return (_jsx(ToastMessage, { id: msg.id, length: msg.length, align: msg.align, title: msg.title, message: msg.message, type: msg.type, duration: msg.duration, startAt: msg.startAt, endAt: msg.endAt, removeToastMessage: removeToastMessage }, msg.id)); })] })));
});
var ToastMessageContainer = styled.div({
    display: "flex",
});
export var useMessage = function () {
    var context = useContext(MessageContext);
    if (!context) {
        throw new Error("message must be used within a MessageProvider");
    }
    return context;
};
