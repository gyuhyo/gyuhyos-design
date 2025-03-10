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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Button from "../../button";
import { useDt } from "../context/devs-dt-context";
import { Select } from "antd";
import { useMessage } from "../../alert-message/context/message-context";
var ButtonLabel = styled.span({
    display: "none",
    "@media (min-width: 650px)": {
        display: "block",
    },
});
var DevsDtButtons = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var showMessage = useMessage().showMessage;
    var _8 = useDt(), setDataSource = _8.setDataSource, setFocusedRow = _8.setFocusedRow, setFocusedCell = _8.setFocusedCell, sliderFormOpen = _8.sliderFormOpen, setFocusedRowForm = _8.setFocusedRowForm, setSliderFormOpen = _8.setSliderFormOpen, setEditMode = _8.setEditMode, originalColumns = _8.originalColumns, setColumns = _8.setColumns, editCount = _8.editCount, focusedCellChanged = _8.focusedCellChanged, focusedRowChanged = _8.focusedRowChanged, options = _8.options;
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
    var lastNode = React.useMemo(function () { return getLastNodes(originalColumns); }, [originalColumns]);
    var updateColumnWidth = function (columns, targetField, newWidth) {
        return columns.map(function (column) {
            // 컬럼이 자식 컬럼을 가지는 경우
            if (column.children) {
                return __assign(__assign({}, column), { children: updateColumnWidth(column.children, targetField, newWidth) });
            }
            // field가 일치하는 컬럼을 찾아서 width 업데이트
            if (column.field === targetField) {
                return __assign(__assign({}, column), { width: newWidth });
            }
            return column;
        });
    };
    var ButtonEventBeforeShowLoading = function (event) {
        props.setInnerLoading(true);
        var timer = setTimeout(function () {
            var e_1, _a;
            if (event !== undefined) {
                event();
            }
            var _loop_1 = function (col) {
                setColumns(function (prev) { var _a; return updateColumnWidth(prev, col.field, (_a = col.width) !== null && _a !== void 0 ? _a : 100); });
            };
            try {
                for (var lastNode_1 = __values(lastNode), lastNode_1_1 = lastNode_1.next(); !lastNode_1_1.done; lastNode_1_1 = lastNode_1.next()) {
                    var col = lastNode_1_1.value;
                    _loop_1(col);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lastNode_1_1 && !lastNode_1_1.done && (_a = lastNode_1.return)) _a.call(lastNode_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            props.setInnerLoading(false);
            setFocusedRow(null);
            setFocusedCell(null);
            setFocusedRowForm(null);
            focusedRowChanged === null || focusedRowChanged === void 0 ? void 0 : focusedRowChanged(null);
            focusedCellChanged === null || focusedCellChanged === void 0 ? void 0 : focusedCellChanged({ row: null, field: null });
        }, 300);
        return function () {
            clearTimeout(timer);
        };
    };
    var sleep = function () { return new Promise(function (resolve) { return setTimeout(resolve, 200); }); };
    return (_jsx(React.Fragment, { children: (((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick) !== undefined ||
            ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onSearchClick) !== undefined ||
            ((_c = props.buttons) === null || _c === void 0 ? void 0 : _c.onSaveClick) !== undefined ||
            ((_d = props.buttons) === null || _d === void 0 ? void 0 : _d.onCancelClick) !== undefined ||
            ((_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onDeleteClick) !== undefined ||
            ((_f = props.buttons) === null || _f === void 0 ? void 0 : _f.custom) !== undefined) && (_jsxs("div", __assign({ css: css({
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                columnGap: 5,
                width: "100%",
                "& > button": {
                    fontSize: "18px !important",
                    padding: "3px 11px !important",
                    lineHeight: "26px !important",
                },
                "@media (min-width: 650px)": ((_g = props.buttons) === null || _g === void 0 ? void 0 : _g.isDisabledMobileStyle) === true
                    ? {}
                    : {
                        width: "auto",
                        "& > button": {
                            fontSize: "1.0rem !important",
                            padding: "2px 7px !important",
                        },
                    },
            }) }, { children: [((_h = props.buttons) === null || _h === void 0 ? void 0 : _h.custom) !== undefined && props.buttons.custom, ((_j = props.options) === null || _j === void 0 ? void 0 : _j.showEditModeSelector) && (_jsxs("div", __assign({ css: css({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #d9d9d9",
                        borderRadius: "6px",
                    }) }, { children: [_jsx("p", __assign({ css: css({
                                padding: "0px 11px",
                                height: "100%",
                                borderRight: "1px solid #d9d9d9",
                            }) }, { children: "\uC218\uC815 \uBAA8\uB4DC" })), _jsx("div", __assign({ css: css({
                                "& .ant-select": { width: "100px" },
                                "& .ant-select > .ant-select-selector": { border: "none" },
                            }) }, { children: _jsxs(Select, __assign({ defaultValue: "grid", onChange: function (v) { return setEditMode(v); } }, { children: [_jsx(Select.Option, __assign({ value: "grid" }, { children: "\uADF8\uB9AC\uB4DC" })), _jsx(Select.Option, __assign({ value: "slider" }, { children: "\uC2AC\uB77C\uC774\uB354" }))] })) }))] }))), _jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return props.setIsDetailSearchFormOpen(function (prev) { return !prev; }); }, style: { display: "none" } }, { children: [_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 122.88 113.65", stroke: "currentColor", fill: "currentColor", strokeWidth: "0", height: "1em", width: "1em" }, { children: _jsx("path", { css: css({ fillRule: "evenodd" }), d: "M56.26,0a50.59,50.59,0,0,1,50.46,63.44A49.92,49.92,0,0,1,102,75.25L122.19,96a2.43,2.43,0,0,1,0,3.42L108.2,113a2.42,2.42,0,0,1-3.42,0l-19.35-20A50.34,50.34,0,0,1,61.24,101a11.54,11.54,0,0,0,1.35-9.55,11.19,11.19,0,0,0,2.23-1.15,40.34,40.34,0,1,0-46.51-47.9A11.36,11.36,0,0,0,7.76,43.61a49.69,49.69,0,0,1,2.77-10.92A50.45,50.45,0,0,1,56.26,0Zm-5,53.3,4.27,4.5a3,3,0,0,1-.1,4.2l-3.63,3.44a23.38,23.38,0,0,1,2,5.91l4.58.11a3,3,0,0,1,2.9,3.05l-.16,6.21a3,3,0,0,1-3,2.89l-5-.13a23.42,23.42,0,0,1-2.74,5.62l3.16,3.32a3,3,0,0,1-.11,4.2l-4.5,4.28a3,3,0,0,1-4.2-.11L41.25,97.2a23.38,23.38,0,0,1-5.91,2l-.11,4.58a3,3,0,0,1-3,2.9L26,106.56a3,3,0,0,1-2.89-3l.13-5a24,24,0,0,1-5.62-2.74l-3.32,3.16a3,3,0,0,1-4.2-.11l-4.28-4.5a3,3,0,0,1,.11-4.2l3.62-3.44a23.81,23.81,0,0,1-2-5.91L2.9,80.66a3,3,0,0,1-2.9-3l.16-6.21a3,3,0,0,1,3.05-2.89l5,.12A23.35,23.35,0,0,1,10.94,63L7.78,59.7a3,3,0,0,1,.11-4.2l4.5-4.27a3,3,0,0,1,4.2.1L20,55a23.51,23.51,0,0,1,5.91-2.05l.12-4.57a3,3,0,0,1,3-2.9l6.21.16a3,3,0,0,1,2.89,3l-.12,5a23.53,23.53,0,0,1,5.61,2.74L47,53.22a3,3,0,0,1,4.21.11ZM31,63.88A12.2,12.2,0,1,1,18.44,75.77,12.2,12.2,0,0,1,31,63.88Z" }) })), _jsx(ButtonLabel, { children: (_l = (_k = props.buttons) === null || _k === void 0 ? void 0 : _k.searchText) !== null && _l !== void 0 ? _l : "상세 검색 조건" })] })), ((_m = props.buttons) === null || _m === void 0 ? void 0 : _m.onSearchClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2:
                                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSearchClick);
                                    setDataSource(function (prev) {
                                        return prev.map(function (x) { return (__assign(__assign({}, x), { checked: false })); });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })] })), _jsx(ButtonLabel, { children: (_p = (_o = props.buttons) === null || _o === void 0 ? void 0 : _o.searchText) !== null && _p !== void 0 ? _p : "조회" })] }))), ((_q = props.buttons) === null || _q === void 0 ? void 0 : _q.onAddClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _c.sent();
                                    _c.label = 2;
                                case 2:
                                    if (!(((_a = props.options) === null || _a === void 0 ? void 0 : _a.multipleEdit) === false)) return [3 /*break*/, 4];
                                    if (!(editCount > 0)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, showMessage({
                                            title: "경고",
                                            type: "warnning",
                                            message: "다른 데이터를 수정할 경우\n기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
                                            onOkClick: function () {
                                                var _a;
                                                setDataSource(function (prev) {
                                                    return prev
                                                        .filter(function (f) { return f.mode !== "c"; })
                                                        .map(function (p) { return (__assign(__assign({}, p), { checked: false, mode: "r" })); });
                                                });
                                                ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick)();
                                            },
                                            onCancelClick: function () { },
                                        })];
                                case 3:
                                    _c.sent();
                                    return [2 /*return*/];
                                case 4:
                                    ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onAddClick)();
                                    setFocusedRow(null);
                                    setFocusedCell(null);
                                    setFocusedRowForm(null);
                                    focusedRowChanged === null || focusedRowChanged === void 0 ? void 0 : focusedRowChanged(null);
                                    focusedCellChanged === null || focusedCellChanged === void 0 ? void 0 : focusedCellChanged({ row: null, field: null });
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })] })), _jsx(ButtonLabel, { children: (_s = (_r = props.buttons) === null || _r === void 0 ? void 0 : _r.addText) !== null && _s !== void 0 ? _s : "추가" })] }))), ((_t = props.buttons) === null || _t === void 0 ? void 0 : _t.onSaveClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, bgColor: "#22cb5f", color: "#ffffff", borderColor: "#03cf00", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2:
                                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSaveClick);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" })] })), _jsx(ButtonLabel, { children: ((_v = (_u = props.buttons) === null || _u === void 0 ? void 0 : _u.saveText) !== null && _v !== void 0 ? _v : ((_w = props.options) === null || _w === void 0 ? void 0 : _w.enabledRowCheck) === true)
                                ? "선택 저장"
                                : "저장" })] }))), ((_x = props.buttons) === null || _x === void 0 ? void 0 : _x.onDeleteClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, bgColor: "#df4873", borderColor: "#f15151", color: "#fff", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2:
                                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onDeleteClick);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" })] })), _jsx(ButtonLabel, { children: (_z = (_y = props.buttons) === null || _y === void 0 ? void 0 : _y.deleteText) !== null && _z !== void 0 ? _z : "선택 삭제" })] }))), ((_0 = props.buttons) === null || _0 === void 0 ? void 0 : _0.onCancelClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2:
                                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onCancelClick);
                                    setDataSource(function (prev) {
                                        return prev.map(function (x) { return (__assign(__assign({}, x), { checked: false })); });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })] })), _jsx(ButtonLabel, { children: (_2 = (_1 = props.buttons) === null || _1 === void 0 ? void 0 : _1.cancelText) !== null && _2 !== void 0 ? _2 : "취소" })] }))), ((_4 = (_3 = props.buttons) === null || _3 === void 0 ? void 0 : _3.export) === null || _4 === void 0 ? void 0 : _4.visible) === true && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!sliderFormOpen) return [3 /*break*/, 2];
                                    setFocusedRowForm(null);
                                    setSliderFormOpen(false);
                                    return [4 /*yield*/, sleep()];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2:
                                    ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onExportClick)();
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 576 512", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z" }) })), _jsx(ButtonLabel, { children: (_7 = (_6 = (_5 = props.buttons) === null || _5 === void 0 ? void 0 : _5.export) === null || _6 === void 0 ? void 0 : _6.exportText) !== null && _7 !== void 0 ? _7 : "Export" })] })))] }))) }));
};
export default DevsDtButtons;
