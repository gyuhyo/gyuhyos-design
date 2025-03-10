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
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import DevsDtButtons from "./devs-dt-component/buttons";
import Button from "../button";
var DevsDtHeader = function (props) {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h = __read(React.useState(false), 2), isDetailSearchFormOpen = _h[0], setIsDetailSearchFormOpen = _h[1];
    return (_jsx(React.Fragment, { children: (props.title !== undefined ||
            (typeof props.title === "string" && props.title !== "") ||
            ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick) !== undefined ||
            ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onSearchClick) !== undefined ||
            ((_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSaveClick) !== undefined ||
            ((_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onCancelClick) !== undefined ||
            ((_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onDeleteClick) !== undefined ||
            ((_f = props.buttons) === null || _f === void 0 ? void 0 : _f.custom) !== undefined) && (_jsxs("div", __assign({ style: {
                position: "relative",
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
                            } }, { children: ["(", _jsx("span", __assign({ style: { color: "#000" } }, { children: "*" })), ") \uC785\uB825 \uAC00\uB2A5 (", _jsx("span", __assign({ style: { color: "red" } }, { children: "*" })), ") \uD544\uC218\uC785\uB825"] })))] }))), _jsx(DevsDtButtons, { buttons: props.buttons, options: props.options, setInnerLoading: props.setInnerLoading, isDetailSearchFormOpen: isDetailSearchFormOpen, setIsDetailSearchFormOpen: setIsDetailSearchFormOpen }), _jsx(DetailSearchForm, { isDetailSearchFormOpen: isDetailSearchFormOpen, setIsDetailSearchFormOpen: setIsDetailSearchFormOpen })] }))) }));
};
export default React.memo(DevsDtHeader);
var DetailSearchForm = function (_a) {
    var isDetailSearchFormOpen = _a.isDetailSearchFormOpen, setIsDetailSearchFormOpen = _a.setIsDetailSearchFormOpen;
    var formRef = React.useRef(null);
    var _b = __read(React.useState(0), 2), searchSize = _b[0], setSearchSize = _b[1];
    var timer;
    React.useEffect(function () {
        if (!formRef.current)
            return;
        if (isDetailSearchFormOpen) {
            formRef.current.style.visibility = "visible";
        }
        else {
            timer = setTimeout(function () {
                formRef.current.style.visibility = "hidden";
            }, 300);
        }
        return function () { return clearTimeout(timer); };
    }, [isDetailSearchFormOpen]);
    return (_jsxs("div", __assign({ ref: React.useCallback(function (node) {
            if (!node)
                return;
            formRef.current = node;
            setSearchSize(node.getBoundingClientRect().height);
        }, []), css: css({
            position: "absolute",
            right: 7,
            bottom: isDetailSearchFormOpen
                ? searchSize * -1 - 15
                : searchSize * -1 + 20,
            width: "auto",
            height: "auto",
            overflow: "hidden",
            background: "#fff",
            zIndex: 4,
            transition: "opacity 300ms ease-in-out, bottom 300ms ease-out",
            border: "1px solid #c6c6c6",
            boxShadow: "3px 3px 12px #00000050",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            rowGap: 14,
        }), style: {
            opacity: isDetailSearchFormOpen ? 1 : 0,
        } }, { children: [_jsxs("div", __assign({ css: css({
                    position: "relative",
                    flex: "none",
                    minHeight: "50px",
                    display: "flex",
                    flexFlow: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "7px",
                    background: "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
                    border: "1px solid rgb(199, 199, 199)",
                    padding: "0.5rem 0.75rem",
                }) }, { children: [_jsx("h3", __assign({ style: { margin: 0 } }, { children: "\uC0C1\uC138 \uAC80\uC0C9 \uC870\uAC74 \uC124\uC815" })), _jsx(Button, __assign({ border: true, bgColor: "#df4873", borderColor: "#f15151", color: "#fff", css: css({
                            fontWeight: "bold",
                            width: 25,
                            height: 25,
                            padding: 0,
                        }), onClick: function () { return setIsDetailSearchFormOpen(false); } }, { children: "\u2715" }))] })), _jsxs("div", { children: [_jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" }), _jsx("p", { children: "123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda" })] })] })));
};
