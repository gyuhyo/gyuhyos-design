import dayjs from "dayjs";
import React from "react";
export interface DevsDatePickerProps {
    selectedDate: dayjs.Dayjs;
    setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    picker?: "date" | "month" | "year" | undefined;
    showButton?: boolean | undefined;
}
declare function DevsDatePicker(props: DevsDatePickerProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DevsDatePicker>;
export default _default;
