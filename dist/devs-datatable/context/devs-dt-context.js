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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import uuid from "react-uuid";
import { MessageProvider } from "../../alert-message/context/message-context";
var DevsDtContext = React.createContext(undefined);
var DevsDtProviderComponent = function (props) {
    var _a, _b;
    var keyField = (_a = props.columns.find(function (col) { return col.key; })) === null || _a === void 0 ? void 0 : _a.field;
    var _c = __read(React.useState(false), 2), isSetUUID = _c[0], setIsSetUUID = _c[1];
    var _d = __read(React.useState({
        field: null,
        type: "asc",
    }), 2), sorter = _d[0], setSorter = _d[1];
    React.useEffect(function () {
        if (props.setColumns !== undefined) {
            props.setColumns(function (prevCols) {
                return prevCols.map(function (col) { return (__assign(__assign({}, col), { resizing: col.resizing === undefined ? true : col.resizing })); });
            });
        }
    }, []);
    React.useEffect(function () {
        var validRowIds = new Set(props.dataSource.map(function (obj) { return obj.rowId; }));
        // Step 2: targetObject에서 유효하지 않은 키 삭제
        Object.keys(props.formsRef.current).forEach(function (key) {
            if (!validRowIds.has(key)) {
                delete props.formsRef.current[key];
            }
        });
        props.setDataSource(function (prev) {
            return props.dataSource.map(function (d, idx) {
                var _a, _b;
                if (((_a = props.options) === null || _a === void 0 ? void 0 : _a.editType) === undefined ||
                    ((_b = props.options) === null || _b === void 0 ? void 0 : _b.editType) === "row") {
                    return __assign({ originIndex: idx, rowId: uuid(), mode: "r", checked: false }, d);
                }
                return __assign({ originIndex: idx, rowId: uuid(), mode: "r", checked: false, editedCells: [] }, d);
            });
        });
    }, [JSON.stringify(props.dataSource), (_b = props.options) === null || _b === void 0 ? void 0 : _b.editType]);
    var editCount = React.useMemo(function () {
        return props.dataSource.filter(function (x) { return x.mode === "u" || x.mode === "c"; })
            .length;
    }, [JSON.stringify(props.dataSource)]);
    return (_jsx(DevsDtContext.Provider, __assign({ value: {
            columns: props.columns,
            setColumns: props.setColumns,
            dataSource: props.dataSource,
            setDataSource: props.setDataSource,
            keyField: keyField,
            options: props.options,
            formsRef: props.formsRef,
            focusedRow: props.focusedRow,
            setFocusedRow: props.setFocusedRow,
            focusedCell: props.focusedCell,
            setFocusedCell: props.setFocusedCell,
            editCount: editCount,
            sorter: sorter,
            setSorter: setSorter,
        } }, { children: _jsx(MessageProvider, { children: _jsx("div", __assign({ style: {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                } }, { children: props.children })) }) })));
};
export var DevsDtProvider = React.memo(DevsDtProviderComponent);
export var useDt = function () {
    var context = React.useContext(DevsDtContext);
    if (!context) {
        throw new Error("DevsDtContext is not found");
    }
    return context;
};
