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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useGyudDt } from "../context/gyud-dt-context";
import { GyudDtThWrapper } from "./gyud-dt-th";
export var GyudDtRowNumberHeaderCell = function () {
    var getMaxDepth = useGyudDt(function (state) { return state; }).getMaxDepth;
    var maxDepth = getMaxDepth();
    return (_jsx(GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": "0px",
            top: 0,
            zIndex: 2,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }, { children: "No" })));
};
export var GyudDtRowNumberCell = function (_a) {
    var index = _a.index;
    return (_jsx(GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col gyud-dt-index-cell", style: {
            "--sticky-col-left": "0px",
            width: "55px",
            height: "30px",
            zIndex: 1,
        }, rowSpan: 1, colSpan: 1 }, { children: index + 1 })));
};
export var GyudDtEmptyHeaderCell = function () {
    var getMaxDepth = useGyudDt(function (state) { return state; }).getMaxDepth;
    var maxDepth = getMaxDepth();
    return (_jsx(GyudDtThWrapper, { className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            top: 0,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }));
};
export var GyudDtRowCheckHeaderCell = function () {
    var _a = useGyudDt(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, options = _a.options;
    var maxDepth = getMaxDepth();
    var left = options.isShowRowNumber ? "55px" : "0px";
    return (_jsx(GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": left,
            top: 0,
            zIndex: 2,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }, { children: _jsx("input", { type: "checkbox" }) })));
};
export var GyudDtRowCheckCell = function () {
    var _a = useGyudDt(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, options = _a.options;
    var maxDepth = getMaxDepth();
    var left = options.isShowRowNumber ? "55px" : "0px";
    return (_jsx(GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": left,
            top: 0,
            width: "25px",
            height: "30px",
            zIndex: 1,
            alignContent: "center",
        }, colSpan: 1 }, { children: _jsx("input", { type: "checkbox" }) })));
};
