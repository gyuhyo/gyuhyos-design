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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDt = exports.DevsDtProvider = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_uuid_1 = __importDefault(require("react-uuid"));
var DevsDtContext = react_1.default.createContext(undefined);
var DevsDtProviderComponent = function (_a) {
    var _b;
    var children = _a.children, columns = _a.columns, setColumns = _a.setColumns, dataSource = _a.dataSource, setDataSource = _a.setDataSource, options = _a.options, formsRef = _a.formsRef, focusedRow = _a.focusedRow, setFocusedRow = _a.setFocusedRow, focusedCell = _a.focusedCell, setFocusedCell = _a.setFocusedCell;
    var keyField = (_b = columns.find(function (col) { return col.key; })) === null || _b === void 0 ? void 0 : _b.field;
    var _c = __read(react_1.default.useState(false), 2), isSetUUID = _c[0], setIsSetUUID = _c[1];
    react_1.default.useEffect(function () {
        if (setColumns !== undefined) {
            setColumns(function (prevCols) {
                return prevCols.map(function (col) { return (__assign(__assign({}, col), { resizing: col.resizing === undefined ? true : col.resizing })); });
            });
        }
    }, []);
    react_1.default.useEffect(function () {
        var validRowIds = new Set(dataSource.map(function (obj) { return obj.rowId; }));
        // Step 2: targetObject에서 유효하지 않은 키 삭제
        Object.keys(formsRef.current).forEach(function (key) {
            if (!validRowIds.has(key)) {
                delete formsRef.current[key];
            }
        });
        setDataSource(function (prev) {
            return dataSource.map(function (d) {
                return __assign({ rowId: (0, react_uuid_1.default)(), mode: "r", checked: false }, d);
            });
        });
    }, [JSON.stringify(dataSource)]);
    return ((0, jsx_runtime_1.jsx)(DevsDtContext.Provider, __assign({ value: {
            columns: columns,
            setColumns: setColumns,
            dataSource: dataSource,
            setDataSource: setDataSource,
            keyField: keyField,
            options: options,
            formsRef: formsRef,
            focusedRow: focusedRow,
            setFocusedRow: setFocusedRow,
            focusedCell: focusedCell,
            setFocusedCell: setFocusedCell,
        } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            } }, { children: children })) })));
};
exports.DevsDtProvider = react_1.default.memo(DevsDtProviderComponent);
var useDt = function () {
    var context = react_1.default.useContext(DevsDtContext);
    if (!context) {
        throw new Error("DevsDtContext is not found");
    }
    return context;
};
exports.useDt = useDt;
