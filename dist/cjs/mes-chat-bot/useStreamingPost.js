"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStreamingPost = void 0;
// src/hooks/useStreamingPost.js
var react_1 = require("react");
// 이전에 만들었던 "스마트 분류기" 함수를 훅 안으로 가져오거나 별도 유틸리티로 분리합니다.
var processJsonPayload = function (parsedJson) {
    var _a;
    // 'action' 이벤트일 경우에만 특별 처리를 합니다.
    if (parsedJson.event === "action" && ((_a = parsedJson.data) === null || _a === void 0 ? void 0 : _a.commands)) {
        parsedJson.data.commands.forEach(function (command) {
            // payload가 유효한 JSON 문자열일 경우에만 객체로 변환합니다.
            if (command.payload && typeof command.payload === "string") {
                try {
                    command.payload = JSON.parse(command.payload);
                }
                catch (e) {
                    // 파싱 실패 시 원본 문자열을 그대로 둡니다.
                }
            }
        });
    }
    return parsedJson;
};
var useStreamingPost = function () {
    // 'data'는 모든 구조화된 이벤트 로그를 저장합니다.
    var _a = __read((0, react_1.useState)([]), 2), data = _a[0], setData = _a[1];
    // 'streamText'는 'message' 이벤트의 텍스트만 누적하여 타이핑 효과를 구현합니다.
    var _b = __read((0, react_1.useState)(""), 2), streamText = _b[0], setStreamText = _b[1];
    var _c = __read((0, react_1.useState)(false), 2), isLoading = _c[0], setIsLoading = _c[1];
    var _d = __read((0, react_1.useState)(null), 2), error = _d[0], setError = _d[1];
    var fetchStream = (0, react_1.useCallback)(function (_a) {
        var url = _a.url, body = _a.body;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, reader, decoder, buffer, _b, done, value, lines, _loop_1, lines_1, lines_1_1, line, err_1;
            var e_1, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        setData([]);
                        setStreamText("");
                        setIsLoading(true);
                        setError(null);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(body),
                            })];
                    case 2:
                        response = _e.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! status: ".concat(response.status));
                        }
                        reader = (_d = response.body) === null || _d === void 0 ? void 0 : _d.getReader();
                        if (!reader) {
                            throw new Error("Failed to get ReadableStream reader.");
                        }
                        decoder = new TextDecoder("utf-8");
                        buffer = "";
                        _e.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, reader.read()];
                    case 4:
                        _b = _e.sent(), done = _b.done, value = _b.value;
                        if (done)
                            return [3 /*break*/, 5];
                        // 버퍼에 새로운 청크를 추가하고, 줄바꿈 기준으로 라인들을 분리합니다.
                        buffer += decoder.decode(value, { stream: true });
                        lines = buffer.split("\n");
                        // ✅ 2. 마지막 라인은 데이터가 잘렸을 수 있으므로 다음 청크를 위해 버퍼에 남겨둡니다.
                        buffer = lines.pop() || "";
                        _loop_1 = function (line) {
                            // ✅ 3. 각 라인을 독립적으로 처리합니다. (join X)
                            if (line.startsWith("data:")) {
                                var jsonString = line.slice(5).trim();
                                if (jsonString) {
                                    try {
                                        var parsedJson_1 = JSON.parse(jsonString);
                                        // ✅ 4. "스마트 분류기" 로직으로 이중 포장된 JSON을 처리합니다.
                                        parsedJson_1 = processJsonPayload(parsedJson_1);
                                        // 전체 이벤트 로그에 추가
                                        setData(function (prev) { return __spreadArray(__spreadArray([], __read(prev), false), [parsedJson_1], false); });
                                        // ✅ 5. 'message' 이벤트의 텍스트만 따로 누적합니다.
                                        if (parsedJson_1.event === "message" &&
                                            typeof parsedJson_1.data === "string") {
                                            setStreamText(function (prev) { return prev + parsedJson_1.data; });
                                        }
                                    }
                                    catch (err) {
                                        console.warn("Invalid JSON chunk skipped:", jsonString);
                                    }
                                }
                            }
                        };
                        try {
                            for (lines_1 = (e_1 = void 0, __values(lines)), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                                line = lines_1_1.value;
                                _loop_1(line);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (lines_1_1 && !lines_1_1.done && (_c = lines_1.return)) _c.call(lines_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        err_1 = _e.sent();
                        setError(err_1);
                        console.error("Streaming failed:", err_1);
                        return [3 /*break*/, 8];
                    case 7:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }, []);
    var clearData = (0, react_1.useCallback)(function () {
        setData([]);
        setStreamText("");
    }, []);
    return { data: data, streamText: streamText, isLoading: isLoading, error: error, fetchStream: fetchStream, clearData: clearData };
};
exports.useStreamingPost = useStreamingPost;
