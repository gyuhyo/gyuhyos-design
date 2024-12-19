import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import emotionStyled from "@emotion/styled";
export var SideMenuHeaderLogoDiv = emotionStyled.div(function (props) { return ({
    background: "url('http://sqw.iptime.org:8085/header_logo_left1.png')",
    backgroundSize: "cover",
    filter: "invert(0.5)",
    height: "25.98px",
    width: "60px",
    cursor: "pointer",
}); });
export var SideMenuHeaderLogo = function () {
    var onLogoClick = function () {
        window.location.href = "/";
    };
    return _jsx(SideMenuHeaderLogoDiv, { onClick: onLogoClick });
};
