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
var styled_1 = __importDefault(require("@emotion/styled"));
var react_1 = __importDefault(require("react"));
var GyudDtTheadTr = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(GyudDtTrWrapper, __assign({ className: "gyud-dt-row" }, { children: children }));
};
exports.default = react_1.default.memo(GyudDtTheadTr);
var GyudDtTrWrapper = styled_1.default.tr({
    display: "table-row",
    "&.gyud-dt-odd-row > .gyud-dt-cell": {
        backgroundColor: "#e6e6e6",
    },
    "&.gyud-dt-even-row > .gyud-dt-cell": {
        backgroundColor: "#fff",
    },
    "&:hover > .gyud-dt-td": {
        backgroundColor: "#dff3ff",
    },
});
