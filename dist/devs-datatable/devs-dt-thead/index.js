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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React from "react";
import { useDt } from "../context/devs-dt-context";
var RowNumberCell = function (_a) {
    var maxDepth = _a.maxDepth;
    return (_jsx("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: { "--width": "50px" }, rowSpan: maxDepth }, { children: "No" })));
};
var RowCheckCell = function (_a) {
    var setDataSource = _a.setDataSource, maxDepth = _a.maxDepth;
    return (_jsx("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: { "--width": "30px" }, rowSpan: maxDepth }, { children: _jsx("input", { name: "allCheck", type: "checkbox", onChange: function (e) {
                setDataSource(function (prev) {
                    return prev.map(function (p) { return (__assign(__assign({}, p), { checked: e.target.checked })); });
                });
            } }) })));
};
// 트리의 깊이 계산
function calculateDepth(column) {
    if (!column.children)
        return 1;
    return 1 + Math.max.apply(Math, __spreadArray([], __read(column.children.map(calculateDepth)), false));
}
// 트리의 폭(리프 노드의 개수) 계산
function calculateWidth(column) {
    if (!column.children)
        return 1;
    return column.children.reduce(function (sum, child) { return sum + calculateWidth(child); }, 0);
}
var RowChangeOrderCell = function (_a) {
    var maxDepth = _a.maxDepth;
    return (_jsx("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: { "--width": "30px" }, rowSpan: maxDepth }, { children: "\u00A0" })));
};
function getMaxDepth(columns, currentDepth) {
    if (currentDepth === void 0) { currentDepth = 0; }
    if (!columns) {
        return currentDepth;
    }
    var maxDepth = currentDepth;
    columns.forEach(function (column) {
        // 자식 컬럼이 있을 경우, 재귀적으로 깊이를 계산
        if (column.children && column.children.length > 0) {
            var childDepth = getMaxDepth(column.children, currentDepth + 1);
            maxDepth = Math.max(maxDepth, childDepth);
        }
    });
    return maxDepth;
}
function DevsDtTHead(_a) {
    var thead = _a.thead, setHeaderWidth = _a.setHeaderWidth;
    var _b = useDt(), columns = _b.columns, options = _b.options, setDataSource = _b.setDataSource, setColumns = _b.setColumns;
    var resizingColumnRef = React.useRef(null);
    var rows = generateTableRows(columns);
    var maxDepth = getMaxDepth(columns, 0) + 1;
    var theadRef = React.useRef(null);
    React.useEffect(function () {
        if (!theadRef.current)
            return;
        var width = theadRef.current.getBoundingClientRect().width;
        setHeaderWidth(width);
    }, [rows]);
    // 마우스 이동 핸들러
    var handleMouseMove = React.useCallback(function (e) {
        var _a;
        if (resizingColumnRef.current && setColumns !== undefined) {
            var _b = resizingColumnRef.current, startX = _b.startX, startWidth = _b.startWidth;
            var col = columns.find(function (f) { return f.field === resizingColumnRef.current.column.field; });
            var deltaX = e.clientX - startX;
            var newWidth_1 = Math.max(startWidth + deltaX, (_a = col === null || col === void 0 ? void 0 : col.width) !== null && _a !== void 0 ? _a : 100); // 최소 너비 50px
            setColumns(function (prevColumns) {
                return prevColumns.map(function (m) {
                    var _a;
                    return m.field === ((_a = resizingColumnRef.current) === null || _a === void 0 ? void 0 : _a.column.field)
                        ? __assign(__assign({}, m), { width: newWidth_1 }) : __assign({}, m);
                });
            });
        }
    }, [resizingColumnRef, setColumns]);
    // 마우스 업 핸들러
    var handleMouseUp = React.useCallback(function () {
        resizingColumnRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);
    // 마우스 다운 핸들러
    var handleMouseDown = React.useCallback(function (e, col) {
        var _a;
        resizingColumnRef.current = {
            startX: e.clientX,
            startWidth: (_a = col.width) !== null && _a !== void 0 ? _a : 100,
            column: col, // 현재 컬럼 정보 저장
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);
    function generateTableRows(columns) {
        var maxDepth = Math.max.apply(Math, __spreadArray([], __read(columns.map(calculateDepth)), false));
        var rows = Array.from({ length: maxDepth }, function () { return []; });
        function fillRows(columns, depth) {
            columns.forEach(function (column) {
                var _a;
                var rowspan = column.children ? 1 : maxDepth - depth;
                var colspan = calculateWidth(column);
                var defaultClassString = "devs-dt-cell devs-dt-th";
                var classString = column.sticky
                    ? "".concat(defaultClassString, " devs-dt-sticky-col")
                    : defaultClassString;
                rows[depth].push(_jsxs("th", __assign({ className: classString, rowSpan: rowspan, colSpan: colspan, "data-col": true, style: {
                        "--width": "".concat((_a = column.width) !== null && _a !== void 0 ? _a : 100, "px"),
                    } }, { children: [_jsx("div", __assign({ style: {
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            } }, { children: _jsx("p", { children: column.title }) })), column.resizing === true && (_jsx("div", { className: "devs-dt-resize-col", onMouseDown: function (e) { return handleMouseDown(e, column); } }))] }), "col-".concat(column.field)));
                if (column.children) {
                    fillRows(column.children, depth + 1);
                }
            });
        }
        fillRows(columns, 0);
        return rows;
    }
    return (_jsx("div", __assign({ ref: thead, className: "devs-dt-thead-wrapper" }, { children: _jsx("table", __assign({ ref: theadRef, className: "devs-dt-table devs-dt-table-fixed" }, { children: _jsx("thead", __assign({ className: "devs-dt-thead" }, { children: rows.map(function (row, rowIndex) {
                    if (rowIndex === 0) {
                        return (_jsxs("tr", __assign({ className: "devs-dt-row" }, { children: [(options === null || options === void 0 ? void 0 : options.enabledRowOrder) && (_jsx(RowChangeOrderCell, { maxDepth: maxDepth })), (options === null || options === void 0 ? void 0 : options.showRowNumber) && (_jsx(RowNumberCell, { maxDepth: maxDepth })), (options === null || options === void 0 ? void 0 : options.enabledRowCheck) && (_jsx(RowCheckCell, { setDataSource: setDataSource, maxDepth: maxDepth })), row, _jsx("th", { className: "devs-dt-cell devs-dt-th devs-dt-empty-header", rowSpan: maxDepth }), _jsx("th", { className: "devs-dt-cell devs-dt-th devs-dt-scrollbar-header", rowSpan: maxDepth })] }), rowIndex));
                    }
                    else {
                        return (_jsx("tr", __assign({ className: "devs-dt-row" }, { children: row }), rowIndex));
                    }
                }) })) })) })));
}
export default React.memo(DevsDtTHead);
