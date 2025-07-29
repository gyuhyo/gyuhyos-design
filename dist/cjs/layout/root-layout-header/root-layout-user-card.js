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
/** @jsxImportSource @emotion/react */
var react_1 = __importDefault(require("react"));
var button_1 = __importDefault(require("../../button"));
var react_2 = require("@emotion/react");
var user_store_1 = require("../stores/user-store");
var message_context_1 = require("../../alert-message/context/message-context");
var root_layout_user_sign_time_1 = __importDefault(require("./root-layout-user-sign-time"));
var layout_context_1 = require("../contexts/layout-context");
var RootLayoutUserCard = react_1.default.memo(function () {
    var signOut = (0, user_store_1.useUserStore)(function (state) { return state.signOut; });
    var signIn = (0, user_store_1.useUserStore)(function (state) { return state.signIn; });
    var user = (0, user_store_1.useUserStore)(function (state) { return state.me; });
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var _a = (0, layout_context_1.useLayout)(), host = _a.host, refreshTokenUrl = _a.refreshTokenUrl, languages = _a.languages, handleLanguageChange = _a.handleLanguageChange, onBeforeLogout = _a.onBeforeLogout;
    var onSignOutClick = function () {
        showMessage({
            title: "로그아웃 확인",
            message: "정말 로그아웃 하시겠습니까?",
            onOkClick: function () {
                if (onBeforeLogout)
                    onBeforeLogout(user);
                fetch("".concat(host, "/smart.device/logout/").concat(user.userNo), {
                    method: "get",
                    headers: {
                        Authorization: "Bearer ".concat(user.accessToken),
                    },
                }).finally(function () {
                    signOut();
                });
            },
        });
    };
    var onRefreshClick = react_1.default.useCallback(function () {
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
            signIn(data);
        });
    }, [user]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_2.css)({
                    lineHeight: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid var(--default-border-color)",
                    fontSize: "20px",
                    padding: "3px 5px",
                }) }, { children: languages.map(function (x) { return ((0, jsx_runtime_1.jsx)("div", { css: (0, react_2.css)({
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
                    }), onClick: function () { return handleLanguageChange(x); } }, x.flag)); }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_2.css)({
                    lineHeight: "30px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid var(--default-border-color)",
                    fontSize: "0.85rem",
                }) }, { children: [(0, jsx_runtime_1.jsx)(root_layout_user_sign_time_1.default, {}), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#1f619d", color: "#fff", compact: true, rounded: false, onClick: onRefreshClick }, { children: "\uC5F0\uC7A5" })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#df4873", color: "#fff", compact: true, rounded: false, onClick: onSignOutClick }, { children: "\uB85C\uADF8\uC544\uC6C3" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_2.css)({
                    lineHeight: "30px",
                    display: "none",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid var(--default-border-color)",
                    fontSize: "0.85rem",
                    "@media (min-width: 650px)": {
                        display: "flex",
                    },
                }) }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_2.css)({
                            padding: "0px 7px",
                            background: "rgb(var(--background-color))",
                            height: "-webkit-fill-available",
                        }) }, { children: "".concat(user.userName, "\uB2D8") })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#a0a0a0", color: "#fff", onClick: function () { return window.sideSetting(true); }, compact: true, rounded: false }, { children: "\uC124\uC815" }))] }))] }));
});
exports.default = RootLayoutUserCard;
