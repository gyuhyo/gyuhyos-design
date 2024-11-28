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
function DevsDtTBody(_a) {
    var tbody = _a.tbody, headerWidth = _a.headerWidth;
    var _b = (0, devs_dt_context_1.useDt)(), columns = _b.columns, dataSource = _b.dataSource, setDataSource = _b.setDataSource, options = _b.options, formsRef = _b.formsRef;
    var _c = __read(react_1.default.useState(false), 2), isDrop = _c[0], setIsDrop = _c[1];
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
        setDataSource(newDataSource);
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
        return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "devs-dt-table devs-dt-table-fixed", style: { width: headerWidth, height: "100%" } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "devs-dt-tbody", style: { position: "relative" } }, { children: (0, jsx_runtime_1.jsx)(empty_svg_1.default, {}) })) })) })));
    }
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: tbody, className: "devs-dt-tbody-wrapper" }, { children: (0, jsx_runtime_1.jsx)(dnd_1.DragDropContext, __assign({ onDragEnd: setRowOrderChange, onDragStart: function (e) { return console.log("start", e); }, onDragUpdate: onDragUpdate }, { children: (0, jsx_runtime_1.jsx)(dnd_1.Droppable, __assign({ droppableId: "droppable", mode: "standard", type: "", direction: "vertical", isDropDisabled: isDrop }, { children: function (provided) { return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "devs-dt-table devs-dt-table-fixed", ref: provided.innerRef }, provided.droppableProps, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "devs-dt-tbody" }, { children: [dataSource &&
                                dataSource
                                    .filter(function (f) { return f.rowId; })
                                    .map(function (row, index) {
                                    return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, __assign({ draggableId: row.rowId, index: index, isDragDisabled: !(options === null || options === void 0 ? void 0 : options.enabledRowOrder) || row.mode === "c" }, { children: function (provided2, snapshot) { return ((0, jsx_runtime_1.jsx)(devs_dt_row_1.default, { index: index, rowKey: row.rowId, data: row, lastNode: lastNode, dragProvided: provided2, dragSnapshot: snapshot }, row.rowId)); } }), row.rowId));
                                }), provided.placeholder] })) }))); } })) })) })));
}
exports.default = react_1.default.memo(DevsDtTBody);
