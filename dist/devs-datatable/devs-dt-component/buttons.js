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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import Button from "../../button";
import { useDt } from "../context/devs-dt-context";
var DevsDtButtons = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    var _0 = useDt(), setDataSource = _0.setDataSource, setFocusedRow = _0.setFocusedRow, setFocusedCell = _0.setFocusedCell;
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
    return (_jsxs("div", __assign({ style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: 5,
        } }, { children: [((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.custom) !== undefined && props.buttons.custom, ((_b = props.buttons) === null || _b === void 0 ? void 0 : _b.onSearchClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "2px 7px", lineHeight: "26px" }, onClick: function () {
                    var _a;
                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSearchClick);
                    setDataSource(function (prev) {
                        return prev.map(function (x) { return (__assign(__assign({}, x), { checked: false })); });
                    });
                    setFocusedRow(null);
                    setFocusedCell(null);
                } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })] })), _jsx("span", { children: (_d = (_c = props.buttons) === null || _c === void 0 ? void 0 : _c.searchText) !== null && _d !== void 0 ? _d : "조회" })] }))), ((_e = props.buttons) === null || _e === void 0 ? void 0 : _e.onAddClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "2px 7px", lineHeight: "26px" }, onClick: (_f = props.buttons) === null || _f === void 0 ? void 0 : _f.onAddClick }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })] })), _jsx("span", { children: (_h = (_g = props.buttons) === null || _g === void 0 ? void 0 : _g.addText) !== null && _h !== void 0 ? _h : "추가" })] }))), ((_j = props.buttons) === null || _j === void 0 ? void 0 : _j.onSaveClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "2px 7px", lineHeight: "26px" }, onClick: function () {
                    var _a;
                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onSaveClick);
                    setFocusedRow(null);
                    setFocusedCell(null);
                } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" })] })), _jsx("span", { children: ((_l = (_k = props.buttons) === null || _k === void 0 ? void 0 : _k.saveText) !== null && _l !== void 0 ? _l : ((_m = props.options) === null || _m === void 0 ? void 0 : _m.enabledRowCheck) === true)
                            ? "선택 저장"
                            : "저장" })] }))), ((_o = props.buttons) === null || _o === void 0 ? void 0 : _o.onDeleteClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "2px 7px", lineHeight: "26px" }, bgColor: "#df4873", color: "#fff", onClick: function () {
                    var _a;
                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onDeleteClick);
                    setFocusedRow(null);
                    setFocusedCell(null);
                } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" })] })), _jsx("span", { children: (_q = (_p = props.buttons) === null || _p === void 0 ? void 0 : _p.deleteText) !== null && _q !== void 0 ? _q : "선택 삭제" })] }))), ((_r = props.buttons) === null || _r === void 0 ? void 0 : _r.onCancelClick) !== undefined && (_jsxs(Button, __assign({ border: true, compact: true, style: { padding: "2px 7px", lineHeight: "26px" }, onClick: function () {
                    var _a;
                    ButtonEventBeforeShowLoading((_a = props.buttons) === null || _a === void 0 ? void 0 : _a.onCancelClick);
                    setDataSource(function (prev) {
                        return prev.map(function (x) { return (__assign(__assign({}, x), { checked: false })); });
                    });
                    setFocusedRow(null);
                    setFocusedCell(null);
                } }, { children: [_jsxs("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })] })), _jsx("span", { children: (_t = (_s = props.buttons) === null || _s === void 0 ? void 0 : _s.cancelText) !== null && _t !== void 0 ? _t : "취소" })] }))), ((_v = (_u = props.buttons) === null || _u === void 0 ? void 0 : _u.export) === null || _v === void 0 ? void 0 : _v.visible) === true && (_jsxs(Button, __assign({ border: true, compact: true, style: {
                    padding: "2px 7px",
                    lineHeight: "26px",
                    position: "relative",
                }, onClick: (_w = props.buttons) === null || _w === void 0 ? void 0 : _w.onExportClick }, { children: [_jsx("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 576 512", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z" }) })), _jsx("span", { children: (_z = (_y = (_x = props.buttons) === null || _x === void 0 ? void 0 : _x.export) === null || _y === void 0 ? void 0 : _y.exportText) !== null && _z !== void 0 ? _z : "Export" })] })))] })));
};
export default DevsDtButtons;
