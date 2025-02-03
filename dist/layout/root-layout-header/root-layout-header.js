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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { rootLayoutHeaderStyle } from "./root-layout-header-style";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { MdClose, MdSearch } from "react-icons/md";
import { useLayout } from "../contexts/layout-context";
import RootLayoutMenu from "./root-layout-menu";
import RootLayoutUserCard from "./root-layout-user-card";
import "./style.css";
function RootLayoutHeader() {
    var menuType = useLayout().menuType;
    return (_jsxs("header", __assign({ css: rootLayoutHeaderStyle }, { children: [_jsx("div", { children: _jsx("img", { src: "http://sqw.iptime.org:8092/header_logo_left1.png", width: 60, height: 30 }) }), _jsx(RootLayoutMenu, {}), _jsx(RootLayoutUserCard, {})] })));
}
export default RootLayoutHeader;
