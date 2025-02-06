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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Button from "../../button";
import { useDt } from "../context/devs-dt-context";
var ButtonLabel = styled.span({
    display: "none",
    "@media (min-width: 650px)": {
        display: "block",
    },
});
var DevsDtButtons = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    var _4 = useDt(), setDataSource = _4.setDataSource, setFocusedRow = _4.setFocusedRow, setFocusedCell = _4.setFocusedCell, sliderFormOpen = _4.sliderFormOpen, setFocusedRowForm = _4.setFocusedRowForm, setSliderFormOpen = _4.setSliderFormOpen;
    var ButtonEventBeforeShowLoading = function (event) {
        props.setInnerLoading(true);
        var timer = setTimeout(function () {
            if (event !== undefined) {
                event();
            }
            props.setInnerLoading(false);
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
                    fontSize: "18px",
                    padding: "3px 11px",
                    lineHeight: "26px",
                },
                "@media (min-width: 650px)": {
                    width: "auto",
                    "& > button": {
                        fontSize: "1.0rem",
                        padding: "2px 7px",
                    },
                },
            }) }, { children: [((_g = props.buttons) === null || _g === void 0 ? void 0 : _g.custom) !== undefined && props.buttons.custom, ((_h = props.buttons) === null || _h === void 0 ? void 0 : _h.onSearchClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    setFocusedRow(null);
                                    setFocusedCell(null);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })] })), _jsx(ButtonLabel, { children: (_k = (_j = props.buttons) === null || _j === void 0 ? void 0 : _j.searchText) !== null && _k !== void 0 ? _k : "조회" })] }))), ((_l = props.buttons) === null || _l === void 0 ? void 0 : _l.onAddClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    ((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onAddClick)();
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })] })), _jsx(ButtonLabel, { children: (_o = (_m = props.buttons) === null || _m === void 0 ? void 0 : _m.addText) !== null && _o !== void 0 ? _o : "추가" })] }))), ((_p = props.buttons) === null || _p === void 0 ? void 0 : _p.onSaveClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, bgColor: "#22cb5f", color: "#ffffff", borderColor: "#03cf00", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    setFocusedRow(null);
                                    setFocusedCell(null);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" })] })), _jsx(ButtonLabel, { children: ((_r = (_q = props.buttons) === null || _q === void 0 ? void 0 : _q.saveText) !== null && _r !== void 0 ? _r : ((_s = props.options) === null || _s === void 0 ? void 0 : _s.enabledRowCheck) === true)
                                ? "선택 저장"
                                : "저장" })] }))), ((_t = props.buttons) === null || _t === void 0 ? void 0 : _t.onDeleteClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, bgColor: "#df4873", borderColor: "#f15151", color: "#fff", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    setFocusedRow(null);
                                    setFocusedCell(null);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" })] })), _jsx(ButtonLabel, { children: (_v = (_u = props.buttons) === null || _u === void 0 ? void 0 : _u.deleteText) !== null && _v !== void 0 ? _v : "선택 삭제" })] }))), ((_w = props.buttons) === null || _w === void 0 ? void 0 : _w.onCancelClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    setFocusedRow(null);
                                    setFocusedCell(null);
                                    return [2 /*return*/];
                            }
                        });
                    }); } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })] })), _jsx(ButtonLabel, { children: (_y = (_x = props.buttons) === null || _x === void 0 ? void 0 : _x.cancelText) !== null && _y !== void 0 ? _y : "취소" })] }))), ((_0 = (_z = props.buttons) === null || _z === void 0 ? void 0 : _z.export) === null || _0 === void 0 ? void 0 : _0.visible) === true && (_jsxs(Button, __assign({ border: true, compact: true, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    }); } }, { children: [_jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 576 512", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z" }) })), _jsx(ButtonLabel, { children: (_3 = (_2 = (_1 = props.buttons) === null || _1 === void 0 ? void 0 : _1.export) === null || _2 === void 0 ? void 0 : _2.exportText) !== null && _3 !== void 0 ? _3 : "Export" })] })))] }))) }));
};
export default DevsDtButtons;
