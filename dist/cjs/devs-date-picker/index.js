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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var antd_1 = require("antd");
var dayjs_1 = __importDefault(require("dayjs"));
var icons_1 = require("@ant-design/icons");
var react_1 = __importDefault(require("react"));
var usehooks_ts_1 = require("usehooks-ts");
var react_2 = require("@emotion/react");
function DevsDatePicker(props) {
    var selectedDate = props.selectedDate, setSelectedDate = props.setSelectedDate, _a = props.picker, picker = _a === void 0 ? "month" : _a, _b = props.showButton, showButton = _b === void 0 ? true : _b;
    var matches = (0, usehooks_ts_1.useMediaQuery)("(min-width: 1024px)");
    var _c = __read(react_1.default.useState(false), 2), monthPickerButtonHidden = _c[0], setMonthPickerButtonHidden = _c[1];
    react_1.default.useEffect(function () {
        typeof window !== "undefined" && matches
            ? setMonthPickerButtonHidden(false)
            : setMonthPickerButtonHidden(true);
    }, [matches]);
    var onPrevClick = function () {
        if (picker === "date") {
            setSelectedDate(selectedDate.add(-1, "day"));
        }
        if (picker === "month") {
            setSelectedDate(selectedDate.add(-1, "month"));
        }
        if (picker === "year") {
            setSelectedDate(selectedDate.add(-1, "year"));
        }
    };
    var onNextClick = function () {
        if (picker === "date") {
            setSelectedDate(selectedDate.add(+1, "day"));
        }
        if (picker === "month") {
            setSelectedDate(selectedDate.add(+1, "month"));
        }
        if (picker === "year") {
            setSelectedDate(selectedDate.add(+1, "year"));
        }
    };
    var onMonthChaged = function (e, dateString) {
        if (typeof dateString !== "string")
            return;
        setSelectedDate((0, dayjs_1.default)(dateString));
    };
    var prevTitle = react_1.default.useMemo(function () {
        if (picker === "date") {
            return (0, dayjs_1.default)(selectedDate).add(-1, "day").format("YYYY-MM-DD");
        }
        if (picker === "month") {
            return (0, dayjs_1.default)(selectedDate).add(-1, "month").format("YYYY-MM");
        }
        if (picker === "year") {
            return (0, dayjs_1.default)(selectedDate).add(-1, "year").format("YYYY");
        }
    }, [picker, selectedDate]);
    var nextTitle = react_1.default.useMemo(function () {
        if (picker === "date") {
            return (0, dayjs_1.default)(selectedDate).add(+1, "day").format("YYYY-MM-DD");
        }
        if (picker === "month") {
            return (0, dayjs_1.default)(selectedDate).add(+1, "month").format("YYYY-MM");
        }
        if (picker === "year") {
            return (0, dayjs_1.default)(selectedDate).add(+1, "year").format("YYYY");
        }
    }, [picker, selectedDate]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ css: (0, react_2.css)({
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            border: showButton ? "1px solid #cecece" : "none",
            "& button, .ant-picker": {
                border: showButton ? "none" : "1px solid #cecece",
            },
            "& button": {
                width: "30px",
                height: "30px",
                "&:hover": {
                    borderColor: "inherit !important",
                },
                "&:first-of-type": {
                    borderInlineEnd: "1px solid #cecece",
                    borderRadius: "5px 0px 0px 5px",
                },
                "&:last-of-type": {
                    borderInlineStart: "1px solid #cecece",
                    borderRadius: "0px 5px 5px 0px",
                },
            },
            "& .ant-picker": {
                borderRadius: showButton ? 0 : "5px",
                "&:hover": {
                    borderColor: showButton ? "none" : "#4096ff",
                },
            },
        }) }, { children: [showButton && ((0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ placement: "bottom", title: prevTitle }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, {}), onClick: onPrevClick, hidden: monthPickerButtonHidden }) }))), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ placement: "bottom", title: "\uC870\uD68C\uC77C\uC790" }, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, __assign({ value: selectedDate, onChange: onMonthChaged, allowClear: false, inputReadOnly: true }, props)) })), showButton && ((0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ placement: "bottom", title: nextTitle }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.RightOutlined, {}), onClick: onNextClick, hidden: monthPickerButtonHidden }) })))] })));
}
exports.default = react_1.default.memo(DevsDatePicker);
