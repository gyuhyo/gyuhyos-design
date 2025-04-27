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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var styled_1 = __importDefault(require("@emotion/styled"));
var react_1 = __importDefault(require("react"));
var devs_dt_context_1 = require("./context/devs-dt-context");
var DevsDtPagination = function () {
    var _a, _b;
    var _c = (0, devs_dt_context_1.useDt)(), dataSource = _c.dataSource, options = _c.options, currentPage = _c.currentPage, setCurrentPage = _c.setCurrentPage;
    var numberContainerRef = react_1.default.useRef(null);
    var buttonContainerRef = react_1.default.useRef(null);
    var dataLength = (_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.filter(function (x) { return x.mode !== "c"; }).length) !== null && _a !== void 0 ? _a : 0;
    var totalPageCount = Math.ceil(dataLength / ((_b = options === null || options === void 0 ? void 0 : options.paginationLimit) !== null && _b !== void 0 ? _b : 20));
    react_1.default.useEffect(function () {
        if (!numberContainerRef.current)
            return;
        if (currentPage >= 5) {
            numberContainerRef.current.scrollTo({
                left: 27 * (currentPage - 5) + 27,
                behavior: "smooth",
            });
        }
        else {
            numberContainerRef.current.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        }
    }, [currentPage]);
    var onChangePage = function (page) {
        setCurrentPage(page);
    };
    var onPrevPageMoveClick = react_1.default.useCallback(function () {
        if (currentPage - 7 < 1) {
            setCurrentPage(1);
        }
        else {
            setCurrentPage(currentPage - 7);
        }
    }, [currentPage]);
    var onNextPageMoveClick = react_1.default.useCallback(function () {
        if (currentPage + 7 > totalPageCount) {
            setCurrentPage(totalPageCount);
        }
        else {
            setCurrentPage(currentPage + 7);
        }
    }, [currentPage, totalPageCount]);
    var countPageLabel = react_1.default.useMemo(function () {
        if (options === null || options === void 0 ? void 0 : options.pagination) {
            return "\uCD1D <strong>".concat(dataLength, "</strong>\uAC74 (<strong>").concat(totalPageCount, "</strong>").concat(" ", "\n        \uD398\uC774\uC9C0)");
        }
        return "\uCD1D <strong>".concat(dataLength, "</strong>\uAC74");
    }, [dataLength, options === null || options === void 0 ? void 0 : options.pagination, totalPageCount]);
    react_1.default.useEffect(function () {
        if (!buttonContainerRef.current)
            return;
        buttonContainerRef.current.classList.add("pagination-container-bling");
    }, []);
    if ((options === null || options === void 0 ? void 0 : options.showFooter) === false)
        return null;
    return ((0, jsx_runtime_1.jsxs)(Pagination.Container, { children: [(0, jsx_runtime_1.jsx)(Pagination.DataCountLabel, { dangerouslySetInnerHTML: { __html: countPageLabel } }), (options === null || options === void 0 ? void 0 : options.pagination) && ((0, jsx_runtime_1.jsxs)(Pagination.PageButtonContainer, __assign({ ref: buttonContainerRef }, { children: [(0, jsx_runtime_1.jsx)(Pagination.PageButton, __assign({ "data-disabled": currentPage <= 4, onClick: function () { return onChangePage(1); } }, { children: "<<" })), (0, jsx_runtime_1.jsx)(Pagination.PageButton, __assign({ "data-disabled": currentPage <= 4, onClick: onPrevPageMoveClick }, { children: "<" })), (0, jsx_runtime_1.jsxs)(Pagination.PageNumberContainer, __assign({ ref: numberContainerRef, className: "smooth-scrolling" }, { children: [dataLength === 0 && ((0, jsx_runtime_1.jsx)(Pagination.NumberButton, __assign({ "data-is-current": true }, { children: "1" }))), Array.from({ length: totalPageCount }, function (n, i) { return ((0, jsx_runtime_1.jsx)(Pagination.NumberButton, __assign({ "data-is-current": i + 1 === currentPage, onClick: function () { return onChangePage(i + 1); } }, { children: i + 1 }), "page-".concat(i + 1))); })] })), (0, jsx_runtime_1.jsx)(Pagination.PageButton, __assign({ "data-disabled": currentPage >= totalPageCount - 3, onClick: onNextPageMoveClick }, { children: ">" })), (0, jsx_runtime_1.jsx)(Pagination.PageButton, __assign({ "data-disabled": currentPage >= totalPageCount - 3, onClick: function () { return onChangePage(totalPageCount); } }, { children: ">>" }))] })))] }));
};
exports.default = react_1.default.memo(DevsDtPagination);
var Pagination = {
    Container: styled_1.default.div({
        borderTop: "1px solid #c7c7c7",
        height: "40px",
        display: "flex",
        flexDirection: "row",
        gap: 7,
        flexWrap: "wrap-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 12px",
        "@media (max-width: 600px)": {
            height: "auto",
            justifyContent: "center",
        },
    }),
    DataCountLabel: styled_1.default.p(),
    PageButtonContainer: styled_1.default.div({
        display: "flex",
        flexDirection: "row",
    }),
    PageButton: styled_1.default.div({
        width: 30,
        height: 30,
        textAlign: "center",
        alignContent: "center",
        fontWeight: "bold",
        "&:last-of-type": {
            borderInlineEnd: "none",
        },
        "&[data-disabled='false']:hover": {
            background: "#dddddd",
            cursor: "pointer",
        },
        "&[data-disabled='false']:active": {
            background: "#c5c5c5",
        },
        "&[data-disabled='true']": {
            color: "#ddd",
            pointerEvents: "none",
        },
    }),
    PageNumberContainer: styled_1.default.div({
        maxWidth: "189px",
        width: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        columnGap: "7px",
        padding: "0px 3px",
        overflow: "hidden",
        position: "relative",
    }),
    NumberButton: styled_1.default.div({
        minWidth: 20,
        width: 20,
        height: 20,
        textAlign: "center",
        alignContent: "center",
        "&:not([data-is-current='true']):hover": {
            cursor: "pointer",
            border: "1px solid #c7c7c7",
            background: "#e5e5e5",
            color: "#000",
            borderRadius: "3px",
        },
        "&[data-is-current='true']": {
            border: "1px solid #4469d1",
            background: "#6b82c3",
            color: "#fff",
            borderRadius: "3px",
        },
    }),
};
