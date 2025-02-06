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
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import DevsDtButtons from "./devs-dt-component/buttons";
var DevsDtHeader = function (props) {
    var _a, _b, _c, _d, _e, _f, _g;
    return (_jsx(React.Fragment, { children: (props.title !== undefined ||
            (typeof props.title === "string" && props.title !== "") ||
            ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick) !== undefined ||
            ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onSearchClick) !== undefined ||
            ((_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSaveClick) !== undefined ||
            ((_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onCancelClick) !== undefined ||
            ((_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onDeleteClick) !== undefined ||
            ((_f = props.buttons) === null || _f === void 0 ? void 0 : _f.custom) !== undefined) && (_jsxs("div", __assign({ style: {
                flex: "none",
                minHeight: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 7,
                flexWrap: "wrap",
                gap: "7px",
                background: "linear-gradient(180deg, rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
                border: "1px solid rgb(199, 199, 199)",
                padding: "0.5rem 0.75rem",
            } }, { children: [props.title !== undefined && (_jsxs("div", __assign({ css: css({
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        columnGap: 7,
                    }) }, { children: [typeof props.title === "string" && props.title !== "" ? (_jsxs("p", __assign({ style: { fontSize: 18, fontWeight: "bold" } }, { children: ["\u27A4 ", props.title] }))) : (props.title), (((_g = props.options) === null || _g === void 0 ? void 0 : _g.readonly) === undefined ||
                            props.options.readonly === false) && (_jsxs("span", __assign({ style: {
                                fontSize: 12,
                                color: "#7a7a7a",
                                marginLeft: props.title !== undefined && props.title !== ""
                                    ? "7px"
                                    : "0px",
                            } }, { children: ["(", _jsx("span", __assign({ style: { color: "#000" } }, { children: "*" })), ") \uC785\uB825 \uAC00\uB2A5 (", _jsx("span", __assign({ style: { color: "red" } }, { children: "*" })), ") \uD544\uC218\uC785\uB825"] })))] }))), _jsx(DevsDtButtons, { buttons: props.buttons, options: props.options, setInnerLoading: props.setInnerLoading })] }))) }));
};
export default React.memo(DevsDtHeader);
