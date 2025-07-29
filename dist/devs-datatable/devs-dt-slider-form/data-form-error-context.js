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
import React from "react";
var DataFormErrorContext = React.createContext(undefined);
export var DataFormErrorProvider = React.memo(function (_a) {
    var children = _a.children, errors = _a.errors;
    return (_jsx(DataFormErrorContext.Provider, __assign({ value: errors }, { children: children })));
});
export var useFormErrors = function () {
    var context = React.useContext(DataFormErrorContext);
    if (context === undefined)
        throw new Error("not found data form context");
    return context;
};
