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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
var LayerPopupResizingBox = React.memo(function (props) {
    var _a = __read(React.useState(false), 2), isResizing = _a[0], setIsResizing = _a[1];
    var _b = __read(React.useState({
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
    React.useEffect(function () {
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
    return (_jsx("i", { className: "fa-solid fa-caret-down", onMouseDown: handleResizeStart, css: css({
            position: "absolute",
            bottom: 0,
            right: 0,
            fontSize: "16px",
            cursor: "se-resize",
            transform: "rotate(-45deg)",
            color: "#aaa",
        }) }));
});
export default LayerPopupResizingBox;
