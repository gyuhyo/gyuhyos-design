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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext } from "react";
import RootLayout from "../page/root-layout/root-layout";
import { useMenuStore } from "../stores/menu-store";
import { useUserStore } from "../stores/user-store";
import { useGyudAccess } from "../../access-context";
var languages = [
    { code: "ko", name: "한국어", flag: "kr" },
    { code: "en", name: "English", flag: "us" }, // 영어
];
var LayoutContext = createContext(undefined);
export var LayoutProvider = function (_a) {
    var children = _a.children, menus = _a.menus, refreshTokenUrl = _a.refreshTokenUrl, authUrl = _a.authUrl, _b = _a.menuType, menuType = _b === void 0 ? "slide" : _b, customSettings = _a.customSettings;
    var isAccess = useGyudAccess();
    var _c = __read(React.useState(false), 2), isLoaded = _c[0], setIsLoaded = _c[1];
    var _d = __read(React.useState(false), 2), isClient = _d[0], setIsClient = _d[1]; // 클라이언트 체크
    var path = isClient ? window.location.pathname : ""; // 클라이언트에서만 접근
    var user = useUserStore(function (state) { var _a; return (_a = state.me) === null || _a === void 0 ? void 0 : _a.userNo; });
    var setInitialMenus = useMenuStore(function (state) { return state.setInitialMenus; });
    var isDev = process.env.NODE_ENV === "development" && (window === null || window === void 0 ? void 0 : window.location.port) === "3000";
    var calculWidth = React.useMemo(function () {
        return menuType === "slide" || menuType === "multiple"
            ? "calc(100dvw - 55px)"
            : "100dvw";
    }, [menuType]);
    // 클라이언트 체크
    React.useEffect(function () {
        setIsClient(true);
    }, []);
    React.useEffect(function () {
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
    React.useEffect(function () {
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
    React.useEffect(function () {
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
    React.useEffect(function () {
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
    React.useEffect(function () {
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
        return _jsx(React.Fragment, { children: children });
    }
    if (!isLoaded || (!isDev && (user === undefined || user === null))) {
        return null;
    }
    return (_jsxs(LayoutContext.Provider, __assign({ value: {
            menuType: menuType,
            refreshTokenUrl: refreshTokenUrl,
            calculWidth: calculWidth,
            languages: languages,
            handleLanguageChange: handleLanguageChange,
            customSettings: customSettings,
        } }, { children: [_jsx("div", { id: "google_translate_element" }), _jsx(RootLayout, {})] })));
};
export var useLayout = function () {
    var context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
