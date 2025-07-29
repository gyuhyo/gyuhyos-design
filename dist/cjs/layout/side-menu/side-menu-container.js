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
var React = __importStar(require("react"));
var side_menu_header_1 = __importDefault(require("./side-menu-header/side-menu-header"));
var side_menu_style_1 = require("./side-menu-style");
var side_menu_item_container_1 = __importDefault(require("./side-menu-item/side-menu-item-container"));
var SideMenuContainer = function () {
    var _a = __read(React.useState(false), 2), isShow = _a[0], setIsShow = _a[1];
    React.useEffect(function () {
        if (typeof window !== "undefined") {
            window.sideMenu = setIsShow;
        }
    }, [setIsShow]);
    var onBackdropClick = function (e) {
        e.stopPropagation();
        window.sideMenu(false);
    };
    var onMenuClick = function (e) {
        var target = e.currentTarget; // 이벤트가 바인딩된 요소
        var handleClickOutside = function (event) {
            // 클릭한 요소가 현재 메뉴의 자식인지 확인
            if (!target.contains(event.target)) {
                window.sideMenu(false);
                window.removeEventListener("click", handleClickOutside);
            }
        };
        setTimeout(function () {
            window.addEventListener("click", handleClickOutside);
        }, 0); // 이벤트 루프 뒤로 밀기
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, side_menu_style_1.sideMenuContainerStyle)({ opened: isShow }), onClick: onMenuClick }, { children: [(0, jsx_runtime_1.jsx)(side_menu_header_1.default, { isShow: isShow }), (0, jsx_runtime_1.jsx)(side_menu_item_container_1.default, { isShow: isShow })] })));
};
exports.default = SideMenuContainer;
