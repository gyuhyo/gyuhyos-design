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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { useResizeObserver } from "../devs-datatable/hooks/useResizeObserver";
var DevsSplitContainer = React.memo(function (_a) {
    var children = _a.children, _b = _a.align, align = _b === void 0 ? "column" : _b, sizes = _a.sizes, onSizeChanged = _a.onSizeChanged, disabled = _a.disabled;
    var selectorRef = React.useRef(null);
    var changedPanelsPercent = React.useRef([]);
    var _c = __read(React.useState(false), 2), isSet = _c[0], setIsSet = _c[1];
    var _d = __read(React.useState(false), 2), isMobile = _d[0], setIsMobile = _d[1];
    var containerRef = React.useRef(null);
    var _e = useResizeObserver(containerRef), width = _e.width, height = _e.height;
    var childrenLength = Array.isArray(children) ? children.length : 1;
    var realAlign = isMobile ? "column" : align;
    var usingSize = realAlign === "row" ? width : height;
    var availableSize = usingSize - 9 * (childrenLength - 1);
    React.useEffect(function () {
        if (typeof window === "undefined")
            return;
        if (window.innerWidth <= 1200) {
            setIsMobile(true);
        }
        var browserResizing = function () {
            if (window.innerWidth <= 1200) {
                setIsMobile(true);
            }
            else {
                setIsMobile(false);
            }
        };
        window.addEventListener("resize", browserResizing);
        return function () { return window.removeEventListener("resize", browserResizing); };
    }, []);
    React.useEffect(function () {
        var _a, _b;
        if (!containerRef.current || usingSize <= 0)
            return;
        if (!Array.isArray(children))
            return;
        var size = [];
        if (changedPanelsPercent.current.length > 0) {
            var remainingSize = availableSize;
            for (var i = 0; i < childrenLength; i++) {
                if (((_a = changedPanelsPercent.current) === null || _a === void 0 ? void 0 : _a[i]) === undefined)
                    break;
                if (((_b = changedPanelsPercent.current) === null || _b === void 0 ? void 0 : _b[i]) !== undefined) {
                    var s = changedPanelsPercent.current[i];
                    var sz = (availableSize / 100) * s;
                    size.push("".concat(sz, "px"));
                    remainingSize -= sz;
                }
            }
            if (size.length < childrenLength) {
                var minus = childrenLength - size.length;
                for (var i = 0; i < minus; i++) {
                    size.push("".concat(remainingSize / minus, "px"));
                }
            }
        }
        else {
            if (sizes === undefined) {
                size = Array.from({ length: childrenLength }, function () { return "".concat(availableSize / childrenLength, "px"); });
            }
            else {
                var remainingSize = availableSize;
                for (var i = 0; i < childrenLength; i++) {
                    if (!(sizes === null || sizes === void 0 ? void 0 : sizes[i]))
                        break;
                    if (sizes === null || sizes === void 0 ? void 0 : sizes[i]) {
                        if (typeof sizes[i] === "number") {
                            size.push("".concat(sizes[i], "px"));
                            remainingSize -= sizes[i];
                        }
                        else {
                            var s = sizes[i];
                            if (s.includes("%")) {
                                var sz = (availableSize / 100) * parseFloat(s.replace("%", ""));
                                size.push("".concat(sz, "px"));
                                remainingSize -= sz;
                            }
                            else {
                                size.push(s);
                                remainingSize -= parseFloat(s.replace("px", ""));
                            }
                        }
                    }
                }
                if (size.length < childrenLength) {
                    var minus = childrenLength - size.length;
                    for (var i = 0; i < minus; i++) {
                        size.push("".concat(remainingSize / minus, "px"));
                    }
                }
            }
        }
        var panels = containerRef.current.querySelectorAll("& > [data-split-type='panel']");
        var containerSize = realAlign === "column"
            ? containerRef.current.clientHeight
            : containerRef.current.clientWidth;
        for (var idx in size) {
            var sizeNumber = parseFloat(size[idx].replace("px", ""));
            if (sizeNumber > containerSize ||
                sizeNumber > 10000 ||
                containerSize > 10000)
                continue;
            if (panels === null || panels === void 0 ? void 0 : panels[idx]) {
                panels[idx].style.flexBasis = size[idx];
            }
        }
    }, [width, height, usingSize, realAlign]);
    var onSplitBarMouseDown = function (e, index) {
        var _a;
        if ((_a = disabled === null || disabled === void 0 ? void 0 : disabled[index]) !== null && _a !== void 0 ? _a : false)
            return;
        changedPanelsPercent.current = [];
        var prev = e.currentTarget.parentElement
            .previousElementSibling;
        var next = e.currentTarget.parentElement
            .nextElementSibling;
        var startPosiition = 0;
        if (e.nativeEvent instanceof MouseEvent) {
            startPosiition =
                realAlign === "row" ? e.nativeEvent.clientX : e.nativeEvent.clientY;
        }
        if (e.nativeEvent instanceof TouchEvent) {
            startPosiition =
                realAlign === "row"
                    ? e.nativeEvent.touches[0].clientX
                    : e.nativeEvent.touches[0].clientY;
        }
        selectorRef.current = {
            target: e.currentTarget,
            startPosition: startPosiition,
            prevSize: parseFloat(prev.style.flexBasis.replace("px", "")),
            nextSize: parseFloat(next.style.flexBasis.replace("px", "")),
        };
        if (e.nativeEvent instanceof MouseEvent) {
            document.addEventListener("mousemove", onSplitBarMouseMove);
            document.addEventListener("mouseup", onSplitBarMouseUp);
        }
        else {
            document.addEventListener("touchmove", onSplitBarMouseMove);
            document.addEventListener("touchend", onSplitBarMouseUp);
        }
    };
    var onSplitBarMouseMove = function (e) {
        if (!selectorRef.current)
            return;
        var deltaX = 0;
        if (e instanceof MouseEvent) {
            deltaX =
                (realAlign === "row" ? e.clientX : e.clientY) -
                    selectorRef.current.startPosition;
        }
        if (e instanceof TouchEvent) {
            deltaX =
                (realAlign === "row" ? e.touches[0].clientX : e.touches[0].clientY) -
                    selectorRef.current.startPosition;
        }
        var prev = selectorRef.current.target.parentElement
            .previousElementSibling;
        var next = selectorRef.current.target.parentElement
            .nextElementSibling;
        var prevSize = Math.max(selectorRef.current.prevSize + deltaX, 0);
        var nextSize = Math.max(selectorRef.current.nextSize - deltaX, 0);
        var summarySize = selectorRef.current.prevSize + selectorRef.current.nextSize;
        if (prevSize === 0) {
            prev.style.flexBasis = "0px";
            next.style.flexBasis = "".concat(summarySize, "px");
            return;
        }
        if (nextSize === 0) {
            prev.style.flexBasis = "".concat(summarySize, "px");
            next.style.flexBasis = "0px";
            return;
        }
        prev.style.flexBasis = "".concat(prevSize, "px");
        next.style.flexBasis = "".concat(nextSize, "px");
    };
    var onSplitBarMouseUp = function () {
        var e_1, _a;
        if (!selectorRef.current)
            return;
        selectorRef.current = null;
        var panels = Array.from(containerRef.current.children).filter(function (el) { return el.getAttribute("data-split-type") === "panel"; });
        var sizes = [];
        try {
            for (var panels_1 = __values(panels), panels_1_1 = panels_1.next(); !panels_1_1.done; panels_1_1 = panels_1.next()) {
                var panel = panels_1_1.value;
                var p = panel;
                var flexBasis = parseFloat(p.style.flexBasis.replace("px", ""));
                sizes.push(flexBasis);
                var per = (flexBasis / availableSize) * 100;
                changedPanelsPercent.current.push(per);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (panels_1_1 && !panels_1_1.done && (_a = panels_1.return)) _a.call(panels_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        onSizeChanged === null || onSizeChanged === void 0 ? void 0 : onSizeChanged(sizes);
        document.removeEventListener("mousemove", onSplitBarMouseMove);
        document.removeEventListener("mouseup", onSplitBarMouseUp);
        document.removeEventListener("touchmove", onSplitBarMouseMove);
        document.removeEventListener("touchend", onSplitBarMouseUp);
    };
    return (_jsx(SplitContainer, __assign({ ref: containerRef, align: realAlign }, { children: Array.from({ length: childrenLength }, function (v, i) {
            var _a, _b;
            return (_jsxs(React.Fragment, { children: [_jsx(SplitPanel, __assign({ "data-split-type": "panel", size: Array.isArray(children) ? (_a = sizes === null || sizes === void 0 ? void 0 : sizes[i]) !== null && _a !== void 0 ? _a : "100%" : "100%" }, { children: Array.isArray(children) ? children[i] : children })), i !== childrenLength - 1 && (_jsxs(SplitBar, __assign({ align: realAlign, fullSize: usingSize }, { children: [_jsx(SplitterTrack, { "data-split-type": "track", align: realAlign, onMouseDown: function (e) { return onSplitBarMouseDown(e, i); }, onTouchStart: function (e) { return onSplitBarMouseDown(e, i); }, disabled: (_b = disabled === null || disabled === void 0 ? void 0 : disabled[i]) !== null && _b !== void 0 ? _b : false }), _jsx(Splitter, { "data-split-type": "splitter", align: realAlign })] })))] }, "spanel-".concat(i)));
        }) })));
});
export default DevsSplitContainer;
var SplitterTrack = styled.div(function (props) { return ({
    position: "absolute",
    width: props.align === "row" ? "7px" : "100%",
    height: props.align === "row" ? "100%" : "7px",
    background: "#b2d7ff",
    top: props.align === "row" ? 0 : 1,
    left: props.align === "row" ? 1 : 0,
    borderRadius: "5px",
    opacity: 0,
    "&:hover": {
        opacity: props.disabled ? 0 : 1,
        transition: "opacity 200ms ease-in",
        cursor: props.disabled
            ? "not-allowed"
            : props.align === "row"
                ? "col-resize"
                : "row-resize",
    },
    "&:active": {
        opacity: props.disabled ? 0 : 1,
        transition: "opacity 200ms ease-in",
        background: "#8ac2ff",
        cursor: props.disabled
            ? "not-allowed"
            : props.align === "row"
                ? "col-resize"
                : "row-resize",
    },
}); });
var Splitter = styled.div(function (props) { return ({
    position: "absolute",
    width: props.align === "row" ? "2px" : "50px",
    height: props.align === "row" ? "50px" : "2px",
    background: "#00000090",
    top: props.align === "row" ? "50%" : "calc(50% - calc(1px / 2))",
    left: props.align === "row" ? "calc(50% - calc(1px / 2))" : "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    pointerEvents: "none",
}); });
var SplitBar = styled.div(function (props) { return ({
    width: props.align === "row" ? "9px" : "100%",
    height: props.align === "row" ? "100%" : "9px",
    position: "relative",
    transition: "width 200ms ease-in, height 200ms ease-in",
}); });
var SplitPanel = styled.div(function (props) { return ({
    flexBasis: props.size,
    flexGrow: 0,
    overflow: "hidden",
}); });
var SplitContainer = styled.div(function (props) { return ({
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: props.align,
    overflow: "hidden",
}); });
