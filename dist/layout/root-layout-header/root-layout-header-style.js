/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export var rootLayoutHeaderStyle = css({
    height: "60px",
    background: "linear-gradient(to bottom, #bbbbbb, #d3d3d3, #f3f3f3)",
    borderBottom: "1px solid #e3e3e3",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 12px",
    columnGap: "100px",
    "& > div": {
        display: "flex",
        flexDirection: "row",
        columnGap: "14px",
        alignItems: "center",
    },
    "& > div:first-of-type": {
        flex: "none",
    },
    "& > div:nth-of-type(2)": {
        display: "none",
        flex: "1 1 0%",
        justifyContent: "center",
    },
    "& > div:last-of-type": {
        justifyContent: "end",
    },
    "@media (min-width: 1000px)": {
        "& > div:nth-of-type(2)": {
            display: "flex",
        },
    },
});
