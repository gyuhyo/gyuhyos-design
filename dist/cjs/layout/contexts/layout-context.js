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
exports.useLayout = exports.LayoutProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importStar(require("react"));
var root_layout_1 = __importDefault(require("../page/root-layout/root-layout"));
var menu_store_1 = require("../stores/menu-store");
var user_store_1 = require("../stores/user-store");
var access_context_1 = require("../../access-context");
var languages = [
    { code: "ko", name: "한국어", flag: "kr" },
    { code: "en", name: "English", flag: "us" }, // 영어
];
var LayoutContext = (0, react_1.createContext)(undefined);
var LayoutProvider = function (_a) {
    var children = _a.children, menus = _a.menus, refreshTokenUrl = _a.refreshTokenUrl, authUrl = _a.authUrl, _b = _a.menuType, menuType = _b === void 0 ? "slide" : _b, customSettings = _a.customSettings;
    var isAccess = (0, access_context_1.useGyudAccess)();
    var _c = __read(react_1.default.useState(false), 2), isLoaded = _c[0], setIsLoaded = _c[1];
    var _d = __read(react_1.default.useState(false), 2), isClient = _d[0], setIsClient = _d[1]; // 클라이언트 체크
    var path = isClient ? window.location.pathname : ""; // 클라이언트에서만 접근
    var user = (0, user_store_1.useUserStore)(function (state) { var _a; return (_a = state.me) === null || _a === void 0 ? void 0 : _a.userNo; });
    var setInitialMenus = (0, menu_store_1.useMenuStore)(function (state) { return state.setInitialMenus; });
    var isDev = process.env.NODE_ENV === "development" && (window === null || window === void 0 ? void 0 : window.location.port) === "3000";
    var calculWidth = react_1.default.useMemo(function () {
        return menuType === "slide" || menuType === "multiple"
            ? "calc(100dvw - 55px)"
            : "100dvw";
    }, [menuType]);
    // 클라이언트 체크
    react_1.default.useEffect(function () {
        setIsClient(true);
    }, []);
    react_1.default.useEffect(function () {
        if (!isClient)
            return;
        var handleLoad = function () {
            setIsLoaded(true);
        };
        if (document.readyState === "complete") {
            handleLoad();
        }
        else {
            window.addEventListener("load", handleLoad);
            return function () { return window.removeEventListener("load", handleLoad); };
        }
    }, [isClient]);
    react_1.default.useEffect(function () {
        if (!isClient || !authUrl)
            return;
        if (!isDev &&
            !path.includes("popup") &&
            path !== authUrl &&
            (user === undefined || user === null)) {
            window.sessionStorage.removeItem("menu-storage");
            window.localStorage.removeItem("user-storage");
            window.location.href = authUrl;
        }
    }, [user, authUrl, path, isClient]);
    react_1.default.useEffect(function () {
        if (!isClient)
            return;
        if (menus === undefined || menus.length === 0) {
            throw new Error("메뉴가 등록되지 않았습니다.\n메뉴를 먼저 등록 후 레이아웃을 사용해 주세요.");
        }
        var flatMenus = menus.flatMap(function (x) {
            return x.children === undefined ? x : x.children;
        });
        var mainMenu = flatMenus.find(function (x) { return x.main === true; });
        if (!mainMenu) {
            throw new Error("반드시 한개의 메인 메뉴가 존재해야 합니다.");
        }
        setInitialMenus(menus);
    }, [menus, isClient]);
    react_1.default.useEffect(function () {
        if (!isLoaded || !isClient)
            return;
        var script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/a220dac585.js";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        return function () {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [isLoaded, isClient]);
    react_1.default.useEffect(function () {
        if (!isLoaded || !isClient)
            return;
        var deleteCookie = function (name) {
            document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
        };
        deleteCookie("googtrans");
        var addGoogleTranslateScript = document.createElement("script");
        addGoogleTranslateScript.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(addGoogleTranslateScript);
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
                pageLanguage: "ko",
                includedLanguages: "ko,en",
                autoDisplay: true,
            }, "google_translate_element");
        };
        return function () {
            if (document.body.contains(addGoogleTranslateScript)) {
                document.body.removeChild(addGoogleTranslateScript);
            }
        };
    }, [isLoaded, isClient]);
    var handleLanguageChange = function (lang) {
        if (!isClient)
            return;
        var html = document.querySelector("html");
        html === null || html === void 0 ? void 0 : html.removeAttribute("translate");
        var value = lang.code;
        var gtCombo = document.querySelector(".goog-te-combo");
        if (gtCombo) {
            gtCombo.value = value;
            gtCombo.dispatchEvent(new Event("change"));
        }
    };
    if (!isAccess) {
        throw new Error("You do not have permission to use package 'gyud'.");
    }
    if (!isClient || path === authUrl || path.includes("popup")) {
        return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children });
    }
    if (!isLoaded || (!isDev && (user === undefined || user === null))) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(LayoutContext.Provider, __assign({ value: {
            menuType: menuType,
            refreshTokenUrl: refreshTokenUrl,
            calculWidth: calculWidth,
            languages: languages,
            handleLanguageChange: handleLanguageChange,
            customSettings: customSettings,
        } }, { children: [(0, jsx_runtime_1.jsx)("div", { id: "google_translate_element" }), (0, jsx_runtime_1.jsx)(root_layout_1.default, {})] })));
};
exports.LayoutProvider = LayoutProvider;
var useLayout = function () {
    var context = (0, react_1.useContext)(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
exports.useLayout = useLayout;
