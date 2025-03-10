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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var menu_store_1 = require("../../stores/menu-store");
function RootLayoutHeaderMenuPop(_a) {
    var isPopShow = _a.isPopShow, value = _a.value, onRemoveSearchText = _a.onRemoveSearchText;
    var openMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.openMenu; });
    var menus = (0, menu_store_1.useMenuStore)(function (state) { return state.menus; });
    var filteredMenus = React.useMemo(function () {
        var e_1, _a;
        var _b;
        if (!value)
            return null;
        var searchMenus = [];
        try {
            for (var menus_1 = __values(menus), menus_1_1 = menus_1.next(); !menus_1_1.done; menus_1_1 = menus_1.next()) {
                var m = menus_1_1.value;
                var mns = (_b = m.children) === null || _b === void 0 ? void 0 : _b.filter(function (m) { var _a; return m.title.includes(value) || ((_a = m.shortKey) === null || _a === void 0 ? void 0 : _a.includes(value)); });
                if (mns) {
                    searchMenus.push.apply(searchMenus, __spreadArray([], __read(mns), false));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (menus_1_1 && !menus_1_1.done && (_a = menus_1.return)) _a.call(menus_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return searchMenus;
    }, [value, menus]);
    var onMenuClick = function (menu) {
        openMenu(menu);
        onRemoveSearchText();
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
            visibility: isPopShow || value ? "visible" : "hidden",
            position: "absolute",
            overflow: "auto",
            top: "42px",
            left: "0px",
            width: 300,
            height: 150,
            background: "#fff",
            boxShadow: "3px 3px 11px rgba(0, 0, 0, 0.5)",
            borderRadius: "7px",
            zIndex: 4,
        }) }, { children: [!value && ((0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({
                    textAlign: "center",
                    height: "100%",
                    alignContent: "center",
                    color: "#a0a0a0",
                }) }, { children: "\uBA54\uB274\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694." }))), value && (filteredMenus === null || filteredMenus === void 0 ? void 0 : filteredMenus.length) === 0 && ((0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({
                    textAlign: "center",
                    height: "100%",
                    alignContent: "center",
                    color: "#a0a0a0",
                }) }, { children: "\uAC80\uC0C9\uD558\uC2E0 \uBA54\uB274\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }))), filteredMenus &&
                filteredMenus.map(function (menu) { return ((0, jsx_runtime_1.jsx)("p", __assign({ css: (0, react_1.css)({
                        margin: 0,
                        padding: "5px 7px",
                        borderBottom: "1px solid #ddd",
                        ":last-of-type": {
                            borderBottom: "none",
                        },
                        cursor: "pointer",
                        "&:hover": {
                            background: "#eee",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                        },
                    }), onClick: function () { return onMenuClick(menu); } }, { children: menu.title }), "".concat(menu.group, "-").concat(menu.key))); })] })));
}
exports.default = RootLayoutHeaderMenuPop;
