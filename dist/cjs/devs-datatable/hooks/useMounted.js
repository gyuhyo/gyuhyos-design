"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("react");
function useMounted() {
    var _a = __read((0, react_2.useState)(false), 2), mounted = _a[0], setMounted = _a[1];
    var timer;
    (0, react_1.useEffect)(function () {
        timer = setTimeout(function () {
            setMounted(true);
        }, 100);
        return function () { return clearTimeout(timer); };
    }, []);
    return mounted;
}
exports.default = useMounted;
