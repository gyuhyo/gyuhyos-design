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
import { createStore } from "zustand";
import uuid from "react-uuid";
export var createDtStore = function () {
    return createStore(function (set, get) { return ({
        columns: [],
        dataSource: [],
        options: {
            isShowRowNumber: false,
            isRowCheckable: false,
        },
        scrollOffset: 0,
        tbodyRef: null,
        theadRef: null,
        tableRef: null,
        focusedCell: { rowId: "", field: "" },
        focusedRow: "",
        setFocusedCell: function (focusedCell) {
            set(function (state) {
                var newFocusedCell = typeof focusedCell === "function"
                    ? focusedCell(state.focusedCell)
                    : focusedCell;
                if (newFocusedCell.rowId === state.focusedCell.rowId &&
                    newFocusedCell.field === state.focusedCell.field) {
                    return state;
                }
                return __assign(__assign({}, state), { focusedCell: newFocusedCell });
            });
        },
        setFocusedRow: function (row) {
            set(function (state) { return (__assign(__assign({}, state), { focusedRow: row })); });
        },
        setTableRef: function (ref) {
            if (!get().tableRef) {
                set(function (state) { return (__assign(__assign({}, state), { tableRef: { current: ref } })); });
            }
        },
        setTheadRef: function (ref) {
            if (!get().theadRef) {
                set(function (state) { return (__assign(__assign({}, state), { theadRef: { current: ref } })); });
            }
        },
        setTbodyRef: function (ref) {
            if (!get().tbodyRef) {
                set(function (state) { return (__assign(__assign({}, state), { tbodyRef: { current: ref } })); });
            }
        },
        setColumns: function (updater) {
            return set(function (prev) { return (__assign(__assign({}, prev), { columns: typeof updater === "function"
                    ? updater(prev.columns)
                    : updater })); });
        },
        initializeColumns: function (columns) {
            set(function (state) {
                var isLastStickyCol = function (column) {
                    var lastNodes = function (columns) {
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
                    };
                    var filteredLastNodes = lastNodes(columns).filter(function (node) { return node.sticky; });
                    var index = filteredLastNodes.findIndex(function (node) { return node.field === column.field; });
                    return index === filteredLastNodes.length - 1;
                };
                var calcHeader = function (nodes) {
                    var maxDepth = getMaxDepth(nodes);
                    var dfs = function (node, depth) {
                        var _a, _b, _c;
                        if (!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length)) {
                            return __assign(__assign({}, node), { width: (_b = node.width) !== null && _b !== void 0 ? _b : 100, depth: depth, colSpan: 1, rowSpan: maxDepth - depth + 1, isLastStickyCol: isLastStickyCol(node) });
                        }
                        var children = node.children.map(function (c) { return dfs(c, depth + 1); });
                        return __assign(__assign({}, node), { width: (_c = node.width) !== null && _c !== void 0 ? _c : 100, depth: depth, colSpan: children.reduce(function (s, c) { return s + (c.colSpan || 0); }, 0), rowSpan: 1, isLastStickyCol: isLastStickyCol(node), children: children });
                    };
                    return nodes.map(function (n) { return dfs(n, 1); });
                };
                var getMaxDepth = function (nodes, d) {
                    if (d === void 0) { d = 1; }
                    return nodes.reduce(function (m, n) {
                        return Math.max(m, n.children ? getMaxDepth(n.children, d + 1) : d);
                    }, d);
                };
                return __assign(__assign({}, state), { columns: calcHeader(columns) });
            });
        },
        findColumn: function (field) {
            var columns = get().columns.flatMap(function (column) { return column.children || []; });
            return columns.find(function (column) { return column.field === field; });
        },
        setColumnWidth: function (field, width) {
            var setFindColumnWidth = function (columns) {
                return columns.map(function (column) {
                    if (column.children && column.children.length > 0) {
                        return __assign(__assign({}, column), { children: setFindColumnWidth(column.children) });
                    }
                    if (column.field === field) {
                        return __assign(__assign({}, column), { width: width });
                    }
                    return column;
                });
            };
            set(function (state) { return (__assign(__assign({}, state), { columns: setFindColumnWidth(state.columns) })); });
        },
        setDataSource: function (dataSource) {
            set(function (state) {
                var newDataSource = typeof dataSource === "function"
                    ? dataSource(state.dataSource).map(function (d) { return (__assign(__assign({}, d), { rowId: d.rowId || uuid() })); })
                    : dataSource.map(function (d) { return (__assign(__assign({}, d), { rowId: d.rowId || uuid() })); });
                return __assign(__assign({}, state), { dataSource: newDataSource });
            });
        },
        findData: function (rowId, field) {
            var _a;
            var dataSource = get().dataSource || [];
            return (_a = dataSource.find(function (row) { return row.rowId === rowId; })) === null || _a === void 0 ? void 0 : _a[field];
        },
        getLastNodes: function () {
            var columns = get().columns;
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
        },
        getFlatColumns: function () {
            var flattenAll = function (nodes) {
                return nodes.flatMap(function (n) { return __spreadArray([
                    n
                ], __read((n.children ? flattenAll(n.children) : [])), false); });
            };
            return flattenAll(get().columns);
        },
        getMaxDepth: function () {
            var flattenAll = function (nodes) {
                return nodes.flatMap(function (n) { return __spreadArray([
                    n
                ], __read((n.children ? flattenAll(n.children) : [])), false); });
            };
            return flattenAll(get().columns).reduce(function (max, column) { return Math.max(max, column.depth || 0); }, 0);
        },
        setOptions: function (options) {
            set(function (state) { return (__assign(__assign({}, state), { options: options })); });
        },
        setScrollOffset: function (scrollOffset) {
            set(function (state) { return (__assign(__assign({}, state), { scrollOffset: scrollOffset })); });
        },
    }); });
};
