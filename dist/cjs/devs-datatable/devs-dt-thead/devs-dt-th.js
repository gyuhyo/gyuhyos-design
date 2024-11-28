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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var DevsDtTh = function (_a) {
    var _b;
    var col = _a.col;
    var setColumns = (0, devs_dt_context_1.useDt)().setColumns;
    var resizingColumnRef = react_1.default.useRef(null);
    var handleMouseDown = function (e) {
        var _a;
        resizingColumnRef.current = {
            startX: e.clientX,
            startWidth: (_a = col.width) !== null && _a !== void 0 ? _a : 100,
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    var handleMouseMove = function (e) {
        var _a;
        if (resizingColumnRef.current && setColumns !== undefined) {
            var _b = resizingColumnRef.current, startX = _b.startX, startWidth = _b.startWidth;
            var deltaX = e.clientX - startX;
            var newWidth_1 = Math.max(startWidth + deltaX, (_a = col.width) !== null && _a !== void 0 ? _a : 100); // 최소 너비 50px
            setColumns(function (prevColumns) {
                return prevColumns.map(function (m) {
                    return m.field === col.field ? __assign(__assign({}, m), { width: newWidth_1 }) : __assign({}, m);
                });
            });
        }
    };
    var handleMouseUp = function () {
        resizingColumnRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
    var defaultClassString = "devs-dt-cell devs-dt-th";
    var classString = col.sticky
        ? "".concat(defaultClassString, " devs-dt-sticky-col")
        : defaultClassString;
    return ((0, jsx_runtime_1.jsxs)("th", __assign({ className: classString, style: {
            position: "relative",
            "--width": "".concat((_b = col.width) !== null && _b !== void 0 ? _b : 100, "px"),
        } }, { children: [col.title, (0, jsx_runtime_1.jsx)("div", { style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "5px",
                    height: "100%",
                    cursor: "col-resize",
                    backgroundColor: "transparent",
                }, onMouseDown: function (e) { return handleMouseDown(e); } })] }), "col-".concat(col.field)));
};
exports.default = react_1.default.memo(DevsDtTh);
