/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import React from "react";
export interface DevsDatePickerProps {
    selectedDate: dayjs.Dayjs;
    setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
    picker?: "date" | "month" | "year" | undefined;
    minDate?: string;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}
declare function DevsDatePicker(props: DevsDatePickerProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default DevsDatePicker;
