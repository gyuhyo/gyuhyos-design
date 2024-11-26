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
import { jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
var Button = function (props) {
    var children = props.children, _a = props.compact, compact = _a === void 0 ? false : _a, _b = props.rounded, rounded = _b === void 0 ? true : _b, _c = props.border, border = _c === void 0 ? false : _c, _d = props.bgColor, bgColor = _d === void 0 ? "#dadada" : _d, _e = props.color, color = _e === void 0 ? "#000" : _e, anotherProps = __rest(props, ["children", "compact", "rounded", "border", "bgColor", "color"]);
    return (_jsxs("button", __assign({ css: css({
            padding: compact ? "0px 7px" : "5px 20px",
            borderRadius: rounded ? 2 : 0,
            background: "linear-gradient(180deg, ".concat(bgColor, "95 0%, ").concat(bgColor, " 50%, ").concat(bgColor, "95 100%)"),
            border: border ? "1px solid #ddd" : undefined,
            color: color,
            "&:hover": {
                opacity: 0.8,
            },
            "&:active": {
                filter: "contrast(0.7)",
            },
            display: "flex",
            flexDirection: "row",
            columnGap: 3,
            justifyContent: "center",
            alignItems: "center",
        }) }, anotherProps, { children: [props.icon && "".concat(props.icon, " "), props.children] })));
};
export default Button;
