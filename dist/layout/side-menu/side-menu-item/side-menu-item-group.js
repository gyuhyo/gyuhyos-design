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
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import SideMenuItem from "./side-menu-item";
import { useMenuStore } from "../../stores/menu-store";
function SideMenuItemGroup(_a) {
    var group = _a.group, isShow = _a.isShow;
    var _b = __read(React.useState(false), 2), groupOpened = _b[0], setGroupOpened = _b[1];
    var openMenu = useMenuStore(function (state) { return state.openMenu; });
    React.useEffect(function () {
        if (!isShow) {
            setGroupOpened(false);
        }
    }, [isShow]);
    return (_jsxs("li", { children: [_jsxs("div", __assign({ css: css({
                    padding: "0px 17px",
                    height: "45px",
                    lineHeight: "45px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": {
                        color: "#00b5ff",
                        cursor: "pointer",
                    },
                }), onClick: function () {
                    if (group.children !== undefined && group.children.length > 0) {
                        if (!isShow) {
                            window.sideMenu(true);
                        }
                        setGroupOpened(!groupOpened);
                    }
                    else {
                        openMenu(group);
                    }
                } }, { children: [_jsxs("span", { children: [group.iconName !== undefined && (_jsx("i", { className: "fa-".concat(group.iconType === undefined ? "solid" : group.iconType, " fa-").concat(group.iconName), css: css([
                                    {
                                        width: "21px",
                                        fontSize: "21px",
                                        marginRight: 20,
                                    },
                                    !isShow && {
                                        "&:hover": {
                                            "&::after": {
                                                content: "'".concat(group.title, "'"),
                                                position: "fixed",
                                                left: "60px",
                                                background: "#000",
                                                color: "#fff",
                                                fontSize: "12px",
                                                padding: "7px 3px",
                                                transform: "background-color 200ms linear",
                                                zIndex: 5,
                                            },
                                        },
                                    },
                                ]) })), group.title] }), group.children !== undefined && group.children.length > 0 && (_jsx("i", { className: "fa-solid fa-angle-down", css: css({
                            transform: groupOpened ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 200ms ease-in-out",
                        }) }))] })), isShow && (_jsx("ul", __assign({ css: css({
                    background: "#002230",
                    lineHeight: "40px",
                    borderBottom: "#000",
                    height: groupOpened
                        ? "".concat((group.children
                            ? group.children.filter(function (f) { return f.visible; }).length
                            : 0) * 40, "px")
                        : "0px",
                    transition: "height 200ms ease-in-out",
                    overflow: "hidden",
                    "& > li:hover": {
                        background: "#00000040",
                        color: "#00b5ff",
                        cursor: "pointer",
                    },
                }) }, { children: group.children &&
                    group.children
                        .filter(function (f) { return f.visible; })
                        .map(function (itm) { return (_jsx(SideMenuItem, { item: itm }, "".concat(group.key, "-").concat(itm.key))); }) })))] }));
}
export default SideMenuItemGroup;
