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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useDt } from "../context/devs-dt-context";
import { useLayout } from "../../layout/contexts/layout-context";
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
var DevsDtTFoot = React.memo(function () {
    var theme = useLayout().theme;
    var footRef = React.useRef(null);
    var _a = useDt(), options = _a.options, dataSource = _a.dataSource, columns = _a.columns, tbody = _a.tbody;
    var _b = __read(React.useState("absolute"), 2), position = _b[0], setPosition = _b[1];
    var lastNode = React.useMemo(function () { return getLastNodes(columns); }, [columns]);
    var mergedCellsCount = React.useMemo(function () {
        var _a = (options === null || options === void 0 ? void 0 : options.enabledRowOrder)
            ? { order: 1, orderWidth: 30 }
            : { order: 0, orderWidth: 0 }, order = _a.order, orderWidth = _a.orderWidth;
        var _b = (options === null || options === void 0 ? void 0 : options.enabledExpand)
            ? { expand: 1, expandWidth: 30 }
            : { expand: 0, expandWidth: 0 }, expand = _b.expand, expandWidth = _b.expandWidth;
        var _c = (options === null || options === void 0 ? void 0 : options.showRowNumber)
            ? { rowNo: 1, rowNoWidth: 50 }
            : { rowNo: 0, rowNoWidth: 0 }, rowNo = _c.rowNo, rowNoWidth = _c.rowNoWidth;
        var _d = (options === null || options === void 0 ? void 0 : options.enabledRowCheck)
            ? { check: 1, checkWidth: 30 }
            : { check: 0, checkWidth: 0 }, check = _d.check, checkWidth = _d.checkWidth;
        return {
            mergeCount: order + expand + rowNo + check,
            widths: orderWidth + expandWidth + rowNoWidth + checkWidth,
        };
    }, [options]);
    React.useEffect(function () {
        if (!(tbody === null || tbody === void 0 ? void 0 : tbody.current) || !(footRef === null || footRef === void 0 ? void 0 : footRef.current) || dataSource.length === 0)
            return;
        if (tbody.current.scrollHeight > tbody.current.clientHeight) {
            setPosition("sticky");
        }
        else {
            setPosition("absolute");
        }
    }, [JSON.stringify(dataSource)]);
    return (_jsx("table", __assign({ ref: footRef, "data-table-type": "devs-dt-tfoot", className: "devs-dt-table devs-dt-table-fixed", css: css({
            height: 40,
            position: position,
            bottom: 0,
            zIndex: 4,
            boxShadow: "0px -5px 12px #00000050",
        }) }, { children: _jsx("tfoot", __assign({ className: "devs-dt-tbody" }, { children: _jsxs("tr", __assign({ className: "devs-dt-row" }, { children: [mergedCellsCount.mergeCount > 0 && (_jsx("td", __assign({ className: "devs-dt-cell devs-dt-th devs-dt-sticky-col", style: {
                            left: 0,
                            "--width": "".concat(mergedCellsCount.widths, "px"),
                            borderTop: "1px solid #c6c6c6",
                            textAlign: "center",
                        } }, { children: "\uD569\uACC4" }))), lastNode &&
                        lastNode.map(function (col) {
                            var _a, _b, _c, _d;
                            var className = "devs-dt-cell";
                            if (col.sticky)
                                className += " devs-dt-sticky-col";
                            return (_jsx("td", __assign({ "data-cell-type": "data-cell", "data-field": col.field, className: className, style: __assign({ borderTop: "1px solid #c6c6c6", "--width": "".concat((_a = col.width) !== null && _a !== void 0 ? _a : 100, "px"), textAlign: (_b = col.align) !== null && _b !== void 0 ? _b : "left" }, (_c = col.style) === null || _c === void 0 ? void 0 : _c.call(col, {
                                    target: "tfoot",
                                    theme: theme,
                                })) }, { children: _jsx("div", __assign({ style: {
                                        position: "relative",
                                        overflow: "hidden",
                                        whiteSpace: "pre",
                                        textOverflow: "ellipsis",
                                        wordBreak: "keep-all",
                                        width: "100%",
                                        height: "100%",
                                        alignContent: "center",
                                        zIndex: 2,
                                    } }, { children: (_d = col.footer) === null || _d === void 0 ? void 0 : _d.call(col, dataSource) })) }), col.field));
                        })] })) })) })));
});
export default DevsDtTFoot;
