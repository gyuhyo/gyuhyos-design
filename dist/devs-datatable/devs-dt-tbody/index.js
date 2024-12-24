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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React from "react";
import { useDt } from "../context/devs-dt-context";
import DevsDtRow from "../devs-dt-row";
import EmptySvg from "../assets/empty.svg";
import { DragDropContext, Draggable, Droppable, } from "@hello-pangea/dnd";
function DevsDtTBody(_a) {
    var tbody = _a.tbody, headerWidth = _a.headerWidth;
    var _b = useDt(), columns = _b.columns, dataSource = _b.dataSource, setDataSource = _b.setDataSource, options = _b.options, formsRef = _b.formsRef, sorter = _b.sorter;
    var _c = __read(React.useState(false), 2), isDrop = _c[0], setIsDrop = _c[1];
    var keyField = React.useMemo(function () {
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
    var lastNode = React.useMemo(function () { return getLastNodes(columns); }, [columns]);
    var nodeCount = React.useMemo(function () {
        var fixedCount = ((options === null || options === void 0 ? void 0 : options.enabledExpand) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.enabledRowCheck) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.showRowNumber) ? 1 : 0) +
            ((options === null || options === void 0 ? void 0 : options.enabledRowOrder) ? 1 : 0);
        return lastNode.length + fixedCount;
    }, [lastNode, options]);
    var sortDataSource = React.useCallback(function (d) {
        var findSorterField = columns.find(function (col) { return col.field === sorter.field; });
        var newRows = d.filter(function (x) { return x.mode === "c"; });
        var nullRows = (findSorterField === null || findSorterField === void 0 ? void 0 : findSorterField.isNotNullSort) === true
            ? d.filter(function (x) {
                return x[sorter.field] === "" ||
                    x[sorter.field] === null ||
                    x[sorter.field] === undefined;
            })
            : [];
        if (sorter.field === null || sorter.field === undefined) {
            return __spreadArray(__spreadArray([], __read(newRows), false), __read(d
                .filter(function (x) { return x.mode !== "c"; })
                .sort(function (a, b) { return a.originIndex - b.originIndex; })), false);
        }
        var sortedDataSource = d
            .filter(function (x) {
            if ((findSorterField === null || findSorterField === void 0 ? void 0 : findSorterField.isNotNullSort) === true) {
                return (x.mode !== "c" &&
                    x[sorter.field] !== "" &&
                    x[sorter.field] !== null &&
                    x[sorter.field] !== undefined);
            }
            return x.mode !== "c";
        })
            .sort(function (a, b) {
            if (sorter.type === "desc") {
                if (a[sorter.field] === b[sorter.field]) {
                    return a.originIndex - b.originIndex;
                }
                else {
                    if (a[sorter.field] > b[sorter.field]) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            }
            if (a[sorter.field] === b[sorter.field]) {
                return a.originIndex - b.originIndex;
            }
            else {
                if (a[sorter.field] > b[sorter.field]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        });
        return __spreadArray(__spreadArray(__spreadArray([], __read(newRows), false), __read(sortedDataSource), false), __read(nullRows), false);
    }, [sorter, columns]);
    var mergedDataSource = React.useMemo(function () {
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
    }, [dataSource, lastNode, sorter]);
    var setRowOrderChange = React.useCallback(function (e) {
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
    var onDragUpdate = React.useCallback(function (e) {
        var _a;
        var targetIndex = (_a = e.destination) === null || _a === void 0 ? void 0 : _a.index;
        if (!targetIndex)
            return;
        if (dataSource[targetIndex].mode === "c") {
            setIsDrop(true);
        }
    }, [dataSource]);
    if (dataSource === undefined || dataSource.length === 0) {
        return (_jsx("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: _jsx("div", __assign({ className: "devs-dt-table devs-dt-table-fixed", style: { width: headerWidth, height: "100%" } }, { children: _jsx("div", __assign({ className: "devs-dt-tbody", style: { position: "relative" } }, { children: _jsx(EmptySvg, {}) })) })) })));
    }
    return (_jsx("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: _jsx(DragDropContext, __assign({ onDragEnd: setRowOrderChange, onDragStart: function (e) { }, onDragUpdate: onDragUpdate }, { children: _jsx(Droppable, __assign({ droppableId: "droppable", mode: "standard", type: "", direction: "vertical", isDropDisabled: isDrop }, { children: function (provided) { return (_jsx("table", __assign({ className: "devs-dt-table devs-dt-table-fixed", ref: provided.innerRef }, provided.droppableProps, { children: _jsxs("tbody", __assign({ className: "devs-dt-tbody" }, { children: [mergedDataSource &&
                                mergedDataSource
                                    .filter(function (f) { return f.rowId; })
                                    .map(function (row, index) {
                                    return (_jsx(Draggable, __assign({ draggableId: row.rowId, index: index, isDragDisabled: !(options === null || options === void 0 ? void 0 : options.enabledRowOrder) || row.mode === "c" }, { children: function (provided2, snapshot) {
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
                                            return (_jsxs(React.Fragment, { children: [_jsx(DevsDtRow, { index: index, rowKey: row.rowId, data: row, lastNode: lastNode, dragProvided: provided2, dragSnapshot: snapshot }, row.rowId), row.expand && (_jsx("tr", { children: _jsx("td", __assign({ className: "devs-dt-cell devs-dt-td", style: {
                                                                padding: "7px",
                                                                height: "0px",
                                                            }, colSpan: nodeCount }, { children: (_a = options === null || options === void 0 ? void 0 : options.expandContent) === null || _a === void 0 ? void 0 : _a.call(options, row) })) }))] }, row.rowId));
                                        } }), row.rowId));
                                }), provided.placeholder] })) }))); } })) })) })));
}
export default React.memo(DevsDtTBody);
