import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context";
import GyudDtCol from "./gyud-dt-col";
var GyudDtColGroup = function () {
    var _a = useGyudDt(function (state) { return state; }), getLastNodes = _a.getLastNodes, options = _a.options;
    var columns = getLastNodes();
    return (_jsxs(GyudDtColGroupWrapper, { children: [options.isShowRowNumber && (_jsx(GyudDtCol, { column: { field: "rowNumber", title: "Row Number", width: 55 } })), options.isRowCheckable && (_jsx(GyudDtCol, { column: { field: "rowCheck", title: "Row Check", width: 25 } })), columns.map(function (column) { return (_jsx(GyudDtCol, { column: column }, column.field)); }), _jsx(GyudDtCol, { column: { field: "empty-cell", title: "", width: "100%" } })] }));
};
export default GyudDtColGroup;
var GyudDtColGroupWrapper = newStyled.colgroup({
    display: "table-column-group",
});
