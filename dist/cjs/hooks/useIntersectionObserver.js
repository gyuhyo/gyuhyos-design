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
exports.useIntersectionObserver = void 0;
var react_1 = require("react");
var useIntersectionObserver = function (onIntersect, options) {
    var _a = __read((0, react_1.useState)(null), 2), target = _a[0], setTarget = _a[1];
    var _b = options || {}, root = _b.root, _c = _b.rootMargin, rootMargin = _c === void 0 ? "0px" : _c, _d = _b.threshold, threshold = _d === void 0 ? 0.1 : _d;
    (0, react_1.useLayoutEffect)(function () {
        if (!target)
            return;
        var observer = new IntersectionObserver(onIntersect, {
            root: root,
            rootMargin: rootMargin,
            threshold: threshold,
        });
        observer.observe(target);
        return function () {
            observer.unobserve(target);
            observer.disconnect();
        };
    }, [onIntersect, root, rootMargin, target, threshold]);
    return { setTarget: setTarget };
};
exports.useIntersectionObserver = useIntersectionObserver;
