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
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import "../message.styles.css";
var ToastMessage = React.memo(function (props) {
    var containerRef = React.useRef(null);
    var progressRef = React.useRef(null);
    var _a = __read(React.useState(0), 2), pauseStartTime = _a[0], setPauseStartTime = _a[1];
    var _b = __read(React.useState(0), 2), pauseTime = _b[0], setPauseTime = _b[1];
    var _c = __read(React.useState(false), 2), isHover = _c[0], setIsHover = _c[1];
    var closeToastMessage = function () {
        var leftRight = props.align.includes("Right")
            ? "closeRightToastMessage"
            : "closeLeftToastMessage";
        if (containerRef.current &&
            containerRef.current.hasAttribute("class") &&
            !containerRef.current.classList.contains(leftRight)) {
            containerRef.current.classList.add(leftRight);
        }
        setTimeout(function () {
            props.removeToastMessage(props.id);
        }, 300);
    };
    var timer;
    React.useEffect(function () {
        if (isHover)
            return;
        timer = setInterval(function () {
            var percent = ((props.endAt + pauseTime - Date.now()) / props.duration) * 100;
            if (progressRef.current) {
                progressRef.current.style.width = "".concat(percent, "%");
            }
            if (percent <= 0) {
                closeToastMessage();
                return;
            }
        }, 1);
        return function () {
            clearInterval(timer);
        };
    }, [isHover, pauseTime]);
    return (_jsxs(ToastMessageContainer, __assign({ ref: containerRef, align: props.align, length: props.length, type: props.type, setIsHover: setIsHover, setPauseStartTime: setPauseStartTime, setPauseTime: setPauseTime, pauseStartTime: pauseStartTime }, { children: [_jsxs(ToastMessageHeader, __assign({ type: props.type }, { children: [_jsx("p", __assign({ style: { fontWeight: "bold" } }, { children: props.title })), _jsx(ToastMessageHeaderCloseButton, { onClick: closeToastMessage })] })), _jsx(ToastMessageBody, { children: props.message }), _jsx(ToastMessageProgress, { ref: progressRef, type: props.type })] })));
});
var ToastMessageBody = styled.div({
    padding: 12,
    hiteSpace: "pre-wrap",
    flex: 1,
    alignContent: "center",
});
var ToastMessageHeaderCloseButton = styled.div({
    cursor: "pointer",
    "&::after": {
        content: '"\\2715"',
        color: "#f40077",
        fontWeight: "bold",
        padding: "4px 7px",
        textAlign: "center",
    },
    "&:hover::after": {
        background: "#fbdcdc",
        borderRadius: 7,
    },
});
var ToastMessageHeader = styled.div(function (props) {
    var borderImage = "linear-gradient(90deg, #0d6f9b20 0%, #0d6f9b 50%, #0d6f9b20 100%)";
    if (props.type === "error") {
        borderImage =
            "linear-gradient(90deg, #ff2c5a20 0%, #ff2c5a 50%, #ff2c5a20 100%)";
    }
    if (props.type === "warnning") {
        borderImage =
            "linear-gradient(90deg, #dc983620 0%, #dc9836 50%, #dc983620 100%)";
    }
    if (props.type === "success") {
        borderImage =
            "linear-gradient(90deg, #45bf2d20 0%, #45bf2d 50%, #45bf2d20 100%)";
    }
    return {
        flex: "none",
        padding: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid transparent",
        borderImage: borderImage,
        borderImageSlice: 1,
        boxShadow: "0px 2px 11px #00000030",
    };
});
var ToastMessageProgress = styled.div(function (props) {
    var borderImage = "#0d6f9b90";
    if (props.type === "error") {
        borderImage = "#ff2c5a90";
    }
    if (props.type === "warnning") {
        borderImage = "#dc983690";
    }
    if (props.type === "success") {
        borderImage = " #45bf2d90";
    }
    return {
        flex: "none",
        width: "100%",
        background: borderImage,
        height: 3,
        borderRadius: "5px",
    };
});
var ToastMessageContainer = function (props) {
    var DEFAULT_POSITION = 7;
    var HEIGHT = 130;
    var topBottomPosition = DEFAULT_POSITION +
        HEIGHT * (props.length - 1) +
        (props.length - 1) * 14 +
        7;
    var leftRight = props.align.includes("Right")
        ? "showRightToastMessage"
        : "showLeftToastMessage";
    var position;
    if (props.align === "topLeft") {
        position = {
            top: topBottomPosition,
            left: 7,
        };
    }
    else if (props.align === "topRight") {
        position = {
            top: topBottomPosition,
            right: 7,
        };
    }
    else if (props.align === "bottomLeft") {
        position = {
            bottom: topBottomPosition,
            left: 7,
        };
    }
    else {
        position = {
            bottom: topBottomPosition,
            right: 7,
        };
    }
    return (_jsx("div", __assign({ onMouseEnter: function () {
            props.setPauseStartTime(Date.now());
            props.setIsHover(true);
        }, onMouseLeave: function () {
            props.setPauseTime(function (prev) { return prev + (Date.now() - props.pauseStartTime); });
            props.setIsHover(false);
        }, ref: props.ref, css: css({
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            minWidth: "300px",
            height: "".concat(HEIGHT, "px"),
            background: "#ffffff90",
            borderRadius: "5px",
            zIndex: 4,
            transition: "top 200ms ease-in, left 200ms ease-in",
            backdropFilter: "blur(12px)",
            boxShadow: "5px 5px 12px #00000070",
        }), style: position, className: leftRight }, { children: props.children })));
};
export default ToastMessage;
