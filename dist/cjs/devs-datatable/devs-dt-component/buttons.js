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
var react_1 = __importDefault(require("react"));
var button_1 = __importDefault(require("../../button"));
var fa6_1 = require("react-icons/fa6");
var md_1 = require("react-icons/md");
var DevsDtButtons = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = __read(react_1.default.useState(false), 2), visible = _j[0], setVisible = _j[1];
    var buttonRef = react_1.default.useRef(null);
    var popoverRef = react_1.default.useRef(null);
    var _k = __read(react_1.default.useState({ top: 0, left: 0 }), 2), position = _k[0], setPosition = _k[1];
    react_1.default.useEffect(function () {
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
    var ButtonEventBeforeShowLoading = function (event) {
        props.setInnerLoading(true);
        var timer = setTimeout(function () {
            if (event !== undefined) {
                event();
            }
            props.setInnerLoading(false);
        }, 300);
        return function () {
            clearTimeout(timer);
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 3,
        } }, { children: [(props.buttons.isSearchVisible === undefined ||
                props.buttons.isSearchVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: function () { var _a; return ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSearchClick); } }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdSearch, {}), " \uC870\uD68C"] }))), (props.buttons.isAddVisible === undefined ||
                props.buttons.isAddVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onAddClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdAdd, {}), " \uCD94\uAC00"] }))), (props.buttons.isSaveVisible === undefined ||
                props.buttons.isSaveVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onSaveClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdSave, {}), " ", ((_e = props.options) === null || _e === void 0 ? void 0 : _e.enabledRowCheck) === true ? "선택 저장" : "저장"] }))), (props.buttons.isDeleteVisible === undefined ||
                props.buttons.isDeleteVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, bgColor: "#df4873", color: "#fff", onClick: (_f = props.buttons) === null || _f === void 0 ? void 0 : _f.onDeleteClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdDelete, {}), " \uC120\uD0DD \uC0AD\uC81C"] }))), (props.buttons.isCancelVisible === undefined ||
                props.buttons.isCancelVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_g = props.buttons) === null || _g === void 0 ? void 0 : _g.onCancelClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdCancel, {}), " \uCDE8\uC18C"] }))), ((_h = props.buttons.export) === null || _h === void 0 ? void 0 : _h.visible) === true && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ btnref: buttonRef, border: true, compact: true, style: { padding: "5px 7px", position: "relative" }, onClick: function () { return setVisible(function (prev) { return !prev; }); } }, { children: [(0, jsx_runtime_1.jsx)(fa6_1.FaFileExport, {}), " Export", visible && ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: popoverRef, style: {
                            position: "fixed",
                            top: position.top,
                            left: position.left,
                            padding: "10px",
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 100,
                        } }, { children: [(0, jsx_runtime_1.jsx)(button_1.default, __assign({ border: true, style: { width: "100%" }, onClick: function (e) {
                                    e.stopPropagation();
                                    setVisible(false);
                                } }, { children: "Excel" })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ border: true, style: { width: "100%", marginTop: 7 }, onClick: function (e) {
                                    e.stopPropagation();
                                    setVisible(false);
                                } }, { children: "Print" }))] })))] })))] })));
};
exports.default = DevsDtButtons;
