import React from "react";
import { useDt } from "../context/devs-dt-context";
var useDtUtils = function () {
    var _a = useDt(), columns = _a.columns, focusedCell = _a.focusedCell, setFocusedCell = _a.setFocusedCell, dataSource = _a.dataSource, setDataSource = _a.setDataSource, focusedRow = _a.focusedRow, setFocusedRow = _a.setFocusedRow, options = _a.options, formsRef = _a.formsRef;
    var lastNodes = React.useMemo(function () {
        var lastNodes = [];
        var findLastNodes = function (column) {
            if (column.children && column.children.length > 0) {
                column.children.forEach(findLastNodes);
            }
            else {
                lastNodes.push(column);
            }
        };
        columns.forEach(findLastNodes);
        return lastNodes;
    }, [columns]);
    React.useEffect(function () {
        if (!focusedRow ||
            !focusedCell ||
            (options === null || options === void 0 ? void 0 : options.editType) === "cell" ||
            focusedRow.mode === "r")
            return;
        var onFocusedCellKeyDown = function (e) {
            var current = document.querySelector(".devs-dt-cell:has(input:not([type='submit'],[type='checkbox']):focus)");
            if (!current)
                return;
            var currentForm = formsRef.current[focusedRow.rowId];
            if (!currentForm)
                return;
            var currentField = current.getAttribute("data-field");
        };
        window.addEventListener("keydown", onFocusedCellKeyDown);
        return function () {
            window.removeEventListener("keydown", onFocusedCellKeyDown);
        };
    }, [focusedCell, lastNodes, dataSource, focusedRow, options]);
};
export default useDtUtils;
