"use strict";
/** @jsxImportSource @emotion/react */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootLayoutHeaderStyle = void 0;
var react_1 = require("@emotion/react");
exports.rootLayoutHeaderStyle = (0, react_1.css)({
    height: "60px",
    background: "var(--layout-header-color)",
    borderBottom: "1px solid var(--layout-header-border-color)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
    padding: "0px 12px",
    columnGap: "100px",
    "& > div": {
        display: "flex",
        flexDirection: "row",
        columnGap: "14px",
        alignItems: "center",
    },
    "& > div:nth-of-type(1)": {
        display: "none",
        flex: "none",
    },
    "& > div:nth-of-type(2)": {
        display: "none",
        flex: "1 1 0%",
    },
    "& > div:nth-of-type(3)": {
        flex: "none",
    },
    "@media (min-width: 650px)": {
        justifyContent: "space-between",
        "& > div:nth-of-type(1)": {
            display: "flex",
        },
    },
    "@media (min-width: 1200px)": {
        "& > div:nth-of-type(2)": {
            display: "flex",
        },
    },
});
