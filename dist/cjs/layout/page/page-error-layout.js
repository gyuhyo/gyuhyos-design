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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var menu_store_1 = require("../stores/menu-store");
var button_1 = __importDefault(require("../../button"));
var message_context_1 = require("../../alert-message/context/message-context");
var Color3DTextComponent = function (_a) {
    var errorNo = _a.errorNo, color = _a.color;
    return ((0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsxs)("h1", __assign({ css: (0, react_1.css)({
                fontSize: "4rem",
                fontWeight: "bold",
                borderBottom: "2px solid transparent",
                borderImage: "linear-gradient(90deg, #fff 0%, #aaa 50%, #fff 100%)",
                borderImageSlice: 1,
                margin: "0px 0px 11px 0px",
                backgroundImage: "linear-gradient(180deg, ".concat(color, "80 20%, ").concat(color, ", ").concat(color, "10 80%)"),
                color: "transparent",
                backgroundClip: "text",
            }) }, { children: [errorNo.toString(), "!"] })) }));
};
var PageErrorLayout = function (_a) {
    var menu = _a.menu, errorNo = _a.errorNo;
    var showMessage = (0, message_context_1.useMessage)().showMessage;
    var closeMenu = (0, menu_store_1.useMenuStore)(function (state) { return state.closeMenu; });
    var closeCheckRef = React.useRef(null);
    var error = {
        message: "알 수 없는 에러가 발생했습니다.",
        color: "#aaaaaa",
    };
    var errorMessage = React.useMemo(function () {
        if (errorNo === 404) {
            error = {
                message: "페이지를 찾을 수 없습니다.",
                color: "#e71986",
            };
        }
        else if (errorNo === 401) {
            error = {
                message: "페이지 접근 권한이 없습니다.",
                color: "#aaaaaa",
            };
        }
        return error;
    }, [errorNo]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({
            width: "100%",
            height: "100%",
            position: "relative",
        }) }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_1.css)({
                width: 400,
                margin: "0 auto",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                border: "1px solid #ddd",
                padding: "20px 40px",
                borderRadius: "5px",
                boxShadow: "7px 7px 11px #aaaaaa60",
            }) }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Color3DTextComponent, { errorNo: errorNo, color: errorMessage.color }), (0, jsx_runtime_1.jsx)("h4", { children: errorMessage.message })] }), (0, jsx_runtime_1.jsx)("div", __assign({ css: (0, react_1.css)({ alignSelf: "center" }) }, { children: (0, jsx_runtime_1.jsx)(button_1.default, __assign({ bgColor: "#df4873", color: "#fff", css: (0, react_1.css)({ height: 30, width: 200 }), onClick: function () {
                            showMessage({
                                title: "탭 닫기",
                                message: "현재 탭을 닫으시겠습니까?",
                                onOkClick: function () { return closeMenu(menu); },
                            });
                        } }, { children: "\uD604\uC7AC \uD398\uC774\uC9C0 \uB2EB\uAE30" })) }))] })) })));
};
exports.default = PageErrorLayout;
