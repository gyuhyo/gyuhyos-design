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
import { useGyudDt } from "../context/gyud-dt-context";
var GyudDtTBody = function (_a) {
    var children = _a.children;
    var tbodyRef = useGyudDt(function (state) { return state; }).tbodyRef;
    return _jsx(GyudDtTBodyWrapper, __assign({ ref: tbodyRef }, { children: children }));
};
export default GyudDtTBody;
var GyudDtTBodyWrapper = newStyled.tbody({
    position: "relative",
    display: "table-row-group",
    height: "100%",
    width: "100%",
});
