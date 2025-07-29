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
import * as React from "react";
function TabPanelContent(_a) {
    var children = _a.children;
    if (typeof window === "undefined") {
        return _jsx(_Fragment, { children: "loading..." });
    }
    return (_jsx("div", __assign({ css: css({
            flex: "1 1 0%",
            marginTop: "-1px",
            borderTop: "1px solid rgb(var(--panel-border-color))",
            position: "relative",
            overflow: "hidden",
        }) }, { children: _jsx("main", __assign({ css: css({ height: "100%" }) }, { children: children })) })));
}
export default React.memo(TabPanelContent);
