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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
require("./split.container.css");
var react_1 = __importDefault(require("react"));
var Split = react_1.default.lazy(function () {
    return Promise.resolve().then(function () { return __importStar(require("@geoffcox/react-splitter")); }).then(function (mod) { return ({ default: mod.Split }); });
});
var DevsSplitContainer = function (_a) {
    var _b = _a.align, align = _b === void 0 ? "column" : _b, defaultSize = _a.defaultSize, children = _a.children;
    var _c = __read(react_1.default.useState(false), 2), isMobile = _c[0], setIsMobile = _c[1];
    react_1.default.useEffect(function () {
        if (typeof window === "undefined")
            return;
        if (window.innerWidth <= 1200) {
            setIsMobile(true);
        }
        var browserResizing = function () {
            if (window.innerWidth <= 1200) {
                setIsMobile(true);
            }
            else {
                setIsMobile(false);
            }
        };
        window.addEventListener("resize", browserResizing);
        return function () { return window.removeEventListener("resize", browserResizing); };
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Suspense, { children: (0, jsx_runtime_1.jsx)(Split, __assign({ horizontal: isMobile ? true : align == "column" ? true : false, initialPrimarySize: defaultSize !== null && defaultSize !== void 0 ? defaultSize : "50%" }, { children: children })) }));
};
exports.default = react_1.default.memo(DevsSplitContainer);
