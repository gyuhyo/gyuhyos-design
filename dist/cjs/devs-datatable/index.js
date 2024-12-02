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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var devs_dt_context_1 = require("./context/devs-dt-context");
require("./dev.datatable.style.css");
var buttons_1 = __importDefault(require("./devs-dt-component/buttons"));
var devs_dt_tbody_1 = __importDefault(require("./devs-dt-tbody"));
var devs_dt_thead_1 = __importDefault(require("./devs-dt-thead"));
var useInitDt_1 = require("./hooks/useInitDt");
// DevsDataTable 컴포넌트 타입 설정 및 구현
var DevsDataTable = react_1.default.forwardRef(function (props, ref) {
    var _a = __read(react_1.default.useState(0), 2), headerWidth = _a[0], setHeaderWidth = _a[1];
    var _b = __read(react_1.default.useState(false), 2), innerLoading = _b[0], setInnerLoading = _b[1];
    var _c = __read(react_1.default.useState(null), 2), focusedCell = _c[0], setFocusedCell = _c[1];
    var _d = __read(react_1.default.useState(null), 2), focusedRow = _d[0], setFocusedRow = _d[1];
    var formsRef = react_1.default.useRef({});
    var table = react_1.default.useRef(null);
    var thead = react_1.default.useRef(null);
    var tbody = react_1.default.useRef(null);
    var _e = __read(react_1.default.useState(false), 2), DtForceUpdate = _e[1];
    var init = (0, useInitDt_1.useInitDt)({
        table: table,
        tbody: tbody,
        thead: thead,
    });
    react_1.default.useEffect(function () {
        if (!thead.current)
            return;
        var allCheck = thead.current.querySelector("input[name='allCheck']");
        if (!allCheck)
            return;
        var data = props.dataSource;
        var checked = data.filter(function (d) { return d.checked; });
        var unChecked = data.filter(function (d) { return !d.checked; });
        if (checked.length > 0 && unChecked.length > 0) {
            allCheck.indeterminate = true;
        }
        else {
            allCheck.indeterminate = false;
        }
        if (checked.length > 0 && unChecked.length === 0) {
            allCheck.checked = true;
        }
        if (checked.length === 0 && unChecked.length > 0) {
            allCheck.checked = false;
        }
    }, [props.dataSource]);
    react_1.default.useImperativeHandle(ref, function () { return ({
        api: {
            onValidationCheck: function () { return __awaiter(void 0, void 0, void 0, function () {
                var forms, validations, allValid, allData, allData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            forms = Object.values(formsRef.current);
                            return [4 /*yield*/, Promise.all(forms.map(function (form) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, new Promise(function (resolve) { return resolve(form.clearErrors()); })];
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, Promise.all(forms
                                    .filter(function (f) { return f.getValues("checked"); })
                                    .map(function (form) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, new Promise(function (resolve) {
                                                return form.handleSubmit(function (data) { return resolve({ valid: true, data: data }); }, function (error) { return resolve({ valid: false, data: error }); })();
                                            })];
                                    });
                                }); }))];
                        case 2:
                            validations = _a.sent();
                            allValid = validations.every(function (result) { return result.valid; });
                            if (allValid) {
                                allData = validations.map(function (result) { return result.data; });
                                return [2 /*return*/, { valid: true, data: allData }];
                            }
                            else {
                                allData = validations
                                    .filter(function (f) { return !f.valid; })
                                    .map(function (result) { return result.data; });
                                return [2 /*return*/, { valid: false, data: allData }];
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            getFocusedRow: focusedRow,
            getFocusedRowIndex: focusedRow === null ? null : props.dataSource.indexOf(focusedRow),
            getFocusedCell: { row: focusedRow, field: focusedCell },
            getCheckedRows: props.dataSource.filter(function (f) { return f.checked === true; }),
            focusedRowIndex: function (index) {
                if (props.dataSource.length > index) {
                    setFocusedRow(props.dataSource[index]);
                }
            },
            focusedRow: function (row) { return setFocusedRow(row); },
            addRow: function (defaultValues) {
                return props.setDataSource(function (prev) { return __spreadArray([
                    __assign({ checked: true, mode: "c" }, defaultValues)
                ], __read(prev), false); });
            },
        },
    }); }, [props.dataSource, props.options, focusedRow, focusedCell]);
    react_1.default.useEffect(function () {
        if (focusedRow !== null && props.focusedRowChanged !== undefined) {
            props.focusedRowChanged(focusedRow);
        }
    }, [focusedRow]);
    react_1.default.useEffect(function () {
        if (focusedRow !== null &&
            focusedCell !== null &&
            props.focusedCellChanged !== undefined) {
            props.focusedCellChanged({ row: focusedRow, field: focusedCell });
        }
    }, [focusedCell, focusedRow]);
    if (!init)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "loading..." });
    return ((0, jsx_runtime_1.jsxs)(devs_dt_context_1.DevsDtProvider, __assign({ columns: props.columns, setColumns: props.setColumns, dataSource: props.dataSource, setDataSource: props.setDataSource, options: props.options, formsRef: formsRef, focusedRow: focusedRow, setFocusedRow: setFocusedRow, focusedCell: focusedCell, setFocusedCell: setFocusedCell }, { children: [(props.loading === true || innerLoading === true) && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "loader-backdrop" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "loader-container" }, { children: [(0, jsx_runtime_1.jsx)("span", { className: "spinner" }), (0, jsx_runtime_1.jsx)("span", __assign({ style: { fontWeight: "bold" } }, { children: "\uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911..." }))] })) }))), (0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 7,
                    flexWrap: "wrap",
                    gap: "7px",
                } }, { children: [(0, jsx_runtime_1.jsxs)("p", __assign({ style: { fontSize: 18, fontWeight: "bold" } }, { children: [props.title !== undefined && props.title !== "" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u27A4 ", props.title] })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    fontSize: 12,
                                    color: "#7a7a7a",
                                    marginLeft: props.title !== undefined && props.title !== ""
                                        ? "7px"
                                        : "0px",
                                } }, { children: ["(*) \uC785\uB825 \uAC00\uB2A5 (", (0, jsx_runtime_1.jsx)("span", __assign({ style: { color: "red" } }, { children: "*" })), ") \uD544\uC218\uC785\uB825"] }))] })), (0, jsx_runtime_1.jsx)(buttons_1.default, { buttons: props.buttons, options: props.options, setInnerLoading: setInnerLoading })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ ref: table, className: "dev-table-wrapper" }, { children: [(0, jsx_runtime_1.jsx)(devs_dt_thead_1.default, { thead: thead, setHeaderWidth: setHeaderWidth }), (0, jsx_runtime_1.jsx)(devs_dt_tbody_1.default, { tbody: tbody, headerWidth: headerWidth })] }))] })));
});
exports.default = react_1.default.memo(DevsDataTable);
