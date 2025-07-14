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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
var GyudAccessContext = React.createContext(undefined);
export var GyudAccessProvider = function (_a) {
    var children = _a.children;
    var _b = __read(React.useState(false), 2), isSuccess = _b[0], setIsSuccess = _b[1];
    var _c = __read(React.useState({ result: false }), 2), isAccess = _c[0], setIsAccess = _c[1];
    React.useEffect(function () {
        fetch("https://raw.githubusercontent.com/gyuhyo/gyud-access/master/access-host?timestamp=".concat(new Date().getTime()), { method: "GET", cache: "no-cache" })
            .then(function (res) { return res.text(); })
            .then(function (res) {
            var accessHosts = res.trim().split("\n");
            var myHost = "".concat(window.location.protocol, "//").concat(window.location.host);
            var access = false;
            if (accessHosts.includes("*")) {
                access = true;
                setIsAccess({ result: true });
            }
            else {
                access = accessHosts.includes(myHost);
                setIsAccess({ result: access });
            }
            setIsSuccess(true);
            if (!access) {
                throw new Error("You do not have permission to use package 'gyud'.");
            }
        });
    }, []);
    if (!isSuccess || !isAccess)
        return null;
    return (_jsx(GyudAccessContext.Provider, __assign({ value: isAccess }, { children: children })));
};
export var useGyudAccess = function () {
    var context = React.useContext(GyudAccessContext);
    if (!context) {
        throw new Error("Component Not Found: GyudAccessProvider");
    }
    return context;
};
