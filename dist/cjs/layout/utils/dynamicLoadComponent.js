"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var DynamicLoadComponent = function (_component) {
    return react_1.default.lazy(function () {
        return Promise.resolve({ default: _component });
    });
};
exports.default = DynamicLoadComponent;
