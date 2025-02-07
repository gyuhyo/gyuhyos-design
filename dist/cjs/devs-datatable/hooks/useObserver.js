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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var useIntersectionObserver = function (onIntersect, options) {
    var _a = __read((0, react_2.useState)(null), 2), target = _a[0], setTarget = _a[1];
    var _b = options || {}, root = _b.root, _c = _b.rootMargin, rootMargin = _c === void 0 ? "0px" : _c, _d = _b.threshold, threshold = _d === void 0 ? 0.1 : _d;
    (0, react_2.useLayoutEffect)(function () {
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
    return { setTarget: setTarget, target: target };
};
function useObserver(root) {
    var _a = __read(react_1.default.useState(false), 2), isIntersecting = _a[0], setIsIntersecting = _a[1];
    var onIntersect = function (entries) {
        var _a;
        var localIsIntersecting = ((_a = entries === null || entries === void 0 ? void 0 : entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting) || false;
        if (isIntersecting !== localIsIntersecting) {
            setIsIntersecting(localIsIntersecting);
        }
    };
    var _b = useIntersectionObserver(onIntersect, {
        root: root,
    }), setTarget = _b.setTarget, target = _b.target;
    return { isIntersecting: isIntersecting, setTarget: setTarget };
}
exports.default = useObserver;
