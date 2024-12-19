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
import { jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useUserStore } from "../stores/user-store";
import { useMessage } from "../../alert-message/context/message-context";
var RootLayoutUserSignTime = React.memo(function () {
    var signOut = useUserStore(function (state) { return state.signOut; });
    var user = useUserStore(function (state) { return state.me; });
    var showMessage = useMessage().showMessage;
    var _a = __read(React.useState("00:00"), 2), expiredTime = _a[0], setExpiredTime = _a[1];
    React.useEffect(function () {
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
    return (_jsxs("p", __assign({ css: css({
            padding: "0px 7px",
            background: "#fff",
        }) }, { children: [expiredTime, " \uB0A8\uC74C"] })));
});
export default RootLayoutUserSignTime;
