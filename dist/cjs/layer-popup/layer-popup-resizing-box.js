"use strict";
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
var react_2 = __importDefault(require("react"));
var LayerPopupResizingBox = react_2.default.memo(function (props) {
    var _a = __read(react_2.default.useState(false), 2), isResizing = _a[0], setIsResizing = _a[1];
    var _b = __read(react_2.default.useState({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
    }), 2), resizeStart = _b[0], setResizeStart = _b[1];
    // 크기 조절 시작
    var handleResizeStart = function (e) {
        e.preventDefault();
        setIsResizing(true);
        setResizeStart({
            width: props.size.width,
            height: props.size.height,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });
    };
    // 크기 조절 중
    var handleResize = function (e) {
        if (!isResizing)
            return;
        if (props.isMaximized) {
            props.setIsMaximized(false);
        }
        var deltaX = e.clientX - resizeStart.mouseX;
        var deltaY = e.clientY - resizeStart.mouseY;
        var newWidth = Math.max(resizeStart.width + deltaX, 300); // 최소 너비 300px
        var newHeight = Math.max(resizeStart.height + deltaY, 200); // 최소 높이 200px
        props.setSize({
            width: newWidth,
            height: newHeight,
        });
    };
    // 크기 조절 종료
    var handleResizeEnd = function () {
        setIsResizing(false);
    };
    react_2.default.useEffect(function () {
        if (isResizing) {
            window.addEventListener("mousemove", handleResize);
            window.addEventListener("mouseup", handleResizeEnd);
        }
        else {
            window.removeEventListener("mousemove", handleResize);
            window.removeEventListener("mouseup", handleResizeEnd);
        }
        return function () {
            window.removeEventListener("mousemove", handleResize);
            window.removeEventListener("mouseup", handleResizeEnd);
        };
    }, [isResizing]);
    return ((0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-caret-down", onMouseDown: handleResizeStart, css: (0, react_1.css)({
            position: "absolute",
            bottom: 0,
            right: 0,
            fontSize: "16px",
            cursor: "se-resize",
            transform: "rotate(-45deg)",
            color: "#aaa",
        }) }));
});
exports.default = LayerPopupResizingBox;
