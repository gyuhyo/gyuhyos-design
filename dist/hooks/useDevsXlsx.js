import * as XLSX from "sheetjs-style";
import { saveAs } from "file-saver";
export var useDevsXlsx = function (_a) {
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
        saveAs(file, "".concat(fileName, ".xlsx"));
    };
    return { sheets: worksheets, utils: XLSX.utils, xlsx: XLSX, onSave: onSave };
};
