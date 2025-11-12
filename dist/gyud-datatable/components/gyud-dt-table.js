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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import newStyled from "@emotion/styled";
import GyudDtColGroup from "./gyud-dt-col-group";
import GyudDtTBody from "./gyud-dt-tbody";
import GyudDtThead from "./gyud-dt-thead";
import { useGyudDt } from "../context/gyud-dt-context";
import EmptySvg from "../../devs-datatable/assets/empty.svg";
var GyudDtTableEmptyWrapper = function () {
    return (_jsx("tr", { children: _jsx("td", __assign({ colSpan: 100, style: { height: "100%" } }, { children: _jsx(EmptySvg, {}) })) }));
};
var GyudDtTable = function (_a) {
    var children = _a.children, style = _a.style, rest = __rest(_a, ["children", "style"]);
    var setTableRef = useGyudDt(function (state) { return state; }).setTableRef;
    var isEmpty = !children || (Array.isArray(children) && children.length === 0);
    return (_jsxs(GyudDtTableWrapper, __assign({ style: __assign(__assign({}, style), { width: "none", height: isEmpty ? "100%" : style.height }) }, rest, { ref: function (ref) { return setTableRef(ref); } }, { children: [_jsx(GyudDtColGroup, {}), _jsx(GyudDtThead, {}), _jsx(GyudDtTBody, { children: isEmpty ? _jsx(GyudDtTableEmptyWrapper, {}) : children })] })));
};
export default GyudDtTable;
var GyudDtTableWrapper = newStyled.table({
    display: "table",
    width: "fit-content",
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: "fixed",
    height: "100%",
    "& .gyud-dt-td": {
        height: "inherit",
        padding: "0px 3px",
    },
    "& .gyud-dt-cell": {
        borderInlineEnd: "1px solid #c6c6c6",
        borderBlockEnd: "1px solid #c6c6c6",
    },
    "& .gyud-dt-th[data-is-last-node='true']": {
        borderBlockEndWidth: "2px",
    },
});
