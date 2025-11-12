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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var styled_1 = __importDefault(require("@emotion/styled"));
var react_1 = __importDefault(require("react"));
var useStreamingPost_1 = require("./useStreamingPost");
var react_markdown_1 = __importDefault(require("react-markdown"));
var remark_gfm_1 = __importDefault(require("remark-gfm"));
var rehype_raw_1 = __importDefault(require("rehype-raw"));
var MesChatBot = function () {
    var _a = __read(react_1.default.useState(false), 2), isOpen = _a[0], setIsOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(ChatBotPositionedContainer, { children: [(0, jsx_runtime_1.jsx)(ChatBotContainer, { isOpen: isOpen, setIsOpen: setIsOpen }), (0, jsx_runtime_1.jsx)(ChatBotFloatButton, { setIsOpen: setIsOpen, isOpen: isOpen })] }));
};
exports.default = MesChatBot;
var ChatBotContainer = function (_a) {
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen;
    var _b = (0, useStreamingPost_1.useStreamingPost)(), data = _b.data, streamText = _b.streamText, isLoading = _b.isLoading, error = _b.error, fetchStream = _b.fetchStream, clearData = _b.clearData;
    var _c = __read(react_1.default.useState([]), 2), messages = _c[0], setMessages = _c[1];
    var _d = __read(react_1.default.useState("\uC8FC\uC870 \uC0DD\uC0B0 \uBA54\uB274\uB97C \uC5F4\uACE0 \uC870\uD68C \uD6C4 profDate: 2025-08-18, profCount: 100, profNgCount: 5 \uB370\uC774\uD130 \uCD94\uAC00\uD574\uC918."), 2), userMessage = _d[0], setUserMessage = _d[1];
    var onSendMessage = function () {
        setMessages(function (prev) { return __spreadArray(__spreadArray([], __read(prev), false), [
            { role: "user", event: "message", content: userMessage },
        ], false); });
        fetchStream({
            url: "http://localhost:8000/api/stream",
            body: { query: userMessage },
        });
    };
    react_1.default.useEffect(function () {
        if (data.length === 0)
            return;
        var lastEvent = data[data.length - 1].event;
        if (lastEvent === "message") {
            setMessages(function (prev) {
                var newContent = prev[prev.length - 1].role === "assistant" && "message"
                    ? prev[prev.length - 1].content + data[data.length - 1].data
                    : data[data.length - 1].data;
                return __spreadArray(__spreadArray([], __read((prev[prev.length - 1].role === "assistant" &&
                    prev[prev.length - 1].event === "message"
                    ? prev.slice(0, -1)
                    : prev)), false), [
                    {
                        role: "assistant",
                        event: lastEvent,
                        content: newContent,
                    },
                ], false);
            });
        }
        else {
            setMessages(function (prev) { return __spreadArray(__spreadArray([], __read(prev), false), [
                {
                    role: "assistant",
                    event: lastEvent,
                    content: data[data.length - 1].data,
                },
            ], false); });
        }
    }, [streamText]);
    return ((0, jsx_runtime_1.jsxs)(ChatBotContainerBox, __assign({ isOpen: isOpen, style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        } }, { children: [(0, jsx_runtime_1.jsxs)(ChatBotContainerHeader, { children: [(0, jsx_runtime_1.jsx)("p", { children: "ChatBot" }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(ChatBotContainerCloseButton, { className: "fa-solid fa-xmark", onClick: function () { return setIsOpen(false); } }) })] }), (0, jsx_runtime_1.jsx)(ChatBotContainerContent, { children: messages.map(function (message, index) {
                    if (message.event === "message") {
                        if (message.role === "user") {
                            return ((0, jsx_runtime_1.jsx)(ChatBotUserBubble, { children: (0, jsx_runtime_1.jsx)("p", { children: message.content }) }, index));
                        }
                        return ((0, jsx_runtime_1.jsx)(ChatBotAssistantBubble, { children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, __assign({ remarkPlugins: [remark_gfm_1.default], rehypePlugins: [rehype_raw_1.default] }, { children: message.content }), index) }, index));
                    }
                    return null;
                }) }), (0, jsx_runtime_1.jsxs)(ChatBotFooter, { children: [(0, jsx_runtime_1.jsx)(ChatBotFooterInput, { value: userMessage, onChange: function (e) { return setUserMessage(e.target.value); }, onKeyDown: function (e) {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSendMessage();
                            }
                        } }), (0, jsx_runtime_1.jsx)(ChatBotFooterButton, __assign({ onClick: onSendMessage }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fa-solid fa-paper-plane" }) }))] })] })));
};
var ChatBotFloatButton = function (_a) {
    var setIsOpen = _a.setIsOpen, isOpen = _a.isOpen;
    return (0, jsx_runtime_1.jsx)(ChatBotButton, { isOpen: isOpen, onClick: function () { return setIsOpen(true); } });
};
var ChatBotPositionedContainer = styled_1.default.div({
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 4,
});
var ChatBotContainerBox = styled_1.default.div(function (_a) {
    var isOpen = _a.isOpen;
    return ({
        scale: isOpen ? 1 : 0,
        opacity: isOpen ? 1 : 0,
        boxShadow: isOpen ? "2px 2px 10px 0 rgba(0, 0, 0, 0.5)" : "none",
        width: isOpen ? 450 : 0,
        height: isOpen ? 600 : 0,
        borderRadius: 5,
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
    });
});
var ChatBotContainerHeader = styled_1.default.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f0f0f0",
});
var ChatBotContainerCloseButton = styled_1.default.i({
    cursor: "pointer",
    "&:hover": {
        color: "#f150a8",
    },
});
var ChatBotContainerContent = styled_1.default.div({
    flex: 1,
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden auto",
});
var ChatBotUserBubble = styled_1.default.div({
    backgroundColor: "#e9e9e9",
    borderRadius: "5px 0px 5px 5px",
    boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.3)",
    padding: 10,
    alignSelf: "flex-end",
});
var ChatBotAssistantBubble = styled_1.default.div({
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-start",
});
var ChatBotFooter = styled_1.default.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#f0f0f0",
});
var ChatBotFooterInput = styled_1.default.textarea({
    width: "100%",
    height: "max-content",
    border: "1px solid #e0e0e0",
    borderRadius: 5,
    padding: 10,
    resize: "none",
});
var ChatBotFooterButton = styled_1.default.button({
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
});
var ChatBotButton = styled_1.default.div(function (_a) {
    var isOpen = _a.isOpen;
    return ({
        position: "relative",
        placeSelf: "end",
        opacity: isOpen ? 0 : 1,
        width: isOpen ? 0 : 50,
        height: isOpen ? 0 : 50,
        backgroundColor: "#fff",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "2px 2px 10px 0 rgba(0, 0, 0, 0.5)",
        backgroundImage: "url(/1538298822.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: "#f0f0f0",
            transform: "scale(1.1)",
        },
        "&::after": {
            content: "'AI'",
            position: "absolute",
            top: -3,
            right: -3,
            background: "linear-gradient(45deg, #db64de, #67d1f1)",
            borderRadius: 7,
            color: "#fff",
            padding: "0 7px",
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
            boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.3)",
        },
    });
});
