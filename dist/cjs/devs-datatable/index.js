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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var fa6_1 = require("react-icons/fa6");
var md_1 = require("react-icons/md");
var devs_dt_context_1 = require("./context/devs-dt-context");
var devs_dt_tbody_1 = __importDefault(require("./devs-dt-tbody"));
var devs_dt_thead_1 = __importDefault(require("./devs-dt-thead"));
var useInitDt_1 = require("./hooks/useInitDt");
var button_1 = __importDefault(require("../button"));
require("./dev.datatable.style.css");
// DevsDataTable 컴포넌트 타입 설정 및 구현
var DevsDataTable = react_1.default.forwardRef(function (props, ref) {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h = __read(react_1.default.useState(false), 2), isMerged = _h[0], setIsMerged = _h[1];
    var _j = __read(react_1.default.useState(0), 2), headerWidth = _j[0], setHeaderWidth = _j[1];
    var _k = __read(react_1.default.useState(null), 2), focusedCell = _k[0], setFocusedCell = _k[1];
    var _l = __read(react_1.default.useState(null), 2), focusedRow = _l[0], setFocusedRow = _l[1];
    var formsRef = react_1.default.useRef({});
    var thead = react_1.default.useRef(null);
    var tbody = react_1.default.useRef(null);
    var _m = __read(react_1.default.useState(false), 2), DtForceUpdate = _m[1];
    var init = (0, useInitDt_1.useInitDt)({
        tbody: tbody,
        thead: thead,
        isMerged: isMerged,
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
            getCheckedRows: props.dataSource.filter(function (f) { return f.checked === true; }),
        },
    }); }, [props.dataSource, props.options, focusedRow]);
    if (!init)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "loading..." });
    return ((0, jsx_runtime_1.jsxs)(devs_dt_context_1.DevsDtProvider, __assign({ columns: props.columns, setColumns: props.setColumns, dataSource: props.dataSource, setDataSource: props.setDataSource, options: props.options, formsRef: formsRef, focusedRow: focusedRow, setFocusedRow: setFocusedRow, focusedCell: focusedCell, setFocusedCell: setFocusedCell }, { children: [props.loading !== undefined && props.loading === true && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "loader-backdrop" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "loader-container" }, { children: [(0, jsx_runtime_1.jsx)("span", { className: "spinner" }), (0, jsx_runtime_1.jsx)("span", { children: "\uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911..." })] })) }))), (0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 7,
                } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: 18, fontWeight: "bold" } }, { children: props.title !== undefined && props.title !== "" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u27A4 ", props.title] })) })), props.buttons && props.buttons.isVisible && props.buttons.custom ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.buttons.custom })) : ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            columnGap: 3,
                        } }, { children: [(props.buttons.isSearchVisible === undefined ||
                                props.buttons.isSearchVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSearchClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdSearch, {}), " \uC870\uD68C"] }))), (props.buttons.isAddVisible === undefined ||
                                props.buttons.isAddVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onAddClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdAdd, {}), " \uCD94\uAC00"] }))), (props.buttons.isSaveVisible === undefined ||
                                props.buttons.isSaveVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSaveClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdSave, {}), " ", ((_d = props.options) === null || _d === void 0 ? void 0 : _d.enabledRowCheck) === true
                                        ? "선택 저장"
                                        : "저장"] }))), (props.buttons.isDeleteVisible === undefined ||
                                props.buttons.isDeleteVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, bgColor: "#df4873", color: "#fff", onClick: (_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onDeleteClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdDelete, {}), " \uC120\uD0DD \uC0AD\uC81C"] }))), (props.buttons.isCancelVisible === undefined ||
                                props.buttons.isCancelVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_f = props.buttons) === null || _f === void 0 ? void 0 : _f.onCancelClick }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdCancel, {}), " \uCDE8\uC18C"] }))), (props.buttons.isExportVisible === undefined ||
                                props.buttons.isExportVisible === true) && ((0, jsx_runtime_1.jsxs)(button_1.default, __assign({ border: true, compact: true, style: { padding: "5px 7px" }, onClick: (_g = props.buttons) === null || _g === void 0 ? void 0 : _g.onExportClick }, { children: [(0, jsx_runtime_1.jsx)(fa6_1.FaFileExport, {}), " Export"] })))] })))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "dev-table-wrapper" }, { children: [(0, jsx_runtime_1.jsx)(devs_dt_thead_1.default, { thead: thead, setHeaderWidth: setHeaderWidth }), (0, jsx_runtime_1.jsx)(devs_dt_tbody_1.default, { tbody: tbody, headerWidth: headerWidth })] }))] })));
});
exports.default = react_1.default.memo(DevsDataTable);
