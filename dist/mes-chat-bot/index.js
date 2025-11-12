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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import newStyled from "@emotion/styled";
import React from "react";
import { useStreamingPost } from "./useStreamingPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
var MesChatBot = function () {
    var _a = __read(React.useState(false), 2), isOpen = _a[0], setIsOpen = _a[1];
    return (_jsxs(ChatBotPositionedContainer, { children: [_jsx(ChatBotContainer, { isOpen: isOpen, setIsOpen: setIsOpen }), _jsx(ChatBotFloatButton, { setIsOpen: setIsOpen, isOpen: isOpen })] }));
};
export default MesChatBot;
var ChatBotContainer = function (_a) {
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen;
    var _b = useStreamingPost(), data = _b.data, streamText = _b.streamText, isLoading = _b.isLoading, error = _b.error, fetchStream = _b.fetchStream, clearData = _b.clearData;
    var _c = __read(React.useState([]), 2), messages = _c[0], setMessages = _c[1];
    var _d = __read(React.useState("\uC8FC\uC870 \uC0DD\uC0B0 \uBA54\uB274\uB97C \uC5F4\uACE0 \uC870\uD68C \uD6C4 profDate: 2025-08-18, profCount: 100, profNgCount: 5 \uB370\uC774\uD130 \uCD94\uAC00\uD574\uC918."), 2), userMessage = _d[0], setUserMessage = _d[1];
    var onSendMessage = function () {
        setMessages(function (prev) { return __spreadArray(__spreadArray([], __read(prev), false), [
            { role: "user", event: "message", content: userMessage },
        ], false); });
        fetchStream({
            url: "http://localhost:8000/api/stream",
            body: { query: userMessage },
        });
    };
    React.useEffect(function () {
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
    return (_jsxs(ChatBotContainerBox, __assign({ isOpen: isOpen, style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        } }, { children: [_jsxs(ChatBotContainerHeader, { children: [_jsx("p", { children: "ChatBot" }), _jsx("p", { children: _jsx(ChatBotContainerCloseButton, { className: "fa-solid fa-xmark", onClick: function () { return setIsOpen(false); } }) })] }), _jsx(ChatBotContainerContent, { children: messages.map(function (message, index) {
                    if (message.event === "message") {
                        if (message.role === "user") {
                            return (_jsx(ChatBotUserBubble, { children: _jsx("p", { children: message.content }) }, index));
                        }
                        return (_jsx(ChatBotAssistantBubble, { children: _jsx(ReactMarkdown, __assign({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw] }, { children: message.content }), index) }, index));
                    }
                    return null;
                }) }), _jsxs(ChatBotFooter, { children: [_jsx(ChatBotFooterInput, { value: userMessage, onChange: function (e) { return setUserMessage(e.target.value); }, onKeyDown: function (e) {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSendMessage();
                            }
                        } }), _jsx(ChatBotFooterButton, __assign({ onClick: onSendMessage }, { children: _jsx("i", { className: "fa-solid fa-paper-plane" }) }))] })] })));
};
var ChatBotFloatButton = function (_a) {
    var setIsOpen = _a.setIsOpen, isOpen = _a.isOpen;
    return _jsx(ChatBotButton, { isOpen: isOpen, onClick: function () { return setIsOpen(true); } });
};
var ChatBotPositionedContainer = newStyled.div({
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 4,
});
var ChatBotContainerBox = newStyled.div(function (_a) {
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
var ChatBotContainerHeader = newStyled.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f0f0f0",
});
var ChatBotContainerCloseButton = newStyled.i({
    cursor: "pointer",
    "&:hover": {
        color: "#f150a8",
    },
});
var ChatBotContainerContent = newStyled.div({
    flex: 1,
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden auto",
});
var ChatBotUserBubble = newStyled.div({
    backgroundColor: "#e9e9e9",
    borderRadius: "5px 0px 5px 5px",
    boxShadow: "1px 1px 7px 0 rgba(0, 0, 0, 0.3)",
    padding: 10,
    alignSelf: "flex-end",
});
var ChatBotAssistantBubble = newStyled.div({
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-start",
});
var ChatBotFooter = newStyled.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#f0f0f0",
});
var ChatBotFooterInput = newStyled.textarea({
    width: "100%",
    height: "max-content",
    border: "1px solid #e0e0e0",
    borderRadius: 5,
    padding: 10,
    resize: "none",
});
var ChatBotFooterButton = newStyled.button({
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
});
var ChatBotButton = newStyled.div(function (_a) {
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
