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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext } from "react";
import RootLayout from "../page/root-layout/root-layout";
import { useMenuStore } from "../stores/menu-store";
import { useUserStore } from "../stores/user-store";
var languages = [
    { code: "ko", name: "한국어", flag: "kr" },
    { code: "en", name: "English", flag: "us" }, // 영어
];
var LayoutContext = createContext(undefined);
export var LayoutProvider = function (_a) {
    var children = _a.children, menus = _a.menus, onAuthRefreshClick = _a.onAuthRefreshClick, authUrl = _a.authUrl, _b = _a.menuType, menuType = _b === void 0 ? "slide" : _b;
    var path = window.location.pathname;
    var user = useUserStore(function (state) { return state.me.userNo; });
    var setInitialMenus = useMenuStore(function (state) { return state.setInitialMenus; });
    var calculWidth = React.useMemo(function () {
        return menuType === "slide" || menuType === "multiple"
            ? "calc(100vw - 55px)"
            : "100vw";
    }, [menuType]);
    React.useEffect(function () {
        if (!authUrl) {
            throw new Error("Please Add Auth Url From LayoutProvider Props.");
        }
        if (!path.includes("popup") &&
            path !== authUrl &&
            (user === undefined || user === null) &&
            process.env.NODE_ENV !== "production" &&
            window.location.port !== "3001") {
            window.sessionStorage.removeItem("menu-storage");
            window.sessionStorage.removeItem("user-storage");
            window.location.href = authUrl;
        }
    }, [user, authUrl]);
    React.useEffect(function () {
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
    }, [menus]);
    React.useEffect(function () {
        var loadScript = function () {
            var script = document.createElement("script");
            script.src = "https://kit.fontawesome.com/a220dac585.js";
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
            return function () {
                if (document.head.contains(script)) {
                    document.head.removeChild(script);
                }
            };
        };
        if (document.readyState === "complete") {
            loadScript();
        }
        else {
            window.addEventListener("load", loadScript);
            return function () { return window.removeEventListener("load", loadScript); };
        }
    }, []);
    React.useEffect(function () {
        var deleteCookie = function (name) {
            document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
        };
        var loadScript = function () {
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
        };
        if (document.readyState === "complete") {
            loadScript();
        }
        else {
            window.addEventListener("load", loadScript);
            return function () { return window.removeEventListener("load", loadScript); };
        }
    }, []);
    var handleLanguageChange = function (lang) {
        var html = document.querySelector("html");
        html === null || html === void 0 ? void 0 : html.removeAttribute("translate");
        var value = lang.code;
        var gtCombo = document.querySelector(".goog-te-combo");
        if (gtCombo) {
            console.dir(gtCombo);
            if (value === "ko") {
                gtCombo.value = value;
                gtCombo.dispatchEvent(new Event("change"));
            }
            else {
                gtCombo.value = value;
            }
            gtCombo.dispatchEvent(new Event("change"));
        }
    };
    if (path === authUrl || path.includes("popup")) {
        return _jsx(React.Fragment, { children: children });
    }
    if ((user === undefined || user === null) &&
        process.env.NODE_ENV !== "production" &&
        window.location.port !== "3001") {
        return _jsx(_Fragment, {});
    }
    return (_jsxs(LayoutContext.Provider, __assign({ value: {
            menuType: menuType,
            onAuthRefreshClick: onAuthRefreshClick,
            calculWidth: calculWidth,
            languages: languages,
            handleLanguageChange: handleLanguageChange,
        } }, { children: [_jsx("div", { id: "google_translate_element" }), _jsx(RootLayout, {})] })));
};
export var useLayout = function () {
    var context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
