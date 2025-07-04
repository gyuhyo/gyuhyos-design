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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var react_2 = __importDefault(require("react"));
require("./assets/style.css");
var devs_dt_context_1 = require("./context/devs-dt-context");
require("./dev.datatable.style.css");
var devs_dt_header_1 = __importDefault(require("./devs-dt-header"));
var devs_dt_pagination_1 = __importDefault(require("./devs-dt-pagination"));
var devs_dt_slider_form_1 = __importDefault(require("./devs-dt-slider-form/devs-dt-slider-form"));
var devs_dt_tbody_1 = __importDefault(require("./devs-dt-tbody"));
var devs_dt_thead_1 = __importDefault(require("./devs-dt-thead"));
var useInitDt_1 = require("./hooks/useInitDt");
var XLSX = __importStar(require("sheetjs-style"));
var file_saver_1 = require("file-saver");
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
// DevsDataTable 컴포넌트 타입 설정 및 구현
var DevsDataTable = react_2.default.forwardRef(function (props, ref) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (((_a = props.options) === null || _a === void 0 ? void 0 : _a.showEditModeSelector) &&
        ((_b = props.options) === null || _b === void 0 ? void 0 : _b.editType) === "cell") {
        throw new Error("showEditModeSelector and editType cannot be used together.");
    }
    var xlsTableRef = react_2.default.useRef(null);
    var _h = __read(react_2.default.useState(0), 2), headerWidth = _h[0], setHeaderWidth = _h[1];
    var _j = __read(react_2.default.useState(false), 2), innerLoading = _j[0], setInnerLoading = _j[1];
    var _k = __read(react_2.default.useState(null), 2), focusedCell = _k[0], setFocusedCell = _k[1];
    var _l = __read(react_2.default.useState(null), 2), focusedRow = _l[0], setFocusedRow = _l[1];
    var formsRef = react_2.default.useRef({});
    var table = react_2.default.useRef(null);
    var thead = react_2.default.useRef(null);
    var tbody = react_2.default.useRef(null);
    var _m = __read(react_2.default.useState(false), 2), columnsStyleForceUpdate = _m[0], COLUMNS_STYLE_FORCE_UPDATE = _m[1];
    var init = (0, useInitDt_1.useInitDt)({
        table: table,
        tbody: tbody,
        thead: thead,
        columnsStyleForceUpdate: columnsStyleForceUpdate,
    });
    var lastNode = react_2.default.useMemo(function () { return getLastNodes(props.columns); }, [props.columns]);
    react_2.default.useEffect(function () {
        if (!thead.current)
            return;
        var allCheck = thead.current.querySelector("input[name='allCheck']");
        if (!allCheck)
            return;
        var data = props.dataSource;
        if (data.length === 0) {
            allCheck.checked = false;
        }
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
    var checkedRowsCount = react_2.default.useMemo(function () {
        return Object.values(formsRef.current).filter(function (f) {
            return f.getValues("checked");
        });
    }, [props.dataSource]);
    react_2.default.useEffect(function () {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onCheckedRowsChanged) === null || _a === void 0 ? void 0 : _a.call(props, checkedRowsCount.map(function (form) { return form.getValues(); }));
    }, [checkedRowsCount.length]);
    react_2.default.useImperativeHandle(ref, function () { return ({
        tbody: tbody.current,
        thead: thead.current,
        api: {
            validate: function () { return __awaiter(void 0, void 0, void 0, function () {
                var forms, validations, allValid, allData, allData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            forms = Object.values(formsRef.current);
                            // 모든 에러 초기화
                            forms.forEach(function (form) { return form.clearErrors(); });
                            return [4 /*yield*/, Promise.all(forms
                                    .filter(function (form) { return form.getValues("checked"); })
                                    .map(function (form) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, new Promise(function (resolve) {
                                                form.handleSubmit(function (data) { return resolve({ valid: true, data: data }); }, function (error) { return resolve({ valid: false, data: error }); })();
                                            })];
                                    });
                                }); }))];
                        case 1:
                            validations = _a.sent();
                            allValid = validations.every(function (result) { return result.valid; });
                            if (allValid) {
                                allData = validations.map(function (result) { return result.data; });
                                return [2 /*return*/, { valid: true, data: allData }];
                            }
                            else {
                                allData = validations
                                    .filter(function (result) { return !result.valid; })
                                    .map(function (result) { return result.data; });
                                return [2 /*return*/, { valid: false, data: allData }];
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
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
            getFocusedRowIndex: focusedRow === null
                ? null
                : props.dataSource.findIndex(function (x) { return x.rowId === focusedRow.rowId; }),
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
                if (Object.values(formsRef.current).map(function (x) { return x.getValues(); }).length >
                    index) {
                    setFocusedRow(Object.values(formsRef.current).map(function (x) { return x.getValues(); })[index]);
                }
            },
            focusedRow: function (row) { return setFocusedRow(row); },
            addRow: function (defaultValues) {
                props.setDataSource(function (prev) { return __spreadArray([
                    __assign({ checked: true, mode: "c" }, defaultValues)
                ], __read(prev), false); });
                setFocusedRow(Object.values(formsRef.current).map(function (x) { return x.getValues(); })[0]);
            },
            focusedRowForm: focusedRow
                ? formsRef.current[focusedRow.rowId]
                : null,
            forceRerender: function (rowId) {
                var form = formsRef.current[rowId];
                if (form) {
                    form.forceRerender();
                }
            },
            setValue: function (_a) {
                var rowId = _a.rowId, field = _a.field, value = _a.value;
                var form = formsRef.current[rowId];
                if (form) {
                    form.setValue(field, value);
                    props.setDataSource(function (prev) {
                        return prev.map(function (p) {
                            var _a;
                            return p.rowId === rowId ? __assign(__assign({}, p), (_a = {}, _a[field] = value, _a)) : p;
                        });
                    });
                    form.trigger();
                    form.forceRerender();
                    return { result: true, form: form, dataSource: props.dataSource };
                }
                else {
                    return { result: false };
                }
            },
            setFocus: function (_a) {
                var rowId = _a.rowId, field = _a.field;
                var form = formsRef.current[rowId];
                if (form) {
                    form.setFocus(field);
                }
            },
            setError: function (_a) {
                var rowId = _a.rowId, field = _a.field;
                var form = formsRef.current[rowId];
                if (form) {
                    form.setError(field, { type: "required" });
                }
            },
            export: function (_a) {
                var data = _a.data, fileName = _a.fileName, sheetName = _a.sheetName, onBefore = _a.onBefore, onAfter = _a.onAfter;
                return onDownloadExcel({ data: data, fileName: fileName, sheetName: sheetName, onBefore: onBefore, onAfter: onAfter });
            },
            getSheet: function (_a) {
                var data = _a.data, onBefore = _a.onBefore, onAfter = _a.onAfter;
                return onGetSheet({ data: data, onBefore: onBefore, onAfter: onAfter });
            },
        },
    }); }, [props.dataSource, props.options, focusedRow, focusedCell]);
    var onGetSheet = function (_a) {
        var data = _a.data, onBefore = _a.onBefore, onAfter = _a.onAfter;
        var headerKeys = lastNode.map(function (node) { return node.field; });
        var headerMap = lastNode.reduce(function (prev, curr) {
            prev[curr.field] = curr.title;
            return prev;
        }, {});
        var headerTitles = headerKeys.map(function (key) { return headerMap[key]; });
        var excelData = data || props.dataSource;
        var worksheet = XLSX.utils.aoa_to_sheet([]); // 빈 시트 생성
        // ✅ 사용자 조작 기회
        var jumpRowCount = 0;
        if (onBefore) {
            var count = onBefore(worksheet, XLSX.utils, XLSX);
            if (count && count > 0) {
                jumpRowCount += count;
            }
        }
        // ✅ 현재 시트의 마지막 행 찾기
        var range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        var startRow = range.e.r + jumpRowCount; // 2줄 띄우고 추가
        // ✅ 헤더 삽입
        XLSX.utils.sheet_add_aoa(worksheet, [headerTitles], {
            origin: { r: startRow, c: 0 },
        });
        // ✅ 데이터 삽입
        var dataRows = excelData.map(function (row) {
            return headerKeys.map(function (key) {
                var col = lastNode.find(function (f) { return f.field === key; });
                if (col === null || col === void 0 ? void 0 : col.render) {
                    var value = col.render({ value: row[key], row: row });
                    if (typeof value !== "object") {
                        return value;
                    }
                }
                return row[key];
            });
        });
        XLSX.utils.sheet_add_aoa(worksheet, dataRows, {
            origin: { r: startRow + 1, c: 0 },
        });
        // 🔧 클라이언트에 worksheet를 넘겨서 수정 기회 제공
        if (onAfter) {
            onAfter(worksheet, XLSX.utils, XLSX);
        }
        return worksheet;
    };
    var onDownloadExcel = function (_a) {
        var data = _a.data, fileName = _a.fileName, sheetName = _a.sheetName, onBefore = _a.onBefore, onAfter = _a.onAfter;
        var headerKeys = lastNode.map(function (node) { return node.field; });
        var headerMap = lastNode.reduce(function (prev, curr) {
            prev[curr.field] = curr.title;
            return prev;
        }, {});
        var headerTitles = headerKeys.map(function (key) { return headerMap[key]; });
        var excelData = data || props.dataSource;
        var worksheet = XLSX.utils.aoa_to_sheet([]); // 빈 시트 생성
        // ✅ 사용자 조작 기회
        var jumpRowCount = 0;
        if (onBefore) {
            var count = onBefore(worksheet, XLSX.utils, XLSX);
            if (count && count > 0) {
                jumpRowCount += count;
            }
        }
        // ✅ 현재 시트의 마지막 행 찾기
        var range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        var startRow = range.e.r + jumpRowCount; // 2줄 띄우고 추가
        // ✅ 헤더 삽입
        XLSX.utils.sheet_add_aoa(worksheet, [headerTitles], {
            origin: { r: startRow, c: 0 },
        });
        // ✅ 데이터 삽입
        var dataRows = excelData.map(function (row) {
            return headerKeys.map(function (key) {
                var col = lastNode.find(function (f) { return f.field === key; });
                if (col === null || col === void 0 ? void 0 : col.render) {
                    var value = col.render({ value: row[key], row: row });
                    if (typeof value !== "object") {
                        return value;
                    }
                }
                return row[key];
            });
        });
        XLSX.utils.sheet_add_aoa(worksheet, dataRows, {
            origin: { r: startRow + 1, c: 0 },
        });
        // 🔧 클라이언트에 worksheet를 넘겨서 수정 기회 제공
        if (onAfter) {
            onAfter(worksheet, XLSX.utils, XLSX);
        }
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        var excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        var file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        (0, file_saver_1.saveAs)(file, "".concat(fileName, ".xlsx"));
    };
    react_2.default.useEffect(function () {
        if (props.focusedRowChanged !== undefined) {
            props.focusedRowChanged(focusedRow);
        }
    }, [focusedRow]);
    react_2.default.useEffect(function () {
        if (props.focusedCellChanged !== undefined) {
            props.focusedCellChanged({ row: focusedRow, field: focusedCell });
        }
    }, [focusedCell, focusedRow]);
    react_2.default.useEffect(function () {
        var _a;
        /* #########################################
      추후 개발 예정 (엑셀 복사 내용 붙여넣기)
      ############################################*/
        if (!table.current ||
            typeof window === undefined ||
            !((_a = props.options) === null || _a === void 0 ? void 0 : _a.enabledClipboard) ||
            props.columns.length === 0)
            return;
        var getClipboardData = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
            var target, data, pastedData, rows, dt, rowNo, rows_1, rows_1_1, row, colNo, _a, _b, col;
            var e_1, _c, e_2, _d, _e;
            return __generator(this, function (_f) {
                target = ev.target;
                if (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
                    return [2 /*return*/];
                ev.preventDefault();
                data = ev.clipboardData || window.clipboardData;
                pastedData = (data === null || data === void 0 ? void 0 : data.getData("Text")) || "";
                rows = pastedData.split("\r\n");
                dt = [];
                rowNo = 0;
                try {
                    for (rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                        row = rows_1_1.value;
                        if (row.split("\t").filter(function (x) { return x !== ""; }).length === 0)
                            continue;
                        dt.push({ checked: true, mode: "c" });
                        colNo = 0;
                        try {
                            for (_a = (e_2 = void 0, __values(row.split("\t"))), _b = _a.next(); !_b.done; _b = _a.next()) {
                                col = _b.value;
                                dt[rowNo] = Object.assign(dt[rowNo], (_e = {},
                                    _e[props.columns[colNo].field] = col,
                                    _e));
                                colNo++;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        rowNo++;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (rows_1_1 && !rows_1_1.done && (_c = rows_1.return)) _c.call(rows_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                props.setDataSource(function (prev) {
                    return __spreadArray(__spreadArray([], __read(dt), false), __read(prev), false);
                });
                return [2 /*return*/];
            });
        }); };
        var pasteListener = function (event) {
            getClipboardData(event);
        };
        window.addEventListener("paste", pasteListener);
        return function () { return window.removeEventListener("paste", pasteListener); };
    }, [props.columns.length]);
    var InitializeTableFromAutoScrolling = function () {
        var _a;
        if (!init ||
            !((_a = props.options) === null || _a === void 0 ? void 0 : _a.autoScrollKey) ||
            !tbody.current ||
            !thead.current ||
            !props.columns ||
            props.columns.length === 0)
            return;
        setTimeout(function () {
            var e_3, _a;
            var col = tbody.current.querySelector("td[data-field='".concat(props.options.autoScrollKey, "']"));
            if (col) {
                var stickyColsWidthSummary = 0;
                var stickyCols = thead.current.querySelectorAll("th.devs-dt-sticky-col[rowspan='1'][colspan='1'], th.devs-dt-sticky-col.devs-dt-th-bottom-border");
                try {
                    for (var stickyCols_1 = __values(stickyCols), stickyCols_1_1 = stickyCols_1.next(); !stickyCols_1_1.done; stickyCols_1_1 = stickyCols_1.next()) {
                        var elem = stickyCols_1_1.value;
                        stickyColsWidthSummary += elem.getBoundingClientRect().width;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (stickyCols_1_1 && !stickyCols_1_1.done && (_a = stickyCols_1.return)) _a.call(stickyCols_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                var container = tbody.current.getBoundingClientRect();
                var noStickySize = container.width - stickyColsWidthSummary - 1;
                var noStickySizeHalf = noStickySize / 2;
                var scrollLeft = ((col === null || col === void 0 ? void 0 : col.getBoundingClientRect().left) || 0) -
                    stickyColsWidthSummary -
                    noStickySizeHalf;
                tbody.current.scrollTo({
                    behavior: "smooth",
                    left: scrollLeft,
                });
            }
        }, 100);
    };
    react_2.default.useEffect(function () {
        InitializeTableFromAutoScrolling();
    }, [init, (_c = props.options) === null || _c === void 0 ? void 0 : _c.autoScrollKey, props.columns.length]);
    if (!init)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "loading..." });
    return ((0, jsx_runtime_1.jsxs)(devs_dt_context_1.DevsDtProvider, __assign({ columns: props.columns, setColumns: props.setColumns, dataSource: props.dataSource, setDataSource: props.setDataSource, options: props.options, formsRef: formsRef, focusedRow: focusedRow, setFocusedRow: setFocusedRow, focusedCell: focusedCell, setFocusedCell: setFocusedCell, tbody: tbody, thead: thead, wrapper: table, COLUMNS_STYLE_FORCE_UPDATE: COLUMNS_STYLE_FORCE_UPDATE, setInnerLoading: setInnerLoading }, { children: [(props.loading === true || innerLoading === true) && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "loader-backdrop" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "loader-container" }, { children: [(0, jsx_runtime_1.jsx)("span", { className: "spinner" }), (0, jsx_runtime_1.jsx)("span", __assign({ style: { fontWeight: "bold" } }, { children: "\uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911..." }))] })) }))), (0, jsx_runtime_1.jsx)(devs_dt_header_1.default, { title: props.title, buttons: props.buttons, options: props.options, setInnerLoading: setInnerLoading }), (0, jsx_runtime_1.jsxs)("div", __assign({ ref: table, className: "dev-table-wrapper", css: (0, react_1.css)({ minWidth: (_e = (_d = props.options) === null || _d === void 0 ? void 0 : _d.minWidth) !== null && _e !== void 0 ? _e : 0 }) }, { children: [(0, jsx_runtime_1.jsx)(devs_dt_thead_1.default, { thead: thead, setHeaderWidth: setHeaderWidth }), (0, jsx_runtime_1.jsx)(devs_dt_tbody_1.default, { tbody: tbody, headerWidth: headerWidth }), (0, jsx_runtime_1.jsx)(devs_dt_pagination_1.default, {}), (((_f = props.options) === null || _f === void 0 ? void 0 : _f.editMode) === "slider" ||
                        ((_g = props.options) === null || _g === void 0 ? void 0 : _g.showEditModeSelector)) && (0, jsx_runtime_1.jsx)(devs_dt_slider_form_1.default, {})] }))] })));
});
exports.default = react_2.default.memo(DevsDataTable);
