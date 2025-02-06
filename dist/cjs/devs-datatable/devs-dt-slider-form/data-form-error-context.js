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
exports.useFormErrors = exports.DataFormErrorProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var DataFormErrorContext = react_1.default.createContext(undefined);
exports.DataFormErrorProvider = react_1.default.memo(function (_a) {
    var children = _a.children, errors = _a.errors;
    return ((0, jsx_runtime_1.jsx)(DataFormErrorContext.Provider, __assign({ value: errors }, { children: children })));
});
var useFormErrors = function () {
    var context = react_1.default.useContext(DataFormErrorContext);
    if (context === undefined)
        throw new Error("not found data form context");
    return context;
};
exports.useFormErrors = useFormErrors;
