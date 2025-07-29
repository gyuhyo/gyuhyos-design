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
import { jsxs as _jsxs, jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useMenuStore } from "../stores/menu-store";
import Button from "../../button";
import { useMessage } from "../../alert-message/context/message-context";
var Color3DTextComponent = function (_a) {
    var errorNo = _a.errorNo, color = _a.color;
    return (_jsx(React.Fragment, { children: _jsxs("h1", __assign({ css: css({
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
    var showMessage = useMessage().showMessage;
    var closeMenu = useMenuStore(function (state) { return state.closeMenu; });
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
    return (_jsx("div", __assign({ css: css({
            width: "100%",
            height: "100%",
            position: "relative",
        }) }, { children: _jsxs("div", __assign({ css: css({
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
            }) }, { children: [_jsxs("div", { children: [_jsx(Color3DTextComponent, { errorNo: errorNo, color: errorMessage.color }), _jsx("h4", { children: errorMessage.message })] }), _jsx("div", __assign({ css: css({ alignSelf: "center" }) }, { children: _jsx(Button, __assign({ bgColor: "#df4873", color: "#fff", css: css({ height: 30, width: 200 }), onClick: function () {
                            showMessage({
                                title: "탭 닫기",
                                message: "현재 탭을 닫으시겠습니까?",
                                onOkClick: function () { return closeMenu(menu); },
                            });
                        } }, { children: "\uD604\uC7AC \uD398\uC774\uC9C0 \uB2EB\uAE30" })) }))] })) })));
};
export default PageErrorLayout;
