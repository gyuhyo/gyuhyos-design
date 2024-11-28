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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
var alertMessageBody = css({
    flex: "1 1 0%",
    padding: 12,
    borderBottom: "1px solid #ccc",
});
var AlertMessageBody = React.memo(function (_a) {
    var message = _a.message;
    return (_jsx("div", __assign({ css: alertMessageBody }, { children: typeof message === "string" ? (_jsx("p", __assign({ css: css({ whiteSpace: "pre-wrap" }) }, { children: message }))) : (message) })));
});
export default AlertMessageBody;
