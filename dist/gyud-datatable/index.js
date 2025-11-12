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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import { GyudDtContainer } from "./components";
import { GyudDtProvider } from "./context";
import "./style.css";
var GyudDataTable = React.forwardRef(function (props, ref) {
    var tableRef = React.useRef(null);
    React.useImperativeHandle(ref, function () {
        var _a;
        return ({
            tbody: null,
            thead: null,
            table: tableRef.current,
            store: (_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.store,
        });
    });
    return (_jsx(GyudDtProvider, __assign({ dataSource: props.data, columns: props.columns, options: props.options || {} }, { children: _jsx(GyudDtContainer, { ref: tableRef }) })));
});
export default GyudDataTable;
