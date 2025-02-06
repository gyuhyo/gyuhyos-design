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
exports.getDefaultValue = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
var react_1 = __importDefault(require("react"));
var button_1 = __importDefault(require("../../button"));
var devs_dt_context_1 = require("../context/devs-dt-context");
var data_form_item_renderer_1 = __importDefault(require("./data-form-item-renderer"));
var data_form_error_context_1 = require("./data-form-error-context");
var getDefaultValue = function (_a) {
    var val = _a.val, col = _a.col, row = _a.row, rowIndex = _a.rowIndex, getValue = _a.getValue;
    if ((col === null || col === void 0 ? void 0 : col.defaultValue) === undefined)
        return val;
    return col.defaultValue({
        row: row,
        value: val,
        index: rowIndex,
        getValue: getValue,
    });
};
exports.getDefaultValue = getDefaultValue;
var DataFormComponent = react_1.default.memo(function (_a) {
    var children = _a.children, panelWidth = _a.panelWidth;
    var _b = (0, devs_dt_context_1.useDt)(), focusedRow = _b.focusedRow, columns = _b.columns, sliderFormOpen = _b.sliderFormOpen, focusedRowForm = _b.focusedRowForm;
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
    var lastNode = react_1.default.useMemo(function () { return getLastNodes(columns); }, [columns]);
    if (lastNode.length === 0 || !sliderFormOpen || !focusedRowForm)
        return (0, jsx_runtime_1.jsx)(DataForm, {});
    return ((0, jsx_runtime_1.jsxs)(DataForm, { children: [(0, jsx_runtime_1.jsx)("table", __assign({ style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: lastNode.map(function (node) {
                        var maxWidth = panelWidth / 3;
                        return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", __assign({ "data-field": node.field, style: {
                                        minWidth: "75px",
                                        width: "auto",
                                        maxWidth: "".concat(maxWidth, "px"),
                                        textAlign: "left",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    } }, { children: node.title })), (0, jsx_runtime_1.jsx)("td", __assign({ style: {
                                        height: "32px",
                                        lineHeight: "32px",
                                    } }, { children: (0, jsx_runtime_1.jsx)(data_form_item_renderer_1.default, { focusedRow: focusedRow, node: node }) }))] }, node.field));
                    }) }) })), children] }));
});
var FormPanelResizer = function (_a) {
    var width = _a.width, setWidth = _a.setWidth;
    var startX = react_1.default.useRef(0);
    // 마우스 이동 핸들러
    var handleMouseMove = react_1.default.useCallback(function (e) {
        e.stopPropagation();
        var deltaX = startX.current - e.clientX;
        var newWidth = Math.max(width + deltaX, 400); // 최소 너비 50px
        var screenWidth = document.body.clientWidth;
        if (screenWidth / 2 < newWidth)
            return;
        // columns 배열을 자식 컬럼까지 고려하여 업데이트
        setWidth(newWidth);
    }, [width]);
    // 마우스 업 핸들러
    var handleMouseUp = react_1.default.useCallback(function (e) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(function () { }, 100);
    }, [handleMouseMove]);
    // 마우스 다운 핸들러
    var handleMouseDown = react_1.default.useCallback(function (e) {
        e.stopPropagation();
        startX.current = e.clientX;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);
    return (0, jsx_runtime_1.jsx)(Resizer, { onMouseDown: handleMouseDown });
};
var Resizer = styled_1.default.div({
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "5px",
    "&:hover": {
        cursor: "e-resize",
    },
});
var DevsDtSliderForm = function () {
    var beforeEditValues = react_1.default.useRef(null);
    var _a = __read(react_1.default.useState(400), 2), panelWidth = _a[0], setPanelWidth = _a[1];
    var _b = (0, devs_dt_context_1.useDt)(), focusedRow = _b.focusedRow, sliderFormOpen = _b.sliderFormOpen, setSliderFormOpen = _b.setSliderFormOpen, focusedRowForm = _b.focusedRowForm, setDataSource = _b.setDataSource;
    var _c = __read(react_1.default.useState(null), 2), errors = _c[0], setErrors = _c[1];
    react_1.default.useEffect(function () {
        if (!focusedRowForm)
            return;
        beforeEditValues.current = focusedRowForm.getValues();
    }, [focusedRowForm]);
    var onCloseSliderFormPanel = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setDataSource(function (prev) {
                return prev.map(function (p) {
                    return p.rowId === focusedRow.rowId
                        ? Object.assign(p, beforeEditValues.current)
                        : p;
                });
            });
            focusedRowForm === null || focusedRowForm === void 0 ? void 0 : focusedRowForm.reset(undefined, {
                keepErrors: true,
            });
            setSliderFormOpen(false);
            return [2 /*return*/];
        });
    }); };
    var onValidationCheck = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (focusedRowForm === null)
                return [2 /*return*/];
            focusedRowForm.handleSubmit(function () {
                setErrors(null);
                setSliderFormOpen(false);
                setDataSource(function (prev) {
                    return prev.map(function (p) {
                        return p.rowId === focusedRow.rowId
                            ? __assign(__assign({}, p), { mode: p.mode === "c" ? "c" : "u", checked: true }) : __assign({}, p);
                    });
                });
            }, function (err) {
                setErrors(err);
            })();
            return [2 /*return*/];
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(FormPanel, __assign({ sliderFormOpen: sliderFormOpen, width: panelWidth }, { children: [(0, jsx_runtime_1.jsxs)(FormTitle, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uB370\uC774\uD130 \uC218\uC815" }), (0, jsx_runtime_1.jsx)(CloseFormPanelButton, __assign({ onClick: onCloseSliderFormPanel }, { children: "\u2715" }))] }), (0, jsx_runtime_1.jsx)(data_form_error_context_1.DataFormErrorProvider, __assign({ errors: errors }, { children: (0, jsx_runtime_1.jsx)(DataFormComponent, { panelWidth: panelWidth }) })), (0, jsx_runtime_1.jsxs)(ButtonContainer, { children: [(0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#22cb5f", border: true, borderColor: "#03cf00", color: "#ffffff", style: {
                            padding: "12px",
                            width: "100%",
                            flex: "1 1 0%",
                        }, onClick: onValidationCheck }, { children: "\uD655\uC778" })), (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#df4873", border: true, borderColor: "#f15151", color: "#ffffff", style: {
                            width: "100%",
                            flex: "1 1 0%",
                        }, onClick: onCloseSliderFormPanel }, { children: "\uCDE8\uC18C" }))] }), (0, jsx_runtime_1.jsx)(FormPanelResizer, { width: panelWidth, setWidth: setPanelWidth })] })));
};
exports.default = react_1.default.memo(DevsDtSliderForm);
var FormPanel = styled_1.default.div(function (props) { return ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: 0,
    right: props.sliderFormOpen ? 0 : "-".concat(props.width + 17, "px"),
    width: "".concat(props.width, "px"),
    transition: "right 200ms ease-in-out",
    transitionDelay: "150ms",
    height: "100%",
    zIndex: 2,
    boxShadow: "-5px 0px 12px #00000040",
    borderLeft: "1px solid #bbb",
    overflow: "hidden",
}); });
var FormTitle = styled_1.default.div({
    flex: "none",
    padding: "5px 7px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    borderBottom: "1px solid #bbb",
    background: "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
});
var CloseFormPanelButton = styled_1.default.p({
    cursor: "pointer",
    "&:hover": {
        color: "#f150a8",
    },
});
var DataForm = styled_1.default.div({
    flex: "1 1 0%",
    position: "relative",
    padding: "5px 7px",
    overflow: "hidden",
    overflowY: "auto",
    background: "#fff",
});
var ButtonContainer = styled_1.default.div({
    flex: "none",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: "7px",
    padding: "5px 7px",
    borderTop: "1px solid #bbb",
    background: "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
});
