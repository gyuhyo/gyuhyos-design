"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideMenuHeaderLogo = exports.SideMenuHeaderLogoDiv = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
exports.SideMenuHeaderLogoDiv = styled_1.default.div(function (props) { return ({
    background: "url('http://sqw.iptime.org:8085/header_logo_left1.png')",
    backgroundSize: "cover",
    filter: "invert(0.5)",
    height: "25.98px",
    width: "60px",
    cursor: "pointer",
}); });
var SideMenuHeaderLogo = function () {
    var onLogoClick = function () {
        window.location.href = "/";
    };
    return (0, jsx_runtime_1.jsx)(exports.SideMenuHeaderLogoDiv, { onClick: onLogoClick });
};
exports.SideMenuHeaderLogo = SideMenuHeaderLogo;
