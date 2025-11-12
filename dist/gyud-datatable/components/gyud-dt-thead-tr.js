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
import newStyled from "@emotion/styled";
import React from "react";
var GyudDtTheadTr = function (_a) {
    var children = _a.children;
    return _jsx(GyudDtTrWrapper, __assign({ className: "gyud-dt-row" }, { children: children }));
};
export default React.memo(GyudDtTheadTr);
var GyudDtTrWrapper = newStyled.tr({
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
