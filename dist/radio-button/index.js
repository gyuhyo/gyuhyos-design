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
import { Fragment as _Fragment, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import newStyled from "@emotion/styled";
import React from "react";
var RadioButton = function (_a) {
    var _b = _a.rounded, rounded = _b === void 0 ? true : _b, _c = _a.background, background = _c === void 0 ? "#aaaaaa" : _c, _d = _a.color, color = _d === void 0 ? "#000" : _d, defaultValue = _a.defaultValue, onChange = _a.onChange, items = _a.items, styles = _a.styles;
    var _e = __read(React.useState(defaultValue), 2), selectedItem = _e[0], setSelectedItem = _e[1];
    var handleChangeValue = function (value) {
        setSelectedItem(value);
        if (onChange)
            onChange(value);
    };
    if (!items || items.length === 0)
        return _jsx(_Fragment, {});
    return (_jsx(RadioButtonGroup, __assign({ className: "gyud-radio-button-group", isRounded: rounded, backgroundColor: background, css: styles ? css(styles) : null }, { children: items &&
            items.map(function (item) { return (_jsx(RadioButtonItem, __assign({ className: "gyud-radio-button-item", isSelected: selectedItem === item.value, onClick: function () { return handleChangeValue(item.value); }, backgroundColor: background, textColor: color }, { children: _jsx("div", __assign({ className: "gyud-radio-button-item-label" }, { children: item.label })) }), item.value)); }) })));
};
export default RadioButton;
var RadioButtonGroup = newStyled.div(function (props) {
    return {
        display: "flex",
        flexDirection: "row",
        border: "1px solid ".concat(props.backgroundColor),
        borderRadius: "5px",
    };
});
var RadioButtonItem = newStyled.div(function (props) {
    var selectedBg = "linear-gradient(180deg, ".concat(props.backgroundColor, "90 0%, ").concat(props.backgroundColor, " 50%, ").concat(props.backgroundColor, "90 100%)");
    var unSelectedBg = "linear-gradient(180deg, ".concat(props.backgroundColor, "30 0%, ").concat(props.backgroundColor, "50 50%, ").concat(props.backgroundColor, "30 100%)");
    var hoverBg = "linear-gradient(180deg, ".concat(props.backgroundColor, "50 0%, ").concat(props.backgroundColor, "70 50%, ").concat(props.backgroundColor, "50 100%)");
    return {
        overflow: "hidden",
        alignContent: "center",
        padding: "5px 12px",
        minWidth: "30px",
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        background: props.isSelected ? selectedBg : unSelectedBg,
        "&:hover": {
            background: props.isSelected ? selectedBg : hoverBg,
        },
        "&:not(:last-of-type)": {
            borderInlineEnd: "1px solid ".concat(props.backgroundColor),
        },
        "& .gyud-radio-button-item-label": {
            color: props.isSelected ? props.textColor : "var(--text-color)",
        },
    };
});
