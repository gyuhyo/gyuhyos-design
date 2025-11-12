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
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var components_1 = require("./components");
var context_1 = require("./context");
require("./style.css");
var GyudDataTable = react_1.default.forwardRef(function (props, ref) {
    var tableRef = react_1.default.useRef(null);
    react_1.default.useImperativeHandle(ref, function () {
        var _a;
        return ({
            tbody: null,
            thead: null,
            table: tableRef.current,
            store: (_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.store,
        });
    });
    return ((0, jsx_runtime_1.jsx)(context_1.GyudDtProvider, __assign({ dataSource: props.data, columns: props.columns, options: props.options || {} }, { children: (0, jsx_runtime_1.jsx)(components_1.GyudDtContainer, { ref: tableRef }) })));
});
exports.default = GyudDataTable;
