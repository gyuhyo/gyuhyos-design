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
import React from "react";
import Button from "../../button";
import { FaFileExport } from "react-icons/fa6";
import { MdAdd, MdCancel, MdDelete, MdSave, MdSearch } from "react-icons/md";
var DevsDtButtons = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k = __read(React.useState(false), 2), visible = _k[0], setVisible = _k[1];
    var buttonRef = React.useRef(null);
    var popoverRef = React.useRef(null);
    var _l = __read(React.useState({ top: 0, left: 0 }), 2), position = _l[0], setPosition = _l[1];
    React.useEffect(function () {
        var handleClickOutside = function (event) {
            // buttonRef와 popoverRef 외부 클릭 감지
            if (buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                popoverRef.current &&
                !popoverRef.current.contains(event.target)) {
                setVisible(false);
            }
        };
        if (visible && buttonRef.current && popoverRef.current) {
            var buttonRect = buttonRef.current.getBoundingClientRect();
            var popover = popoverRef.current;
            var top_1 = buttonRect.bottom + 10; // 버튼 아래
            var left = buttonRect.right - popover.offsetWidth; // 버튼 우측 끝 기준
            // 화면 경계 처리 (상하좌우)
            if (top_1 + popover.offsetHeight > window.innerHeight) {
                top_1 = buttonRect.top - popover.offsetHeight - 10; // Popover를 버튼 위로
            }
            if (left + popover.offsetWidth > window.innerWidth) {
                left = window.innerWidth - popover.offsetWidth - 10; // Popover를 화면 안으로
            }
            if (left < 0) {
                left = 10; // 최소 여백
            }
            setPosition({ top: top_1, left: left });
            window.addEventListener("click", handleClickOutside);
        }
        return function () {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [visible]);
    if (((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.isVisible) === false) {
        return null;
    }
    if (((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.custom) !== undefined) {
        return props.buttons.custom;
    }
    return (_jsxs("div", __assign({ style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 3,
        } }, { children: [(props.buttons.isSearchVisible === undefined ||
                props.buttons.isSearchVisible === true) && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSearchClick }, { children: [_jsx(MdSearch, {}), " \uC870\uD68C"] }))), (props.buttons.isAddVisible === undefined ||
                props.buttons.isAddVisible === true) && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onAddClick }, { children: [_jsx(MdAdd, {}), " \uCD94\uAC00"] }))), (props.buttons.isSaveVisible === undefined ||
                props.buttons.isSaveVisible === true) && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onSaveClick }, { children: [_jsx(MdSave, {}), " ", ((_f = props.options) === null || _f === void 0 ? void 0 : _f.enabledRowCheck) === true ? "선택 저장" : "저장"] }))), (props.buttons.isDeleteVisible === undefined ||
                props.buttons.isDeleteVisible === true) && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, bgColor: "#df4873", color: "#fff", onClick: (_g = props.buttons) === null || _g === void 0 ? void 0 : _g.onDeleteClick }, { children: [_jsx(MdDelete, {}), " \uC120\uD0DD \uC0AD\uC81C"] }))), (props.buttons.isCancelVisible === undefined ||
                props.buttons.isCancelVisible === true) && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_h = props.buttons) === null || _h === void 0 ? void 0 : _h.onCancelClick }, { children: [_jsx(MdCancel, {}), " \uCDE8\uC18C"] }))), ((_j = props.buttons.export) === null || _j === void 0 ? void 0 : _j.visible) === true && (_jsxs(Button, __assign({ btnref: buttonRef, border: true, compact: true, style: { padding: "5px 7px", position: "relative" }, onClick: function () { return setVisible(function (prev) { return !prev; }); } }, { children: [_jsx(FaFileExport, {}), " Export", visible && (_jsxs("div", __assign({ ref: popoverRef, style: {
                            position: "fixed",
                            top: position.top,
                            left: position.left,
                            padding: "10px",
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 100,
                        } }, { children: [_jsx(Button, __assign({ border: true, style: { width: "100%" }, onClick: function (e) {
                                    e.stopPropagation();
                                    setVisible(false);
                                } }, { children: "Excel" })), _jsx(Button, __assign({ border: true, style: { width: "100%", marginTop: 7 }, onClick: function (e) {
                                    e.stopPropagation();
                                    setVisible(false);
                                } }, { children: "Print" }))] })))] })))] })));
};
export default DevsDtButtons;
