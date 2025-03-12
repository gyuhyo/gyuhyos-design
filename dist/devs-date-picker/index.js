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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { Button, DatePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { css } from "@emotion/react";
function DevsDatePicker(props) {
    var selectedDate = props.selectedDate, setSelectedDate = props.setSelectedDate, _a = props.picker, picker = _a === void 0 ? "month" : _a, _b = props.minDate, minDate = _b === void 0 ? "1990-01-01" : _b;
    var matches = useMediaQuery("(min-width: 600px)");
    var showButton = matches;
    var _c = __read(React.useState(false), 2), monthPickerButtonHidden = _c[0], setMonthPickerButtonHidden = _c[1];
    React.useEffect(function () {
        typeof window !== "undefined" && matches
            ? setMonthPickerButtonHidden(false)
            : setMonthPickerButtonHidden(true);
    }, [matches]);
    var onPrevClick = function () {
        if (picker === "date" && selectedDate.add(-1, "day") >= dayjs(minDate)) {
            setSelectedDate(selectedDate.add(-1, "day"));
        }
        if (picker === "month" && selectedDate.add(-1, "month") >= dayjs(minDate)) {
            setSelectedDate(selectedDate.add(-1, "month"));
        }
        if (picker === "year" && selectedDate.add(-1, "year") >= dayjs(minDate)) {
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
        setSelectedDate(dayjs(dateString));
    };
    var prevTitle = React.useMemo(function () {
        if (picker === "date") {
            return dayjs(selectedDate).add(-1, "day").format("YYYY-MM-DD");
        }
        if (picker === "month") {
            return dayjs(selectedDate).add(-1, "month").format("YYYY-MM");
        }
        if (picker === "year") {
            return dayjs(selectedDate).add(-1, "year").format("YYYY");
        }
    }, [picker, selectedDate]);
    var nextTitle = React.useMemo(function () {
        if (picker === "date") {
            return dayjs(selectedDate).add(+1, "day").format("YYYY-MM-DD");
        }
        if (picker === "month") {
            return dayjs(selectedDate).add(+1, "month").format("YYYY-MM");
        }
        if (picker === "year") {
            return dayjs(selectedDate).add(+1, "year").format("YYYY");
        }
    }, [picker, selectedDate]);
    return (_jsxs("div", __assign({ css: css({
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
        }) }, { children: [_jsx(Tooltip, __assign({ placement: "bottom", title: prevTitle }, { children: _jsx(Button, { icon: _jsx(LeftOutlined, {}), onClick: onPrevClick, css: css({
                        display: monthPickerButtonHidden
                            ? "none !important"
                            : "block !important",
                    }) }) })), _jsx(Tooltip, __assign({ placement: "bottom", title: "\uC870\uD68C\uC77C\uC790" }, { children: _jsx(DatePicker, { picker: picker, value: selectedDate, onChange: onMonthChaged, allowClear: false, inputReadOnly: true, minDate: dayjs(minDate), css: css({
                        minWidth: "120px !important",
                        height: monthPickerButtonHidden ? "26px" : "100%",
                    }) }) })), _jsx(Tooltip, __assign({ placement: "bottom", title: nextTitle }, { children: _jsx(Button, { icon: _jsx(RightOutlined, {}), onClick: onNextClick, css: css({
                        display: monthPickerButtonHidden
                            ? "none !important"
                            : "block !important",
                    }) }) }))] })));
}
export default DevsDatePicker;
