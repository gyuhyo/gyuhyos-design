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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import React from "react";
import { DevsDtProvider } from "./context/devs-dt-context";
import "./dev.datatable.style.css";
import DevsDtButtons from "./devs-dt-component/buttons";
import DevsDtTBody from "./devs-dt-tbody";
import DevsDtTHead from "./devs-dt-thead";
import { useInitDt } from "./hooks/useInitDt";
import { css } from "@emotion/react";
// DevsDataTable 컴포넌트 타입 설정 및 구현
var DevsDataTable = React.forwardRef(function (props, ref) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k = __read(React.useState(0), 2), headerWidth = _k[0], setHeaderWidth = _k[1];
    var _l = __read(React.useState(false), 2), innerLoading = _l[0], setInnerLoading = _l[1];
    var _m = __read(React.useState(null), 2), focusedCell = _m[0], setFocusedCell = _m[1];
    var _o = __read(React.useState(null), 2), focusedRow = _o[0], setFocusedRow = _o[1];
    var formsRef = React.useRef({});
    var table = React.useRef(null);
    var thead = React.useRef(null);
    var tbody = React.useRef(null);
    var _p = __read(React.useState(false), 2), DtForceUpdate = _p[1];
    var init = useInitDt({
        table: table,
        tbody: tbody,
        thead: thead,
    });
    React.useEffect(function () {
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
    var getCheckedRows = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(Object.values(formsRef.current).map(function (form) { return form.trigger("checked"); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, Object.values(formsRef.current)
                            .filter(function (form) { return form.getValues("checked"); })
                            .map(function (form) { return form.getValues(); })];
            }
        });
    }); };
    React.useImperativeHandle(ref, function () { return ({
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
                            console.log("allvalid", allValid);
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
            getCheckedRows: Object.values(formsRef.current)
                .filter(function (f) { return f.getValues("checked"); })
                .map(function (x) { return x.getValues(); }),
            getCheckedRowsData: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCheckedRows()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
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
            setValue: function (_a) {
                var rowId = _a.rowId, field = _a.field, value = _a.value;
                var form = formsRef.current[rowId];
                if (form) {
                    console.log("find");
                    form.setValue(field, value);
                    form.trigger();
                }
            },
        },
    }); }, [props.dataSource, props.options, focusedRow, focusedCell]);
    React.useEffect(function () {
        if (focusedRow !== null && props.focusedRowChanged !== undefined) {
            props.focusedRowChanged(focusedRow);
        }
    }, [focusedRow]);
    React.useEffect(function () {
        if (focusedRow !== null &&
            focusedCell !== null &&
            props.focusedCellChanged !== undefined) {
            props.focusedCellChanged({ row: focusedRow, field: focusedCell });
        }
    }, [focusedCell, focusedRow]);
    if (!init)
        return _jsx(_Fragment, { children: "loading..." });
    return (_jsxs(DevsDtProvider, __assign({ columns: props.columns, setColumns: props.setColumns, dataSource: props.dataSource, setDataSource: props.setDataSource, options: props.options, formsRef: formsRef, focusedRow: focusedRow, setFocusedRow: setFocusedRow, focusedCell: focusedCell, setFocusedCell: setFocusedCell }, { children: [(props.loading === true || innerLoading === true) && (_jsx("div", __assign({ className: "loader-backdrop" }, { children: _jsxs("div", __assign({ className: "loader-container" }, { children: [_jsx("span", { className: "spinner" }), _jsx("span", __assign({ style: { fontWeight: "bold" } }, { children: "\uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911..." }))] })) }))), (props.title !== undefined ||
                (typeof props.title === "string" && props.title !== "") ||
                ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick) !== undefined ||
                ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onSearchClick) !== undefined ||
                ((_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSaveClick) !== undefined ||
                ((_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onCancelClick) !== undefined ||
                ((_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onDeleteClick) !== undefined ||
                ((_f = props.buttons) === null || _f === void 0 ? void 0 : _f.custom) !== undefined) && (_jsxs("div", __assign({ style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 7,
                    flexWrap: "wrap",
                    gap: "7px",
                    background: "linear-gradient(180deg, rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
                    border: "1px solid rgb(199, 199, 199)",
                    padding: "0.5rem 0.75rem",
                } }, { children: [_jsxs("div", __assign({ css: css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            columnGap: 7,
                        }) }, { children: [props.title !== undefined &&
                                props.title !== undefined &&
                                typeof props.title === "string" &&
                                props.title !== "" ? (_jsxs("p", __assign({ style: { fontSize: 18, fontWeight: "bold" } }, { children: ["\u27A4 ", props.title] }))) : (props.title), ((_g = props.options) === null || _g === void 0 ? void 0 : _g.readonly) === undefined ||
                                (props.options.readonly === false && (_jsxs("span", __assign({ style: {
                                        fontSize: 12,
                                        color: "#7a7a7a",
                                        marginLeft: props.title !== undefined && props.title !== ""
                                            ? "7px"
                                            : "0px",
                                    } }, { children: ["(", _jsx("span", __assign({ style: { color: "#000" } }, { children: "*" })), ") \uC785\uB825 \uAC00\uB2A5 (", _jsx("span", __assign({ style: { color: "red" } }, { children: "*" })), ") \uD544\uC218\uC785\uB825"] }))))] })), _jsx(DevsDtButtons, { buttons: props.buttons, options: props.options, setInnerLoading: setInnerLoading })] }))), _jsxs("div", __assign({ ref: table, className: "dev-table-wrapper", css: css({ minWidth: (_j = (_h = props.options) === null || _h === void 0 ? void 0 : _h.minWidth) !== null && _j !== void 0 ? _j : 0 }) }, { children: [_jsx(DevsDtTHead, { thead: thead, setHeaderWidth: setHeaderWidth }), _jsx(DevsDtTBody, { tbody: tbody, headerWidth: headerWidth })] }))] })));
});
export default React.memo(DevsDataTable);
