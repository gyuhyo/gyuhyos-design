"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDevsXlsx = void 0;
var XLSX = __importStar(require("sheetjs-style"));
var file_saver_1 = require("file-saver");
var useDevsXlsx = function (_a) {
    var fileName = _a.fileName, sheets = _a.sheets;
    var worksheets = Array.from({ length: sheets.length }, function (v, i) {
        return XLSX.utils.aoa_to_sheet([]);
    }); // 빈 시트 생성
    var onSave = function () {
        var workbook = XLSX.utils.book_new();
        for (var i = 0; i < worksheets.length; i++) {
            XLSX.utils.book_append_sheet(workbook, worksheets[i], sheets[i]);
        }
        var excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        var file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        (0, file_saver_1.saveAs)(file, "".concat(fileName, ".xlsx"));
    };
    return { sheets: worksheets, utils: XLSX.utils, xlsx: XLSX, onSave: onSave };
};
exports.useDevsXlsx = useDevsXlsx;
