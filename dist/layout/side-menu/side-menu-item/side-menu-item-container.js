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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import SideMenuItemGroup from "./side-menu-item-group";
import { useMenuStore } from "../../stores/menu-store";
import { css } from "@emotion/react";
function SideMenuItemContainer(_a) {
    var isShow = _a.isShow;
    var items = useMenuStore(function (state) { return state.menus; });
    return (_jsx("ul", __assign({ className: "menu-container", css: css({
            textWrap: "nowrap",
            overflowX: "hidden",
            overflowY: "auto",
            height: "calc(100dvh - 60px)",
            letterSpacing: 3,
        }) }, { children: items &&
            items.map(function (group) { return (_jsx(SideMenuItemGroup, { isShow: isShow, group: group }, group.key)); }) })));
}
export default SideMenuItemContainer;
