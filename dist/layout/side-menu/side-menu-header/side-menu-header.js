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
import { Fragment as _Fragment, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function SideMenuHeader(_a) {
    var isShow = _a.isShow;
    return (_jsx("div", __assign({ css: css({
            height: "60px",
            lineHeight: "60px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: "13px",
            alignItems: "center",
            padding: "0px 17px",
        }) }, { children: _jsx("span", __assign({ css: css({
                fontSize: 21,
                cursor: "pointer",
                width: "auto",
            }), onClick: function () { return window.sideMenu(!isShow); } }, { children: isShow ? _jsx(_Fragment, { children: "\u2715" }) : _jsx(_Fragment, { children: "\u2630" }) })) })));
}
export default SideMenuHeader;
