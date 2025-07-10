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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext } from "react";
import RootLayout from "../page/root-layout/root-layout";
import { useMenuStore } from "../stores/menu-store";
import { useUserStore } from "../stores/user-store";
import { useGyudAccess } from "../../access-context";
var languages = [
    { code: "ko", name: "한국어", flag: "kr" },
    { code: "en", name: "English", flag: "us" },
    { code: "es", name: "Spanish", flag: "es" },
];
var LayoutContext = createContext(undefined);
export var LayoutProvider = function (_a) {
    var children = _a.children, host = _a.host, menus = _a.menus, refreshTokenUrl = _a.refreshTokenUrl, authUrl = _a.authUrl, _b = _a.menuType, menuType = _b === void 0 ? "slide" : _b, customSettings = _a.customSettings, onMenuPermission = _a.onMenuPermission, statics = _a.statics;
    var isAccess = useGyudAccess();
    var _c = __read(React.useState(false), 2), isLoaded = _c[0], setIsLoaded = _c[1];
    var _d = __read(React.useState(false), 2), isClient = _d[0], setIsClient = _d[1]; // 클라이언트 체크
    var path = isClient ? window.location.pathname : ""; // 클라이언트에서만 접근
    var user = useUserStore(function (state) { var _a; return (_a = state.me) === null || _a === void 0 ? void 0 : _a.userNo; });
    var setInitialMenus = useMenuStore(function (state) { return state.setInitialMenus; });
    var isDev = process.env.NODE_ENV === "development" &&
        ((window === null || window === void 0 ? void 0 : window.location.port) === "3000" || (window === null || window === void 0 ? void 0 : window.location.port) === "3001");
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
            !__spreadArray(__spreadArray([], __read((statics || [])), false), [authUrl], false).includes(path) &&
            !path.includes("popup") &&
            path !== authUrl &&
            (user === undefined || user === null)) {
            window.sessionStorage.removeItem("menu-storage");
            window.localStorage.removeItem("user-storage");
            window.location.href = authUrl;
        }
    }, [user, authUrl, path, isClient]);
    var getPermissionMenus = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (onMenuPermission === null || onMenuPermission === void 0 ? void 0 : onMenuPermission({ userNo: user, menus: menus }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var setMenusVisible = function (mns) {
        return mns.map(function (mn) {
            if (mn.children && mn.children.length > 0) {
                return __assign(__assign({}, mn), { visible: true, children: setMenusVisible(mn.children) });
            }
            return __assign(__assign({}, mn), { visible: true });
        });
    };
    React.useEffect(function () {
        if (!isDev && (!user || !isClient))
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
        if (path !== authUrl) {
            if (onMenuPermission) {
                getPermissionMenus().then(function (permissionMenus) {
                    setInitialMenus(permissionMenus);
                });
            }
            else {
                var mns = setMenusVisible(menus);
                setInitialMenus(mns);
            }
        }
    }, [user, menus, isClient, path]);
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
                includedLanguages: "ko,en,es",
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
    if (!isClient ||
        __spreadArray(__spreadArray([], __read((statics || [])), false), [authUrl], false).includes(path) ||
        path.includes("popup")) {
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
            host: host,
        } }, { children: [_jsx("div", { id: "google_translate_element" }), _jsx(RootLayout, {})] })));
};
export var useLayout = function () {
    var context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
