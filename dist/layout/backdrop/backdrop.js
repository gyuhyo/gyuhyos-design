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
import * as React from "react";
import { BACK_DROP_STYLE } from "./backdrop.style";
function Backdrop(props) {
    React.useEffect(function () {
        var body = document.querySelector("body");
        if (props.isShow) {
            if (body)
                body.style.overflow = "hidden";
        }
        else {
            if (body)
                body.style.overflow = "";
        }
        return function () {
            if (body)
                body.style.overflow = "";
        };
    }, [props.isShow]);
    var onBackdropClick = function (e) {
        if (!props.onClick)
            return;
        props.onClick(e);
    };
    return (_jsx("div", __assign({ css: css(__assign({ visibility: props.isShow ? "visible" : "hidden", transitionProperty: "visibility", transitionDuration: "200ms", display: "flex" }, props.styles)), onClick: function (e) { return onBackdropClick(e); } }, { children: _jsx("div", __assign({ css: BACK_DROP_STYLE({
                show: props.isShow,
                styles: props.backdropStyles,
            }) }, { children: props.children })) })));
}
export default Backdrop;
