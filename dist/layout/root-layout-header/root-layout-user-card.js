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
import React from "react";
import Button from "../../button";
import { css } from "@emotion/react";
import { useUserStore } from "../stores/user-store";
import { useMessage } from "../../alert-message/context/message-context";
import RootLayoutUserSignTime from "./root-layout-user-sign-time";
import { useLayout } from "../contexts/layout-context";
var RootLayoutUserCard = React.memo(function () {
    var signOut = useUserStore(function (state) { return state.signOut; });
    var signIn = useUserStore(function (state) { return state.signIn; });
    var user = useUserStore(function (state) { return state.me; });
    var showMessage = useMessage().showMessage;
    var _a = useLayout(), refreshTokenUrl = _a.refreshTokenUrl, languages = _a.languages, handleLanguageChange = _a.handleLanguageChange;
    var onSignOutClick = function () {
        showMessage({
            title: "로그아웃 확인",
            message: "정말 로그아웃 하시겠습니까?",
            onOkClick: function () {
                signOut();
            },
        });
    };
    var onRefreshClick = React.useCallback(function () {
        var _a;
        if (!user.refreshToken)
            return;
        fetch(refreshTokenUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.accessToken),
            },
            body: JSON.stringify({
                refreshToken: user.refreshToken,
                login24h: (_a = user.login24h) !== null && _a !== void 0 ? _a : false,
            }),
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            signIn(data.data);
        });
    }, [user]);
    return (_jsxs("div", { children: [_jsx("div", __assign({ css: css({
                    lineHeight: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    fontSize: "20px",
                    padding: "3px 5px",
                }) }, { children: languages.map(function (x) { return (_jsx("div", { css: css({
                        background: "url('https://cdn.weglot.com/flags/square/".concat(x.flag, ".svg')"),
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        height: "24px",
                        width: "30px",
                        border: "2px solid transparent",
                        "&:hover": {
                            cursor: "pointer",
                            mixBlendMode: "darken",
                        },
                    }), onClick: function () { return handleLanguageChange(x); } }, x.flag)); }) })), _jsxs("div", __assign({ css: css({
                    lineHeight: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    fontSize: "0.85rem",
                }) }, { children: [_jsx(RootLayoutUserSignTime, {}), _jsx(Button, __assign({ bgColor: "#1f619d", color: "#fff", compact: true, rounded: false, onClick: onRefreshClick }, { children: "\uC5F0\uC7A5" })), _jsx(Button, __assign({ bgColor: "#df4873", color: "#fff", compact: true, rounded: false, border: false, onClick: onSignOutClick }, { children: "\uB85C\uADF8\uC544\uC6C3" }))] })), _jsxs("div", __assign({ css: css({
                    lineHeight: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    fontSize: "0.85rem",
                }) }, { children: [_jsx("p", __assign({ css: css({
                            padding: "0px 7px",
                            background: "#fff",
                        }) }, { children: "".concat(user.userName, "\uB2D8") })), _jsx(Button, __assign({ bgColor: "#a0a0a0", color: "#fff", onClick: function () { return window.sideSetting(true); }, compact: true, rounded: false }, { children: "\uC124\uC815" }))] }))] }));
});
export default RootLayoutUserCard;
