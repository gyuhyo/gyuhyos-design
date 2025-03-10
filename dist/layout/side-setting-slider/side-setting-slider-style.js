import { css } from "@emotion/react";
export var sideSettingSliderContainerStyle = function (_a) {
    var opened = _a.opened, _b = _a.bgColor, bgColor = _b === void 0 ? "#fff" : _b;
    return css({
        position: "absolute",
        zIndex: 9999,
        width: "280px",
        height: "100dvh",
        top: 0,
        right: opened ? "0px" : "-280px",
        transition: "right 300ms ease-in-out",
        background: bgColor,
    });
};
