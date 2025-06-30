import * as XLSX from "sheetjs-style";
import { saveAs } from "file-saver";

export const useDevsXlsx = ({
  fileName,
  sheets,
}: {
  fileName: string;
  sheets: string[];
}): {
  sheets: XLSX.WorkSheet[];
  utils: typeof XLSX.utils;
  xlsx: typeof XLSX;
  onSave: () => void;
} => {
  let worksheets = Array.from({ length: sheets.length }, (v, i) =>
    XLSX.utils.aoa_to_sheet([])
  ); // 빈 시트 생성

  const onSave = () => {
    const workbook = XLSX.utils.book_new();
    for (let i = 0; i < worksheets.length; i++) {
      XLSX.utils.book_append_sheet(workbook, worksheets[i], sheets[i]);
    }

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `${fileName}.xlsx`);
  };

  return { sheets: worksheets, utils: XLSX.utils, xlsx: XLSX, onSave: onSave };
};
