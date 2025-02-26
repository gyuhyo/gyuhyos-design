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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var react_2 = __importDefault(require("react"));
var user_store_1 = require("../stores/user-store");
var message_context_1 = require("../../alert-message/context/message-context");
var RootLayoutUserSignTime = react_2.default.memo(function () {
    var signOut = (0, user_store_1.useUserStore)(function (state) { return state.signOut; });
    var user = (0, user_store_1.useUserStore)(function (state) { return state.me; });
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var _a = __read(react_2.default.useState("00:00"), 2), expiredTime = _a[0], setExpiredTime = _a[1];
    var _b = __read(react_2.default.useState("00:00"), 2), refreshExpiredTime = _b[0], setRefreshExpiredTime = _b[1];
    react_2.default.useEffect(function () {
        if (!user.tokenInExpire)
            return;
        var end = user.tokenInExpire;
        var timer = setInterval(function () {
            var now = new Date().getTime();
            var diffTime = end - now;
            if (diffTime <= 0) {
                signOut();
                return;
            }
            var h = Math.floor(diffTime / 1000 / 3600);
            var m = Math.floor(((diffTime / 1000) % 3600) / 60);
            setExpiredTime("".concat(String(h).padStart(2, "0"), ":").concat(String(m).padStart(2, "0")));
        }, 1000);
        return function () { return clearInterval(timer); };
    }, [user.tokenInExpire]);
    react_2.default.useEffect(function () {
        if (!user.refreshTokenInExpire)
            return;
        var end = user.refreshTokenInExpire;
        var timer = setInterval(function () {
            var now = new Date().getTime();
            var diffTime = end - now;
            if (diffTime <= 0) {
                signOut();
                return;
            }
            var h = Math.floor(diffTime / 1000 / 3600);
            var m = Math.floor(((diffTime / 1000) % 3600) / 60);
            setRefreshExpiredTime("".concat(String(h).padStart(2, "0"), ":").concat(String(m).padStart(2, "0")));
        }, 1000);
        return function () { return clearInterval(timer); };
    }, [user.refreshTokenInExpire]);
    return ((0, jsx_runtime_1.jsxs)("p", __assign({ css: (0, react_1.css)({
            padding: "0px 7px",
            background: "#fff",
        }) }, { children: [expiredTime, " \uB0A8\uC74C"] })));
});
exports.default = RootLayoutUserSignTime;
