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
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMenuStore } from "../../stores/menu-store";
function SideMenuItem(_a) {
    var item = _a.item;
    var openMenu = useMenuStore(function (state) { return state.openMenu; });
    var onMenuClick = function () {
        openMenu(item);
    };
    return (_jsx("li", __assign({ onClick: onMenuClick }, { children: _jsx("span", __assign({ css: css({
                padding: "0px 28px",
            }) }, { children: item.title })) })));
}
export default SideMenuItem;
