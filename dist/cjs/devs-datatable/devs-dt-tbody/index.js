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
var devs_dt_row_1 = __importDefault(require("../devs-dt-row"));
var empty_svg_1 = __importDefault(require("../assets/empty.svg"));
var dnd_1 = require("@hello-pangea/dnd");
var useDtUtils_1 = __importDefault(require("../hooks/useDtUtils"));
var devs_dt_tfoot_1 = __importDefault(require("../devs-dt-tfoot"));
function DevsDtTBody(_a) {
    var tbody = _a.tbody, headerWidth = _a.headerWidth;
    var _b = (0, devs_dt_context_1.useDt)(), columns = _b.columns, dataSource = _b.dataSource, setDataSource = _b.setDataSource, options = _b.options, formsRef = _b.formsRef, sorter = _b.sorter, currentPage = _b.currentPage;
    var _c = __read(react_1.default.useState(false), 2), isDrop = _c[0], setIsDrop = _c[1];
    (0, useDtUtils_1.default)();
    var keyField = react_1.default.useMemo(function () {
        var _a;
        return (_a = columns.find(function (col) { return col.key; })) === null || _a === void 0 ? void 0 : _a.field;
    }, [columns]);
    var getLastNodes = function (columns) {
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
    var lastNode = react_1.default.useMemo(function () { return getLastNodes(columns); }, [columns]);
    var nodeCount = react_1.default.useMemo(function () {
        var fixedCount = ((options === null || options === void 0 ? void 0 : options.enabledExpand) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.enabledRowCheck) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.showRowNumber) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.enabledRowOrder) ? 1 : 0);
        return lastNode.length + fixedCount;
    }, [lastNode, options]);
    var getDefaultValue = function (col, row, rowIndex, val) {
        if ((col === null || col === void 0 ? void 0 : col.render) !== undefined) {
            var form = formsRef.current[row.rowId];
            var renderResult = col === null || col === void 0 ? void 0 : col.render({
                row: row,
                value: val,
                index: rowIndex,
                getValue: form === null || form === void 0 ? void 0 : form.getValues,
                watch: form === null || form === void 0 ? void 0 : form.watch,
            });
            if (typeof renderResult === "string" ||
                typeof renderResult === "number" ||
                typeof renderResult === "boolean" ||
                typeof renderResult === "bigint") {
                if (typeof renderResult === "string") {
                    var isNanCheck = isNaN(parseFloat(renderResult));
                    if (!isNanCheck) {
                        return parseFloat(renderResult.replace(",", ""));
                    }
                }
                return renderResult;
            }
        }
        if ((col === null || col === void 0 ? void 0 : col.defaultValue) !== undefined) {
            var value = col.defaultValue({
                row: row,
                value: val,
                index: rowIndex,
            });
            return value;
        }
        return val;
    };
    var sortDataSource = react_1.default.useCallback(function (d) {
        var _a, _b;
        var findSorterField = columns.find(function (col) { return col.field === sorter.field; });
        //if (!findSorterField) return d;
        var newRows = d.filter(function (x) { return x.mode === "c"; });
        var nullRows = (findSorterField === null || findSorterField === void 0 ? void 0 : findSorterField.isNotNullSort) === true
            ? d.filter(function (x, idx) {
                var val = getDefaultValue(findSorterField, x, idx, x[sorter.field]);
                return val === "" || val === null || val === undefined;
            })
            : [];
        if (sorter.field === null || sorter.field === undefined) {
            if (options === null || options === void 0 ? void 0 : options.pagination) {
                var limit = (_a = options === null || options === void 0 ? void 0 : options.paginationLimit) !== null && _a !== void 0 ? _a : 20;
                return __spreadArray([], __read(d
                    .filter(function (x) { return x.mode !== "c"; })
                    .sort(function (a, b) {
                    return a.originIndex - b.originIndex;
                })
                    .slice((currentPage - 1) * limit, currentPage * limit)), false);
            }
            return __spreadArray([], __read(d.sort(function (a, b) { return a.originIndex - b.originIndex; })), false);
        }
        var sortedDataSource = d
            .filter(function (x, idx) {
            if ((findSorterField === null || findSorterField === void 0 ? void 0 : findSorterField.isNotNullSort) === true) {
                var val = getDefaultValue(findSorterField, x, idx, x[sorter.field]);
                return (x.mode !== "c" && val !== "" && val !== null && val !== undefined);
            }
            return x.mode !== "c";
        })
            .sort(function (a, b) {
            var valA = getDefaultValue(findSorterField, a, a.originIndex, a[sorter.field]);
            var valB = getDefaultValue(findSorterField, b, b.originIndex, b[sorter.field]);
            if (sorter.type === "desc") {
                if (valA === valB) {
                    return a.originIndex - b.originIndex;
                }
                else {
                    if (valA > valB) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            }
            if (valA === valB) {
                return a.originIndex - b.originIndex;
            }
            else {
                if (valA > valB) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        });
        if (options === null || options === void 0 ? void 0 : options.pagination) {
            var limit = (_b = options === null || options === void 0 ? void 0 : options.paginationLimit) !== null && _b !== void 0 ? _b : 20;
            return __spreadArray(__spreadArray([], __read((currentPage === 1 ? newRows : [])), false), __read(__spreadArray(__spreadArray([], __read(sortedDataSource), false), __read(nullRows), false).slice((currentPage - 1) * limit, currentPage * limit)), false);
        }
        return __spreadArray(__spreadArray(__spreadArray([], __read(newRows), false), __read(sortedDataSource), false), __read(nullRows), false);
    }, [
        sorter,
        columns,
        options === null || options === void 0 ? void 0 : options.pagination,
        options === null || options === void 0 ? void 0 : options.paginationLimit,
        currentPage,
    ]);
    var mergedDataSource = react_1.default.useMemo(function () {
        var e_1, _a, e_2, _b, _c, _d, _e;
        var _f, _g;
        if (dataSource.length === 0 ||
            (dataSource.length > 0 && !dataSource[0].hasOwnProperty("mode")))
            return;
        var copyDataSource = JSON.parse(JSON.stringify(sortDataSource(dataSource)));
        try {
            for (var copyDataSource_1 = __values(copyDataSource), copyDataSource_1_1 = copyDataSource_1.next(); !copyDataSource_1_1.done; copyDataSource_1_1 = copyDataSource_1.next()) {
                var d = copyDataSource_1_1.value;
                delete d["_merge"];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (copyDataSource_1_1 && !copyDataSource_1_1.done && (_a = copyDataSource_1.return)) _a.call(copyDataSource_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var isMergedField = lastNode.filter(function (x) { return x.merge === true; });
        try {
            for (var isMergedField_1 = __values(isMergedField), isMergedField_1_1 = isMergedField_1.next(); !isMergedField_1_1.done; isMergedField_1_1 = isMergedField_1.next()) {
                var d = isMergedField_1_1.value;
                var end = false;
                for (var i = 0; i < copyDataSource.length - 1; i++) {
                    copyDataSource[i]["_merge"] = __assign(__assign({}, copyDataSource[i]["_merge"]), (_c = {}, _c[d.field] = {
                        rowSpan: 1,
                        hidden: false,
                    }, _c));
                    if (copyDataSource[i].mode === "c" ||
                        copyDataSource[i].mode === "u" ||
                        copyDataSource[i].expand === true ||
                        ((_f = copyDataSource[i].editedCells) === null || _f === void 0 ? void 0 : _f.includes(d.field))) {
                        continue;
                    }
                    for (var j = i + 1; j < copyDataSource.length; j++) {
                        if (copyDataSource[i][d.field] !== copyDataSource[j][d.field] ||
                            copyDataSource[j]["mode"] === "c" ||
                            copyDataSource[j]["mode"] === "u" ||
                            copyDataSource[j].expand === true ||
                            ((_g = copyDataSource[j].editedCells) === null || _g === void 0 ? void 0 : _g.includes(d.field))) {
                            i = j - 1;
                            break;
                        }
                        if (d.mergeOptions !== undefined) {
                            var nextData = j + 1 > copyDataSource.length ? null : copyDataSource[j + 1];
                            if (!d.mergeOptions({
                                prev: copyDataSource[j - 1],
                                curr: copyDataSource[j],
                                next: nextData,
                            })) {
                                i = j - 1;
                                break;
                            }
                        }
                        copyDataSource[i]["_merge"] = __assign(__assign({}, copyDataSource[i]["_merge"]), (_d = {}, _d[d.field] = {
                            rowSpan: copyDataSource[i]["_merge"][d.field]["rowSpan"] + 1,
                            hidden: false,
                        }, _d));
                        copyDataSource[j]["_merge"] = __assign(__assign({}, copyDataSource[j]["_merge"]), (_e = {}, _e[d.field] = { rowSpan: 1, hidden: true }, _e));
                        if (j === copyDataSource.length - 1) {
                            end = true;
                        }
                    }
                    if (end)
                        break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (isMergedField_1_1 && !isMergedField_1_1.done && (_b = isMergedField_1.return)) _b.call(isMergedField_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (JSON.stringify(copyDataSource) !== JSON.stringify(dataSource)) {
            return copyDataSource;
        }
        return dataSource;
    }, [dataSource, lastNode, sorter, currentPage]);
    var setRowOrderChange = react_1.default.useCallback(function (e) {
        setIsDrop(false);
        if (!e.destination)
            return;
        var startIndex = e.source.index;
        var endIndex = e.destination.index;
        if (startIndex === endIndex)
            return;
        // 데이터 순서 변경
        var newDataSource = __spreadArray([], __read(dataSource), false);
        var _a = __read(newDataSource.splice(startIndex, 1), 1), removed = _a[0];
        newDataSource.splice(endIndex, 0, removed);
        setDataSource(newDataSource.map(function (x, idx) { return (__assign(__assign({}, x), { originIndex: idx })); }));
        if ((options === null || options === void 0 ? void 0 : options.rowOrderEnd) !== undefined) {
            options.rowOrderEnd(newDataSource);
        }
    }, [dataSource]);
    var onDragUpdate = react_1.default.useCallback(function (e) {
        var _a;
        var targetIndex = (_a = e.destination) === null || _a === void 0 ? void 0 : _a.index;
        if (!targetIndex)
            return;
        if (dataSource[targetIndex].mode === "c") {
            setIsDrop(true);
        }
    }, [dataSource]);
    if (dataSource === undefined || dataSource.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "devs-dt-table devs-dt-table-fixed", style: { width: headerWidth - 15, height: "100%" } }, { children: (0, jsx_runtime_1.jsx)("div", { className: "devs-dt-tbody", style: { position: "relative" } }) })), (0, jsx_runtime_1.jsx)(empty_svg_1.default, {})] })));
    }
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: [(0, jsx_runtime_1.jsx)(dnd_1.DragDropContext, __assign({ onDragEnd: setRowOrderChange, onDragStart: function (e) { }, onDragUpdate: onDragUpdate }, { children: (0, jsx_runtime_1.jsx)(dnd_1.Droppable, __assign({ droppableId: "droppable", mode: "standard", type: "", direction: "vertical", isDropDisabled: isDrop }, { children: function (provided) { return ((0, jsx_runtime_1.jsx)("table", __assign({ className: "devs-dt-table devs-dt-table-fixed", ref: provided.innerRef }, provided.droppableProps, { children: (0, jsx_runtime_1.jsxs)("tbody", __assign({ className: "devs-dt-tbody" }, { children: [mergedDataSource &&
                                    mergedDataSource
                                        .filter(function (f) { return f.rowId; })
                                        .map(function (row, index) {
                                        return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, __assign({ draggableId: row.rowId, index: index, isDragDisabled: !(options === null || options === void 0 ? void 0 : options.enabledRowOrder) || row.mode === "c" }, { children: function (provided2, snapshot) {
                                                var _a;
                                                var style = provided2.draggableProps.style;
                                                if (style !== undefined) {
                                                    var transform = provided2.draggableProps.style.transform;
                                                    if (transform) {
                                                        var t = transform.split(",")[1];
                                                        provided2.draggableProps.style.transform =
                                                            "translate(0px," + t;
                                                    }
                                                }
                                                return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(devs_dt_row_1.default, { index: index, rowKey: row.rowId, data: row, lastNode: lastNode, dragProvided: provided2, dragSnapshot: snapshot }, row.rowId), (options === null || options === void 0 ? void 0 : options.enabledExpand) === true && ((0, jsx_runtime_1.jsx)("tr", __assign({ style: {
                                                                display: row.expand
                                                                    ? "table-row"
                                                                    : "none",
                                                            } }, { children: (0, jsx_runtime_1.jsx)("td", __assign({ className: "devs-dt-cell devs-dt-td", style: {
                                                                    padding: "7px",
                                                                    height: "0px",
                                                                }, colSpan: nodeCount }, { children: (_a = options === null || options === void 0 ? void 0 : options.expandContent) === null || _a === void 0 ? void 0 : _a.call(options, row) })) })))] }, row.rowId));
                                            } }), row.rowId));
                                    }), provided.placeholder] })) }))); } })) })), lastNode.filter(function (f) { return f.footer; }).length > 0 && (0, jsx_runtime_1.jsx)(devs_dt_tfoot_1.default, {})] })));
}
exports.default = react_1.default.memo(DevsDtTBody);
