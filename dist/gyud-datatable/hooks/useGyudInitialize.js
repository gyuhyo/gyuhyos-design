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
import React from "react";
import { createDtStore } from "../store/create-dt-store";
import uuid from "react-uuid";
export var useGyudInitialize = function (dataSource, columns, options) {
    var store = React.useMemo(function () { return createDtStore(); }, []);
    React.useEffect(function () {
        store.getState().setDataSource(dataSource.map(function (row) { return (__assign({ rowId: row.rowId || uuid(), mode: "r", checked: false }, row)); }) || []);
        store.getState().initializeColumns(columns || []);
        store.getState().setOptions(options || {});
    }, [dataSource, columns, options]);
    return store;
};
