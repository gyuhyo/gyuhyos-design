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
exports.useGyudAccess = exports.GyudAccessProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var GyudAccessContext = react_1.default.createContext(undefined);
var GyudAccessProvider = function (_a) {
    var children = _a.children;
    var _b = __read(react_1.default.useState(false), 2), isSuccess = _b[0], setIsSuccess = _b[1];
    var _c = __read(react_1.default.useState({ result: false }), 2), isAccess = _c[0], setIsAccess = _c[1];
    react_1.default.useEffect(function () {
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
    return ((0, jsx_runtime_1.jsx)(GyudAccessContext.Provider, __assign({ value: isAccess }, { children: children })));
};
exports.GyudAccessProvider = GyudAccessProvider;
var useGyudAccess = function () {
    var context = react_1.default.useContext(GyudAccessContext);
    if (!context) {
        throw new Error("Component Not Found: GyudAccessProvider");
    }
    return context;
};
exports.useGyudAccess = useGyudAccess;
