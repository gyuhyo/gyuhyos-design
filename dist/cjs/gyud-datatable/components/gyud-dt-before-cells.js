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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyudDtRowCheckCell = exports.GyudDtRowCheckHeaderCell = exports.GyudDtEmptyHeaderCell = exports.GyudDtRowNumberCell = exports.GyudDtRowNumberHeaderCell = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var gyud_dt_context_1 = require("../context/gyud-dt-context");
var gyud_dt_th_1 = require("./gyud-dt-th");
var GyudDtRowNumberHeaderCell = function () {
    var getMaxDepth = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }).getMaxDepth;
    var maxDepth = getMaxDepth();
    return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": "0px",
            top: 0,
            zIndex: 2,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }, { children: "No" })));
};
exports.GyudDtRowNumberHeaderCell = GyudDtRowNumberHeaderCell;
var GyudDtRowNumberCell = function (_a) {
    var index = _a.index;
    return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col gyud-dt-index-cell", style: {
            "--sticky-col-left": "0px",
            width: "55px",
            height: "30px",
            zIndex: 1,
        }, rowSpan: 1, colSpan: 1 }, { children: index + 1 })));
};
exports.GyudDtRowNumberCell = GyudDtRowNumberCell;
var GyudDtEmptyHeaderCell = function () {
    var getMaxDepth = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }).getMaxDepth;
    var maxDepth = getMaxDepth();
    return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.GyudDtThWrapper, { className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            top: 0,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }));
};
exports.GyudDtEmptyHeaderCell = GyudDtEmptyHeaderCell;
var GyudDtRowCheckHeaderCell = function () {
    var _a = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, options = _a.options;
    var maxDepth = getMaxDepth();
    var left = options.isShowRowNumber ? "55px" : "0px";
    return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": left,
            top: 0,
            zIndex: 2,
            borderBlockEndWidth: "2px",
        }, rowSpan: maxDepth, colSpan: 1 }, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox" }) })));
};
exports.GyudDtRowCheckHeaderCell = GyudDtRowCheckHeaderCell;
var GyudDtRowCheckCell = function () {
    var _a = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }), getMaxDepth = _a.getMaxDepth, options = _a.options;
    var maxDepth = getMaxDepth();
    var left = options.isShowRowNumber ? "55px" : "0px";
    return ((0, jsx_runtime_1.jsx)(gyud_dt_th_1.GyudDtThWrapper, __assign({ className: "gyud-dt-th gyud-dt-cell gyud-dt-sticky-col", style: {
            "--sticky-col-left": left,
            top: 0,
            width: "25px",
            height: "30px",
            zIndex: 1,
            alignContent: "center",
        }, colSpan: 1 }, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox" }) })));
};
exports.GyudDtRowCheckCell = GyudDtRowCheckCell;
