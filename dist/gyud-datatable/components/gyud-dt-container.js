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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import newStyled from "@emotion/styled";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import GyudDtTbodyTr from "./gyud-dt-tbody-tr";
import GyudDtTable from "./gyud-dt-table";
import { useGyudDt } from "../context/gyud-dt-context";
var GyudDtContainer = React.forwardRef(function (_, ref) {
    var _a = __read(React.useState(false), 2), onLoad = _a[0], setOnLoad = _a[1];
    var setScrollOffset = useGyudDt(function (state) { return state; }).setScrollOffset;
    var dataSource = useGyudDt(function (state) { return state.dataSource; });
    var store = useGyudDt(function (state) { return state; });
    React.useImperativeHandle(ref, function () { return ({
        store: store,
    }); }, [store]);
    React.useEffect(function () {
        if (onLoad)
            return;
        setOnLoad(true);
    }, [onLoad]);
    var handleShowLastStickyColShadow = function () {
        var container = document.querySelector(".gyud-virtualized-container");
        if (container) {
            var findLastStickyCol = container.querySelectorAll("th[data-is-last-sticky-col='true'], td[data-is-last-sticky-col='true']");
            if (container.scrollLeft > 0) {
                if (findLastStickyCol) {
                    findLastStickyCol.forEach(function (col) {
                        if (col.classList.contains("gyud-dt-sticky-col-last"))
                            return;
                        col.classList.add("gyud-dt-sticky-col-last");
                    });
                }
            }
            else {
                if (findLastStickyCol) {
                    findLastStickyCol.forEach(function (col) {
                        col.classList.remove("gyud-dt-sticky-col-last");
                    });
                }
            }
        }
    };
    React.useEffect(function () {
        if (!onLoad)
            return;
        var container = document.querySelector(".gyud-virtualized-container");
        if (container) {
            container.addEventListener("scroll", handleShowLastStickyColShadow);
        }
        return function () {
            if (container) {
                container.removeEventListener("scroll", handleShowLastStickyColShadow);
            }
        };
    }, [onLoad]);
    return (_jsx(GyudDtWrapper, { children: _jsx(AutoSizer, { children: function (_a) {
                var height = _a.height, width = _a.width;
                return (_jsx(FixedSizeList, __assign({ height: height, itemCount: (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) || 0, itemSize: 30, width: width, innerElementType: GyudDtTable, className: "gyud-virtualized-container", onScroll: function (_a) {
                        var scrollOffset = _a.scrollOffset;
                        console.log("scroll");
                        console.log(scrollOffset);
                        setScrollOffset(scrollOffset);
                    } }, { children: function (_a) {
                        var index = _a.index, style = _a.style;
                        return (_jsx(GyudDtTbodyTr, { index: index, style: style, data: dataSource[index] }, dataSource[index].rowId));
                    } })));
            } }) }));
});
export default GyudDtContainer;
var GyudDtWrapper = newStyled.div({
    overflow: "hidden",
    height: "100%",
    width: "100%",
    border: "1px solid #c6c6c6",
    "& .gyud-scrolling-container": {
        "&::-webkit-scrollbar": {
            position: "relative",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#5d5d5d",
            backgroundClip: "padding-box",
            border: "4px solid transparent",
            borderRadius: "20px",
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 5px 5px 13px #00000030",
        },
        "&::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
        },
    },
});
