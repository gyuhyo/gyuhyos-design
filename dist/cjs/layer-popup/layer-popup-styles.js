"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerPopupStyles = void 0;
var react_1 = require("@emotion/react");
var layerPopupStyles = function (props) {
    return (0, react_1.css)({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,
        "[data-name='layer-popup-container']": {
            background: "#fff",
            border: "1px solid #c7c7c7",
            borderRadius: "7px",
            boxShadow: "1px 1px 11px #00000050",
            position: "relative",
            display: "flex",
            flexDirection: "column",
        },
        "[data-name='layer-popup-header']": {
            flex: "none",
            borderRadius: "7px 7px 0px 0px",
            background: "linear-gradient(rgb(221, 221, 221), rgb(206, 206, 206), rgb(221, 221, 221))",
            lineHeight: "30px",
            borderBottom: "1px solid #c7c7c7",
            padding: "0px 7px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            "& > p": {
                flex: "1 1 0%",
                cursor: "move",
                width: "100%",
                height: "30px",
                flexGrow: 1,
            },
            "& > [data-name='layer-popup-header-buttons']": {
                flex: "none",
                cursor: "auto",
                "& i": {
                    color: "#5a5a5a",
                    fontSize: "16px",
                    lineHeight: "30px",
                    cursor: "pointer",
                    "&:hover": {
                        color: "#000",
                    },
                    "&:not(:first-of-type)": {
                        marginLeft: "12px",
                    },
                },
            },
        },
        "[data-name='layer-popup-body']": {
            flex: "1 1 0%",
            padding: "7px",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
                width: "10px !important",
                height: "10px !important",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c7c7c7 !important",
                backgroundClip: "padding-box !important",
                border: "2px solid transparent !important",
                borderRadius: "20px !important",
            },
            "&::-webkit-scrollbar-track": {
                background: "#fff",
            },
        },
        "[data-name='layer-popup-footer']": {
            flex: "none",
            borderTop: "1px solid rgb(224, 224, 224)",
            padding: "0px 7px",
        },
    });
};
exports.layerPopupStyles = layerPopupStyles;