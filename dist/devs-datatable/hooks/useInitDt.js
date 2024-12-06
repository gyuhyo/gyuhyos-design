var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import React from "react";
import useMounted from "./useMounted";
export var useInitDt = function (_a) {
    var e_1, _b;
    var _c, _d, _e, _f;
    var table = _a.table, tbody = _a.tbody, thead = _a.thead;
    var mounted = useMounted();
    var visibleStickyColShadow = function () {
        var e_2, _a;
        var lastStickyCols = table.current.querySelectorAll(".devs-dt-sticky-col-last");
        try {
            for (var lastStickyCols_1 = __values(lastStickyCols), lastStickyCols_1_1 = lastStickyCols_1.next(); !lastStickyCols_1_1.done; lastStickyCols_1_1 = lastStickyCols_1.next()) {
                var el = lastStickyCols_1_1.value;
                el.classList.add("devs-dt-sticky-col-last-visible");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (lastStickyCols_1_1 && !lastStickyCols_1_1.done && (_a = lastStickyCols_1.return)) _a.call(lastStickyCols_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    var hiddenStickyColShadow = function () {
        var e_3, _a;
        var lastStickyCols = table.current.querySelectorAll(".devs-dt-sticky-col-last");
        try {
            for (var lastStickyCols_2 = __values(lastStickyCols), lastStickyCols_2_1 = lastStickyCols_2.next(); !lastStickyCols_2_1.done; lastStickyCols_2_1 = lastStickyCols_2.next()) {
                var el = lastStickyCols_2_1.value;
                el.classList.remove("devs-dt-sticky-col-last-visible");
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (lastStickyCols_2_1 && !lastStickyCols_2_1.done && (_a = lastStickyCols_2.return)) _a.call(lastStickyCols_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    var hiddenLastColumnBorder = function () {
        var e_4, _a;
        var lastColumn = table.current.querySelectorAll(".devs-dt-thead .devs-dt-row:first-child .devs-dt-th:nth-last-child(3), .devs-dt-thead .devs-dt-row:not(:first-child) .devs-dt-th:last-child, .devs-dt-tbody .devs-dt-row > .devs-dt-cell:last-child");
        try {
            for (var lastColumn_1 = __values(lastColumn), lastColumn_1_1 = lastColumn_1.next(); !lastColumn_1_1.done; lastColumn_1_1 = lastColumn_1.next()) {
                var el = lastColumn_1_1.value;
                if (el.classList.contains("devs-dt-no-hidden-border"))
                    continue;
                el.classList.add("devs-dt-hidden-border");
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (lastColumn_1_1 && !lastColumn_1_1.done && (_a = lastColumn_1.return)) _a.call(lastColumn_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    var visibleLastColumnBorder = function () {
        var e_5, _a;
        var lastColumn = table.current.querySelectorAll(".devs-dt-thead .devs-dt-row:first-child .devs-dt-th:nth-last-child(3), .devs-dt-thead .devs-dt-row:not(:first-child) .devs-dt-th:last-child, .devs-dt-tbody .devs-dt-row > .devs-dt-cell:last-child");
        try {
            for (var lastColumn_2 = __values(lastColumn), lastColumn_2_1 = lastColumn_2.next(); !lastColumn_2_1.done; lastColumn_2_1 = lastColumn_2.next()) {
                var el = lastColumn_2_1.value;
                el.classList.remove("devs-dt-hidden-border");
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (lastColumn_2_1 && !lastColumn_2_1.done && (_a = lastColumn_2.return)) _a.call(lastColumn_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    React.useEffect(function () {
        // body 스크롤 시 동시 head 스크롤 적용
        if (!tbody.current || !thead.current)
            return;
        var tableBodyScrolling = function () {
            thead.current.scrollLeft = tbody.current.scrollLeft;
            if (tbody.current.scrollWidth !== tbody.current.clientWidth &&
                tbody.current.scrollWidth -
                    tbody.current.clientWidth -
                    tbody.current.scrollLeft ===
                    0) {
                hiddenLastColumnBorder();
            }
            else {
                visibleLastColumnBorder();
            }
            if (tbody.current.scrollLeft > 0) {
                visibleStickyColShadow();
            }
            else {
                hiddenStickyColShadow();
            }
        };
        tbody.current.addEventListener("scroll", tableBodyScrolling);
        return function () {
            if (tbody.current) {
                tbody.current.removeEventListener("scroll", tableBodyScrolling);
            }
        };
    }, [mounted]);
    if (mounted && tbody.current && thead.current) {
        var theadStickyCols = thead.current.querySelectorAll(".devs-dt-row .devs-dt-sticky-col");
        var setLeft = 0;
        // head sticky col 설정
        for (var cell = 0; cell < theadStickyCols.length; cell++) {
            theadStickyCols[cell].style.left = "".concat(setLeft, "px");
            setLeft += (_c = theadStickyCols[cell].getBoundingClientRect()) === null || _c === void 0 ? void 0 : _c.width;
        }
        if (theadStickyCols.length > 0) {
            // last sticky col shadow 설정
            theadStickyCols[theadStickyCols.length - 1].classList.add("devs-dt-sticky-col-last");
        }
        var tbodyRows = tbody.current.querySelectorAll(".devs-dt-row");
        try {
            // body sticky col 설정
            for (var tbodyRows_1 = __values(tbodyRows), tbodyRows_1_1 = tbodyRows_1.next(); !tbodyRows_1_1.done; tbodyRows_1_1 = tbodyRows_1.next()) {
                var row = tbodyRows_1_1.value;
                var stickyColsInRow = row.querySelectorAll(".devs-dt-sticky-col");
                var setLeft_1 = 0;
                for (var cell = 0; cell < stickyColsInRow.length; cell++) {
                    stickyColsInRow[cell].style.left = "".concat(setLeft_1, "px");
                    if (stickyColsInRow[cell].dataset.hidden === "true") {
                        setLeft_1 += parseFloat((_e = (_d = stickyColsInRow[cell].dataset.width) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "100");
                    }
                    else {
                        setLeft_1 += (_f = stickyColsInRow[cell].getBoundingClientRect()) === null || _f === void 0 ? void 0 : _f.width;
                    }
                    if (cell === stickyColsInRow.length - 1) {
                        // last sticky col shadow 설정
                        stickyColsInRow[cell].classList.add("devs-dt-sticky-col-last");
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tbodyRows_1_1 && !tbodyRows_1_1.done && (_b = tbodyRows_1.return)) _b.call(tbodyRows_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return true;
};
