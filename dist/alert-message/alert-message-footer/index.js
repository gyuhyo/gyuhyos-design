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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Button from "../../button";
var alertMessageFooter = css({
    padding: 12,
    display: "flex",
    flexDirection: "row",
    columnGap: 22,
    justifyContent: "space-between",
    alignItems: "center",
});
var AlertMessageFooter = React.memo(function (_a) {
    var footerStart = _a.footerStart, isOkButtonVisible = _a.isOkButtonVisible, onOkClick = _a.onOkClick, okCaption = _a.okCaption, closeAlert = _a.closeAlert, isCancelButtonVisible = _a.isCancelButtonVisible, onCancelClick = _a.onCancelClick, cancelCaption = _a.cancelCaption, value = _a.value, input = _a.input;
    return (_jsxs("div", __assign({ css: alertMessageFooter, className: "alert-message-footer" }, { children: [_jsx("div", __assign({ className: "alert-message-footer-left" }, { children: footerStart })), _jsxs("div", __assign({ css: css({
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 7,
                }), className: "alert-message-footer-right" }, { children: [isOkButtonVisible && (_jsx(Button, __assign({ bgColor: "#1f619d", border: true, borderColor: "#1f619d", color: "#fff", onClick: function (e) {
                            if (onOkClick) {
                                var next = onOkClick(value);
                                if (typeof next === "boolean" && !next)
                                    return;
                            }
                            closeAlert();
                        } }, { children: okCaption }))), isCancelButtonVisible && (_jsx(Button, __assign({ border: true, onClick: function (e) {
                            if (onCancelClick) {
                                onCancelClick(e);
                            }
                            closeAlert();
                        } }, { children: cancelCaption })))] }))] })));
});
export default AlertMessageFooter;
