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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useGyudAccess } from "../access-context";
var Button = function (props) {
    var children = props.children, _a = props.compact, compact = _a === void 0 ? false : _a, _b = props.rounded, rounded = _b === void 0 ? true : _b, _c = props.border, border = _c === void 0 ? true : _c, _d = props.borderColor, borderColor = _d === void 0 ? "#cecece" : _d, _e = props.bgColor, bgColor = _e === void 0 ? "#eeeeee" : _e, color = props.color, anotherProps = __rest(props, ["children", "compact", "rounded", "border", "borderColor", "bgColor", "color"]);
    var isAccess = useGyudAccess();
    if (isAccess && !isAccess.result) {
        throw new Error("You do not have permission to use package 'gyud'.");
    }
    return (_jsxs("button", __assign({ ref: props.btnref, css: css({
            padding: compact ? "0px 7px" : "5px 20px",
            borderRadius: rounded ? 5 : 0,
            background: "linear-gradient(180deg, ".concat(bgColor, "90 0%, ").concat(bgColor, " 50%, ").concat(bgColor, "90 100%)"),
            border: border
                ? "1px solid ".concat(bgColor !== "#eeeeee" && borderColor === "#cecece"
                    ? bgColor
                    : borderColor)
                : undefined,
            boxShadow: "inset 1px 1px 3px #ffffff97, inset -0.5px -0.5px 1px #00000030",
            color: color ? "".concat(color, " !important") : "#000",
            "&:hover": {
                cursor: "pointer",
                background: "linear-gradient(180deg, ".concat(bgColor).concat((95 * 0.9).toFixed(0), " 0%, ").concat(bgColor).concat((100 * 0.9).toFixed(0), " 50%, ").concat(bgColor).concat((95 * 0.9).toFixed(0), " 100%)"),
            },
            "&:active": {
                background: "linear-gradient(180deg, ".concat(bgColor, "90 0%, ").concat(bgColor, " 50%, ").concat(bgColor, "90 100%)"),
                boxShadow: "inset 1px 1px 3px #00000030, inset -0.5px -0.5px 1px #ffffff97",
            },
            display: "flex",
            flexDirection: "row",
            columnGap: 3,
            justifyContent: "center",
            alignItems: "center",
        }) }, anotherProps, { children: [props.icon && "".concat(props.icon, " "), props.children] })));
};
export var MesButton = function (props) {
    var children = props.children, anotherProps = __rest(props, ["children"]);
    var primaryProps = function () {
        if (props.primary === undefined || props.primary === "default") {
            return null;
        }
        if (props.primary === "green") {
            return {
                bgColor: "#22cb5f",
                color: "#ffffff",
                borderColor: "#03cf00",
            };
        }
        if (props.primary === "red") {
            return {
                bgColor: "#df4873",
                borderColor: "#ff7070",
                color: "#ffffff",
            };
        }
        if (props.primary === "blue") {
            return {
                bgColor: "#1f619d",
                borderColor: "#396dff",
                color: "#ffffff",
            };
        }
    };
    return (_jsx(Button, __assign({ border: true, compact: true, css: css({
            padding: "3px 11px",
            "@media (min-width: 650px)": {
                padding: "5px 12px",
            },
        }) }, primaryProps(), anotherProps, { children: children })));
};
export default Button;
