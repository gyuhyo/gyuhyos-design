import React from "react";
import { useDt } from "../context/devs-dt-context";
var DataRender = React.memo(function (_a) {
    var col = _a.col;
    var _b = useDt(), row = _b.focusedRow, dataSource = _b.dataSource, focusedRowForm = _b.focusedRowForm;
    var defaultValue = row === null || row === void 0 ? void 0 : row[col.field];
    var rowIndex = dataSource.indexOf(row);
    if (focusedRowForm === null)
        return null;
    return col.render({
        value: defaultValue,
        row: row,
        index: rowIndex,
        getValue: focusedRowForm.getValues,
        watch: focusedRowForm.watch,
    });
});
export default DataRender;
