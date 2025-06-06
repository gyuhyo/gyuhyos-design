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
import React from "react";
import { layerPopupStyles } from "./layer-popup-styles";
import "./animation.styles.css";
import LayerPopupHeader from "./layer-popup-header";
import LayerPopupBody from "./layer-popup-body";
import LayerPopupFooter from "./layer-popup.footer";
import LayerPopupResizingBox from "./layer-popup-resizing-box";
import { useGyudAccess } from "../access-context";
var LayerPopup = React.memo(function (props) {
    var _a, _b;
    var isAccess = useGyudAccess();
    var backdropRef = React.useRef(null);
    // 팝업 위치 상태
    var _c = __read(React.useState({
        x: 0,
        y: 0,
    }), 2), position = _c[0], setPosition = _c[1];
    var _d = __read(React.useState(false), 2), isMaximized = _d[0], setIsMaximized = _d[1];
    var _e = __read(React.useState({
        width: (_a = props.width) !== null && _a !== void 0 ? _a : 800,
        height: (_b = props.height) !== null && _b !== void 0 ? _b : 500,
    }), 2), size = _e[0], setSize = _e[1];
    React.useEffect(function () {
        var _a, _b;
        if (backdropRef.current) {
            var backdrop = backdropRef.current.getBoundingClientRect();
            setPosition({
                x: backdrop.width / 2 - ((_a = props.width) !== null && _a !== void 0 ? _a : 800) / 2,
                y: backdrop.height / 2 - ((_b = props.height) !== null && _b !== void 0 ? _b : 500) / 2,
            });
        }
    }, []);
    var onBackdropClick = function (e) {
        var container = e.target.querySelector("div[data-name='layer-popup-container']");
        if (container) {
            container.classList.add("popupShakeIt");
            setTimeout(function () {
                container.classList.remove("popupShakeIt");
                // 애니메이션 속성 초기화
                container.style.animation = "none";
            }, 500);
        }
    };
    if (isAccess && !isAccess.result) {
        throw new Error("You do not have permission to use package 'gyud'.");
    }
    return (_jsx("div", __assign({ ref: backdropRef, "data-name": "layer-popup-backdrop", css: layerPopupStyles, onClick: onBackdropClick }, { children: _jsxs("div", __assign({ "data-name": "layer-popup-container", style: {
                top: "".concat(position.y, "px"),
                left: "".concat(position.x, "px"),
                width: "".concat(size.width, "px"),
                height: "".concat(size.height, "px"),
            } }, { children: [_jsx(LayerPopupHeader, { backdropRef: backdropRef, title: props.title, isMaximized: isMaximized, setIsMaximized: setIsMaximized, position: position, setPosition: setPosition, size: size, setSize: setSize, onCloseClick: props.onCloseClick }), _jsx(LayerPopupBody, { children: props.children }), props.footer && _jsx(LayerPopupFooter, { children: props.footer }), _jsx(LayerPopupResizingBox, { isMaximized: isMaximized, setIsMaximized: setIsMaximized, size: size, setSize: setSize })] })) })));
});
export default LayerPopup;
