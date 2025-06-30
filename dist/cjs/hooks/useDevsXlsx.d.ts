import * as XLSX from "sheetjs-style";
export declare const useDevsXlsx: ({ fileName, sheets, }: {
    fileName: string;
    sheets: string[];
}) => {
    sheets: XLSX.WorkSheet[];
    utils: typeof XLSX.utils;
    xlsx: typeof XLSX;
    onSave: () => void;
};
