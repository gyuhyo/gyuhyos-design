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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import newStyled from "@emotion/styled";
import * as React from "react";
var alertMessageBody = css({
    flex: "1 1 0%",
    padding: 12,
    borderBottom: "1px solid #ccc",
    alignContent: "center",
});
var AlertMessageBody = React.memo(function (_a) {
    var message = _a.message, input = _a.input, inputOption = _a.inputOption, value = _a.value, setValue = _a.setValue;
    return (_jsxs("div", __assign({ css: alertMessageBody }, { children: [typeof message === "string" ? (_jsx("p", __assign({ css: css({ whiteSpace: "pre-wrap" }) }, { children: message }))) : (message), input && (_jsx(InputBox, { children: _jsx(Input, __assign({ value: value, autoFocus: true, onChange: function (e) { return setValue(e.target.value); } }, inputOption)) }))] })));
});
var InputBox = newStyled.div({
    marginTop: 12,
});
var Input = newStyled.input({
    width: "100%",
    height: 30,
    maxWidth: 400,
    border: "1px solid #ddd",
    padding: "14px 7px",
    marginTop: 3,
});
export default AlertMessageBody;
