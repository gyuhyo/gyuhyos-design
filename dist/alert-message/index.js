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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import AlertMessageBody from "./alert-message-body";
import AlertMessageFooter from "./alert-message-footer";
import AlertMessageHeader from "./alert-message-header";
import "./message.styles.css";
var backdrop = css({
    width: "100dvw",
    height: "100dvh",
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
    zIndex: 4,
    transition: "backdrop-filter 200ms ease-in-out, opacity 200ms ease-in-out",
});
var visibleAlert = css({
    opacity: 1,
    visibility: "visible",
    transition: "opacity 200ms ease-in-out",
});
var hiddenAlert = css({
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 200ms ease-in-out, visibility 0ms ease-in-out 200ms",
});
var AlertMessage = function (props) {
    var setIsShow = props.setIsShow, type = props.type, title = props.title, message = props.message, okCaption = props.okCaption, cancelCaption = props.cancelCaption, isOkButtonVisible = props.isOkButtonVisible, onOkClick = props.onOkClick, isCancelButtonVisible = props.isCancelButtonVisible, onCancelClick = props.onCancelClick, isCloseButtonVisible = props.isCloseButtonVisible, onCloseClick = props.onCloseClick, footerStart = props.footerStart, input = props.input, inputOption = props.inputOption;
    var _a = __read(React.useState(""), 2), value = _a[0], setValue = _a[1];
    var _b = __read(React.useState(true), 2), isShowState = _b[0], setIsShowState = _b[1];
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
            if (e.key === "Enter") {
                if (onOkClick) {
                    var next = onOkClick();
                    if (typeof next === "boolean" && !next)
                        return;
                }
                closeAlert();
            }
        };
        window.addEventListener("keydown", closeKeyDownPopup);
        return function () {
            window.removeEventListener("keydown", closeKeyDownPopup);
        };
    }, []);
    return (_jsx("div", __assign({ css: [backdrop, isShowState ? visibleAlert : hiddenAlert] }, { children: _jsxs("div", __assign({ className: "alertMessageWrapper ".concat(isShowState ? undefined : "alertMessageWrapperClose") }, { children: [_jsx(AlertMessageHeader, { type: type, title: title, isCloseButtonVisible: isCloseButtonVisible, onCloseClick: onCloseClick, closeAlert: closeAlert }), _jsx(AlertMessageBody, { message: message, input: input, inputOption: inputOption, value: value, setValue: setValue }), _jsx(AlertMessageFooter, { footerStart: footerStart, isOkButtonVisible: isOkButtonVisible, onOkClick: onOkClick, okCaption: okCaption, closeAlert: closeAlert, isCancelButtonVisible: isCancelButtonVisible, onCancelClick: onCancelClick, cancelCaption: cancelCaption, value: value, input: input })] })) })));
};
export default React.memo(AlertMessage);
