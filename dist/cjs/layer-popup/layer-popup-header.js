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
var react_1 = __importDefault(require("react"));
var LayerPopupHeader = react_1.default.memo(function (props) {
    var _a;
    var _b = __read(react_1.default.useState(false), 2), isDragging = _b[0], setIsDragging = _b[1];
    var _c = __read(react_1.default.useState({ x: 0, y: 0 }), 2), startPos = _c[0], setStartPos = _c[1];
    var _d = __read(react_1.default.useState({
        width: 800,
        height: 500,
    }), 2), beforeMaximizedSize = _d[0], setBeforeMaximizedSize = _d[1];
    var _e = __read(react_1.default.useState({
        x: 0,
        y: 0,
    }), 2), beforeMaximizedPosition = _e[0], setBeforeMaximizedPosition = _e[1];
    var handleMouseDown = function (e) {
        e.preventDefault();
        setIsDragging(true);
        setStartPos({
            x: e.clientX - props.position.x,
            y: e.clientY - props.position.y,
        });
    };
    var handleMouseMove = function (e) {
        if (!isDragging || props.isMaximized)
            return;
        var newX = e.clientX - startPos.x;
        var newY = e.clientY - startPos.y;
        if (newX < 0 || newY < 0 || !props.backdropRef.current)
            return;
        var backdrop = props.backdropRef.current.getBoundingClientRect();
        if (backdrop.height < newY + props.size.height / 2 ||
            backdrop.width < newX + props.size.width / 2)
            return;
        props.setPosition({ x: newX, y: newY });
    };
    var handleMouseUp = function () {
        setIsDragging(false);
    };
    react_1.default.useEffect(function () {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return function () {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);
    var onMaximizedClick = function () {
        if (!props.backdropRef.current || props.isMaximized)
            return;
        var container = document.querySelector("div[data-name='layer-popup-container']");
        if (container &&
            !props.isMaximized &&
            !container.classList.contains("softResizing")) {
            container.classList.add("softResizing");
        }
        var _a = props.backdropRef.current.getBoundingClientRect(), backdropWidth = _a.width, backdropHeight = _a.height;
        props.setIsMaximized(true);
        setBeforeMaximizedPosition({
            x: props.position.x,
            y: props.position.y,
        });
        setBeforeMaximizedSize({
            width: props.size.width,
            height: props.size.height,
        });
        props.setSize({
            width: backdropWidth - 14,
            height: backdropHeight - 14,
        });
        props.setPosition({
            x: 7,
            y: 7,
        });
    };
    var onMinimizedClick = function () {
        if (!props.isMaximized)
            return;
        if (beforeMaximizedSize.width === 0 || beforeMaximizedSize.height === 0)
            return;
        props.setIsMaximized(false);
        props.setSize({
            width: beforeMaximizedSize.width,
            height: beforeMaximizedSize.height,
        });
        props.setPosition({
            x: beforeMaximizedPosition.x,
            y: beforeMaximizedPosition.y,
        });
        // 상태 업데이트 이후 DOM 클래스 변경
        var timer = setTimeout(function () {
            var container = document.querySelector("div[data-name='layer-popup-container']");
            if (container) {
                container.classList.remove("softResizing");
            }
        }, 200);
        return function () { return clearTimeout(timer); };
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ "data-name": "layer-popup-header" }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ onDoubleClick: props.isMaximized ? onMinimizedClick : onMaximizedClick, onMouseDown: handleMouseDown }, { children: (_a = props.title) !== null && _a !== void 0 ? _a : "Un Titled" })), (0, jsx_runtime_1.jsxs)("div", __assign({ "data-name": "layer-popup-header-buttons" }, { children: [(0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-compress", onClick: onMinimizedClick }), (0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-expand", onClick: onMaximizedClick }), (0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-xmark", onClick: props.onCloseClick })] }))] })));
});
exports.default = LayerPopupHeader;
