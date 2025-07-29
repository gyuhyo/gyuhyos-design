"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var styled_1 = __importDefault(require("@emotion/styled"));
var react_2 = __importDefault(require("react"));
var RadioButton = function (_a) {
    var _b = _a.rounded, rounded = _b === void 0 ? true : _b, _c = _a.background, background = _c === void 0 ? "#aaaaaa" : _c, _d = _a.color, color = _d === void 0 ? "#000" : _d, defaultValue = _a.defaultValue, onChange = _a.onChange, items = _a.items, styles = _a.styles;
    var _e = __read(react_2.default.useState(defaultValue), 2), selectedItem = _e[0], setSelectedItem = _e[1];
    var handleChangeValue = function (value) {
        setSelectedItem(value);
        if (onChange)
            onChange(value);
    };
    if (!items || items.length === 0)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsx)(RadioButtonGroup, __assign({ className: "gyud-radio-button-group", isRounded: rounded, backgroundColor: background, css: styles ? (0, react_1.css)(styles) : null }, { children: items &&
            items.map(function (item) { return ((0, jsx_runtime_1.jsx)(RadioButtonItem, __assign({ className: "gyud-radio-button-item", isSelected: selectedItem === item.value, onClick: function () { return handleChangeValue(item.value); }, backgroundColor: background, textColor: color }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "gyud-radio-button-item-label" }, { children: item.label })) }), item.value)); }) })));
};
exports.default = RadioButton;
var RadioButtonGroup = styled_1.default.div(function (props) {
    return {
        display: "flex",
        flexDirection: "row",
        border: "1px solid ".concat(props.backgroundColor),
        borderRadius: "5px",
    };
});
var RadioButtonItem = styled_1.default.div(function (props) {
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
