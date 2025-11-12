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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGyudInitialize = void 0;
var react_1 = __importDefault(require("react"));
var create_dt_store_1 = require("../store/create-dt-store");
var react_uuid_1 = __importDefault(require("react-uuid"));
var useGyudInitialize = function (dataSource, columns, options) {
    var store = react_1.default.useMemo(function () { return (0, create_dt_store_1.createDtStore)(); }, []);
    react_1.default.useEffect(function () {
        store.getState().setDataSource(dataSource.map(function (row) { return (__assign({ rowId: row.rowId || (0, react_uuid_1.default)(), mode: "r", checked: false }, row)); }) || []);
        store.getState().initializeColumns(columns || []);
        store.getState().setOptions(options || {});
    }, [dataSource, columns, options]);
    return store;
};
exports.useGyudInitialize = useGyudInitialize;
