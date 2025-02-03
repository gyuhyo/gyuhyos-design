/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export var rootLayoutHeaderStyle = css({
    height: "60px",
    background: "linear-gradient(to bottom, #bbbbbb, #d3d3d3, #f3f3f3)",
    borderBottom: "1px solid #e3e3e3",
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
