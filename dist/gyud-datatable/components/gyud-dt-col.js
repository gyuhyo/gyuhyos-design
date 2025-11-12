import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import newStyled from "@emotion/styled";
var GyudDtCol = function (_a) {
    var column = _a.column;
    return (_jsx(GyudDtColWrapper, { "data-field": column.field, style: {
            width: typeof column.width === "string"
                ? column.width
                : "".concat(column.width || 100, "px"),
        } }, column.field));
};
export default GyudDtCol;
var GyudDtColWrapper = newStyled.col({
    display: "table-column",
});
