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
var styled_1 = __importDefault(require("@emotion/styled"));
var react_1 = __importDefault(require("react"));
var react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
var react_window_1 = require("react-window");
var gyud_dt_tbody_tr_1 = __importDefault(require("./gyud-dt-tbody-tr"));
var gyud_dt_table_1 = __importDefault(require("./gyud-dt-table"));
var gyud_dt_context_1 = require("../context/gyud-dt-context");
var GyudDtContainer = react_1.default.forwardRef(function (_, ref) {
    var _a = __read(react_1.default.useState(false), 2), onLoad = _a[0], setOnLoad = _a[1];
    var setScrollOffset = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; }).setScrollOffset;
    var dataSource = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state.dataSource; });
    var store = (0, gyud_dt_context_1.useGyudDt)(function (state) { return state; });
    react_1.default.useImperativeHandle(ref, function () { return ({
        store: store,
    }); }, [store]);
    react_1.default.useEffect(function () {
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
    react_1.default.useEffect(function () {
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
    return ((0, jsx_runtime_1.jsx)(GyudDtWrapper, { children: (0, jsx_runtime_1.jsx)(react_virtualized_auto_sizer_1.default, { children: function (_a) {
                var height = _a.height, width = _a.width;
                return ((0, jsx_runtime_1.jsx)(react_window_1.FixedSizeList, __assign({ height: height, itemCount: (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) || 0, itemSize: 30, width: width, innerElementType: gyud_dt_table_1.default, className: "gyud-virtualized-container", onScroll: function (_a) {
                        var scrollOffset = _a.scrollOffset;
                        console.log("scroll");
                        console.log(scrollOffset);
                        setScrollOffset(scrollOffset);
                    } }, { children: function (_a) {
                        var index = _a.index, style = _a.style;
                        return ((0, jsx_runtime_1.jsx)(gyud_dt_tbody_tr_1.default, { index: index, style: style, data: dataSource[index] }, dataSource[index].rowId));
                    } })));
            } }) }));
});
exports.default = GyudDtContainer;
var GyudDtWrapper = styled_1.default.div({
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
