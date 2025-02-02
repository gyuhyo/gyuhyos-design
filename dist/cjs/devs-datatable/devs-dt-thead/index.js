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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var RowNumberCell = function (_a) {
    var maxDepth = _a.maxDepth;
    return ((0, jsx_runtime_1.jsx)("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border", style: { "--width": "50px" }, rowSpan: maxDepth }, { children: "No" })));
};
var RowExpandCell = react_1.default.memo(function (_a) {
    var maxDepth = _a.maxDepth, setDataSource = _a.setDataSource;
    var _b = __read(react_1.default.useState(false), 2), isExpand = _b[0], setIsExpand = _b[1];
    return ((0, jsx_runtime_1.jsx)("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border", style: { "--width": "30px", cursor: "pointer" }, rowSpan: maxDepth, onClick: function () {
            setIsExpand(!isExpand);
            setDataSource(function (prev) {
                return prev.map(function (p) { return (__assign(__assign({}, p), { expand: !isExpand })); });
            });
        } }, { children: (0, jsx_runtime_1.jsx)("button", { className: "expand_ico2 ".concat(isExpand ? "expand_ico_active2" : "") }) })));
});
var RowCheckCell = function (_a) {
    var setDataSource = _a.setDataSource, maxDepth = _a.maxDepth, isMultipleCheck = _a.isMultipleCheck;
    return ((0, jsx_runtime_1.jsx)("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border", style: { "--width": "30px" }, rowSpan: maxDepth }, { children: (isMultipleCheck === undefined || isMultipleCheck === true) && ((0, jsx_runtime_1.jsx)("input", { name: "allCheck", type: "checkbox", onChange: function (e) {
                setDataSource(function (prev) {
                    return prev.map(function (p) { return (__assign(__assign({}, p), { checked: e.target.checked })); });
                });
            } })) })));
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
    return ((0, jsx_runtime_1.jsx)("th", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col devs-dt-th-bottom-border", style: { "--width": "30px" }, rowSpan: maxDepth }, { children: "\u00A0" })));
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
    var _b = (0, devs_dt_context_1.useDt)(), columns = _b.columns, options = _b.options, setDataSource = _b.setDataSource, setColumns = _b.setColumns, sorter = _b.sorter, setSorter = _b.setSorter;
    var isResizingRef = react_1.default.useRef(false);
    var resizingColumnRef = react_1.default.useRef(null);
    var rows = generateTableRows(columns);
    var maxDepth = getMaxDepth(columns, 0) + 1;
    var theadRef = react_1.default.useRef(null);
    react_1.default.useEffect(function () {
        if (!theadRef.current)
            return;
        var width = theadRef.current.getBoundingClientRect().width;
        setHeaderWidth(width);
    }, [rows]);
    var updateColumnWidth = function (columns, targetField, newWidth) {
        return columns.map(function (column) {
            // 컬럼이 자식 컬럼을 가지는 경우
            if (column.children) {
                return __assign(__assign({}, column), { children: updateColumnWidth(column.children, targetField, newWidth) });
            }
            // field가 일치하는 컬럼을 찾아서 width 업데이트
            if (column.field === targetField) {
                return __assign(__assign({}, column), { width: newWidth });
            }
            return column;
        });
    };
    // 마우스 이동 핸들러
    var handleMouseMove = react_1.default.useCallback(function (e) {
        var _a;
        e.stopPropagation();
        if (resizingColumnRef.current && setColumns !== undefined) {
            var _b = resizingColumnRef.current, startX = _b.startX, startWidth = _b.startWidth;
            var col = columns.find(function (f) { return f.field === resizingColumnRef.current.column.field; });
            var deltaX = e.clientX - startX;
            var newWidth_1 = Math.max(startWidth + deltaX, (_a = col === null || col === void 0 ? void 0 : col.width) !== null && _a !== void 0 ? _a : 100); // 최소 너비 50px
            // columns 배열을 자식 컬럼까지 고려하여 업데이트
            setColumns(function (prevColumns) {
                var _a;
                return updateColumnWidth(prevColumns, (_a = resizingColumnRef.current) === null || _a === void 0 ? void 0 : _a.column.field, newWidth_1);
            });
        }
    }, [resizingColumnRef, setColumns]);
    // 마우스 업 핸들러
    var handleMouseUp = react_1.default.useCallback(function (e) {
        resizingColumnRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(function () {
            isResizingRef.current = false;
        }, 100);
    }, [handleMouseMove]);
    // 마우스 다운 핸들러
    var handleMouseDown = react_1.default.useCallback(function (e, col) {
        var _a;
        e.stopPropagation();
        isResizingRef.current = true;
        resizingColumnRef.current = {
            startX: e.clientX,
            startWidth: (_a = col.width) !== null && _a !== void 0 ? _a : 100,
            column: col, // 현재 컬럼 정보 저장
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);
    var checkOverflow = function (col) {
        var e_1, _a;
        var width = col.width, field = col.field;
        var targetTds = document.querySelectorAll(".devs-dt-tbody tr td[data-field='".concat(field, "']"));
        var maxWidth = width !== null && width !== void 0 ? width : 100;
        try {
            for (var targetTds_1 = __values(targetTds), targetTds_1_1 = targetTds_1.next(); !targetTds_1_1.done; targetTds_1_1 = targetTds_1.next()) {
                var td = targetTds_1_1.value;
                var div = td.querySelector("div:first-child");
                if (!div)
                    continue;
                // div의 콘텐츠 너비
                var contentWidth = div.scrollWidth;
                maxWidth = contentWidth > maxWidth ? contentWidth : maxWidth;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (targetTds_1_1 && !targetTds_1_1.done && (_a = targetTds_1.return)) _a.call(targetTds_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        setColumns(function (prev) { return updateColumnWidth(prev, field, maxWidth + 12); });
        //const tdElement = cellRef.current;
        //if (!tdElement || !divElement) return;
        // // td의 실제 너비
        // const tdWidth = tdElement.getBoundingClientRect().width;
        // // div의 콘텐츠 너비
        // const contentWidth = divElement.scrollWidth;
        // // 콘텐츠가 td보다 크다면
        // if (contentWidth > tdWidth && contentWidth > (col.width ?? 100)) {
        //   setColumns((prev) =>
        //     updateColumnWidth(prev, col.field, contentWidth + 12)
        //   );
        // }
    };
    function generateTableRows(allColumns) {
        var maxDepth = Math.max.apply(Math, __spreadArray([], __read(allColumns.map(calculateDepth)), false));
        var rows = Array.from({ length: maxDepth }, function () { return []; });
        var idx = 0;
        function fillRows(columns, depth) {
            columns.forEach(function (column, index) {
                var _a, _b;
                var rowspan = column.children ? 1 : maxDepth - depth;
                var colspan = calculateWidth(column);
                var defaultClassString = "devs-dt-cell devs-dt-th";
                var classString = column.sticky
                    ? "".concat(defaultClassString, " devs-dt-sticky-col")
                    : defaultClassString;
                if (depth > 1 &&
                    columns.length - 1 === index &&
                    allColumns.length > idx) {
                    classString = classString + " devs-dt-no-hidden-border";
                }
                if (depth === 1)
                    idx++;
                rows[depth].push((0, jsx_runtime_1.jsxs)("th", __assign({ className: classString, rowSpan: rowspan, colSpan: colspan, "data-col": true, "data-sortable": column.children === undefined &&
                        (column.sortable === undefined || column.sortable === true), "data-sorted": sorter.field === column.field, onClick: function (e) {
                        if (column.children === undefined &&
                            (column.sortable === undefined || column.sortable === true) &&
                            !isResizingRef.current) {
                            setSorter(function (prev) { return ({
                                field: prev.field !== column.field
                                    ? column.field
                                    : prev.type === "desc"
                                        ? null
                                        : column.field,
                                type: prev.field === column.field
                                    ? prev.type === "asc"
                                        ? "desc"
                                        : "asc"
                                    : "asc",
                            }); });
                        }
                    }, style: __assign({ "--width": "".concat(column.children !== undefined
                            ? "auto"
                            : ((_a = column.width) !== null && _a !== void 0 ? _a : 100) + "px"), cursor: column.children === undefined &&
                            (column.sortable === undefined || column.sortable === true)
                            ? "pointer"
                            : "inherit" }, (_b = column.style) === null || _b === void 0 ? void 0 : _b.call(column, { target: "thead", value: null, row: null })) }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ style: { whiteSpace: "pre-wrap" } }, { children: column.title })), column.children === undefined &&
                                    (column.sortable === undefined || column.sortable === true) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "asc_ico".concat(sorter.field === column.field && sorter.type === "asc"
                                                ? " sorter_active"
                                                : "") }), (0, jsx_runtime_1.jsx)("span", { className: "desc_ico".concat(sorter.field === column.field && sorter.type === "desc"
                                                ? " sorter_active"
                                                : "") })] }))] })), column.children === undefined &&
                            (column.resizing === undefined || column.resizing === true) && ((0, jsx_runtime_1.jsx)("div", { className: "devs-dt-resize-col", onMouseDown: function (e) { return handleMouseDown(e, column); }, onClick: function (e) { return e.stopPropagation(); }, onDoubleClick: function () { return checkOverflow(column); } }))] }), "col-".concat(column.field)));
                if (column.children) {
                    fillRows(column.children, depth + 1);
                }
            });
        }
        fillRows(allColumns, 0);
        return rows;
    }
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: thead, className: "devs-dt-thead-wrapper" }, { children: (0, jsx_runtime_1.jsx)("table", __assign({ ref: theadRef, className: "devs-dt-table devs-dt-table-fixed" }, { children: (0, jsx_runtime_1.jsx)("thead", __assign({ className: "devs-dt-thead" }, { children: rows.map(function (row, rowIndex) {
                    if (rowIndex === 0) {
                        return ((0, jsx_runtime_1.jsxs)("tr", __assign({ className: "devs-dt-row" }, { children: [(options === null || options === void 0 ? void 0 : options.enabledRowOrder) && ((0, jsx_runtime_1.jsx)(RowChangeOrderCell, { maxDepth: maxDepth })), (options === null || options === void 0 ? void 0 : options.enabledExpand) && ((0, jsx_runtime_1.jsx)(RowExpandCell, { maxDepth: maxDepth, setDataSource: setDataSource })), (options === null || options === void 0 ? void 0 : options.showRowNumber) && ((0, jsx_runtime_1.jsx)(RowNumberCell, { maxDepth: maxDepth })), (options === null || options === void 0 ? void 0 : options.enabledRowCheck) && ((0, jsx_runtime_1.jsx)(RowCheckCell, { setDataSource: setDataSource, maxDepth: maxDepth, isMultipleCheck: options.multipleRowCheck })), row, (0, jsx_runtime_1.jsx)("th", { className: "devs-dt-cell devs-dt-th devs-dt-empty-header", rowSpan: maxDepth }), (0, jsx_runtime_1.jsx)("th", { className: "devs-dt-cell devs-dt-th devs-dt-scrollbar-header", rowSpan: maxDepth })] }), rowIndex));
                    }
                    else {
                        return ((0, jsx_runtime_1.jsx)("tr", __assign({ className: "devs-dt-row" }, { children: row }), rowIndex));
                    }
                }) })) })) })));
}
exports.default = react_1.default.memo(DevsDtTHead);
