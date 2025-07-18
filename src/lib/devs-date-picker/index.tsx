/** @jsxImportSource @emotion/react */

import { Button, DatePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { css } from "@emotion/react";

export interface DevsDatePickerProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  picker?: "date" | "month" | "year" | undefined;
  minDate?: string;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DevsDatePicker(props: DevsDatePickerProps) {
  const {
    selectedDate,
    setSelectedDate,
    picker = "month",
    minDate = "1990-01-01",
    setIsLoading,
    ...config
  } = props;
  const matches = useMediaQuery("(min-width: 600px)");
  const showButton = matches;
  const [datePickerValue, setDatePickerValue] = React.useState(selectedDate);
  const [monthPickerButtonHidden, setMonthPickerButtonHidden] =
    React.useState(false);

  React.useEffect(() => {
    typeof window !== "undefined" && matches
      ? setMonthPickerButtonHidden(false)
      : setMonthPickerButtonHidden(true);
  }, [matches]);

  let timer: NodeJS.Timeout;
  React.useEffect(() => {
    if (setIsLoading) setIsLoading(true);

    timer = setTimeout(() => {
      setSelectedDate(datePickerValue);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [datePickerValue]);

  const onPrevClick = () => {
    if (picker === "date" && datePickerValue.add(-1, "day") >= dayjs(minDate)) {
      setDatePickerValue(datePickerValue.add(-1, "day"));
    }

    if (
      picker === "month" &&
      datePickerValue.add(-1, "month") >= dayjs(minDate)
    ) {
      setDatePickerValue(datePickerValue.add(-1, "month"));
    }

    if (
      picker === "year" &&
      datePickerValue.add(-1, "year") >= dayjs(minDate)
    ) {
      setDatePickerValue(datePickerValue.add(-1, "year"));
    }
  };

  const onNextClick = () => {
    if (picker === "date") {
      setDatePickerValue(datePickerValue.add(+1, "day"));
    }

    if (picker === "month") {
      setDatePickerValue(datePickerValue.add(+1, "month"));
    }

    if (picker === "year") {
      setDatePickerValue(datePickerValue.add(+1, "year"));
    }
  };

  const onMonthChaged = (e: any, dateString: string | string[]) => {
    setDatePickerValue(dayjs(dateString as dayjs.ConfigType));
  };

  const prevTitle = React.useMemo(() => {
    if (picker === "date") {
      return dayjs(datePickerValue).add(-1, "day").format("YYYY-MM-DD");
    }

    if (picker === "month") {
      return dayjs(datePickerValue).add(-1, "month").format("YYYY-MM");
    }

    if (picker === "year") {
      return dayjs(datePickerValue).add(-1, "year").format("YYYY");
    }
  }, [picker, datePickerValue]);

  const nextTitle = React.useMemo(() => {
    if (picker === "date") {
      return dayjs(datePickerValue).add(+1, "day").format("YYYY-MM-DD");
    }

    if (picker === "month") {
      return dayjs(datePickerValue).add(+1, "month").format("YYYY-MM");
    }

    if (picker === "year") {
      return dayjs(datePickerValue).add(+1, "year").format("YYYY");
    }
  }, [picker, datePickerValue]);

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: showButton ? "1px solid var(--default-border-color)" : "none",
        "& button, .ant-picker": {
          border: showButton ? "none" : "1px solid var(--default-border-color)",
        },
        "& button": {
          width: "30px",
          height: "30px",
          "&:hover": {
            borderColor: "inherit !important",
          },
          "&:first-of-type": {
            borderInlineEnd: "1px solid var(--default-border-color)",
            borderRadius: "5px 0px 0px 5px",
          },
          "&:last-of-type": {
            borderInlineStart: "1px solid var(--default-border-color)",
            borderRadius: "0px 5px 5px 0px",
          },
        },
        "& .ant-picker": {
          borderRadius: showButton ? 0 : "5px",
          "&:hover": {
            borderColor: showButton ? "none" : "#4096ff",
          },
        },
      })}
    >
      <Tooltip placement="bottom" title={prevTitle}>
        <Button
          icon={<LeftOutlined />}
          onClick={onPrevClick}
          css={css({
            display: monthPickerButtonHidden
              ? "none !important"
              : "block !important",
          })}
        />
      </Tooltip>
      <Tooltip placement="bottom" title="조회일자">
        <DatePicker
          picker={picker}
          value={datePickerValue}
          onChange={onMonthChaged}
          allowClear={false}
          inputReadOnly={true}
          minDate={dayjs(minDate)}
          css={css({
            minWidth: "120px !important",
            height: monthPickerButtonHidden ? "26px" : "100%",
          })}
          {...config}
        />
      </Tooltip>
      <Tooltip placement="bottom" title={nextTitle}>
        <Button
          icon={<RightOutlined />}
          onClick={onNextClick}
          css={css({
            display: monthPickerButtonHidden
              ? "none !important"
              : "block !important",
          })}
        />
      </Tooltip>
    </div>
  );
}

export default DevsDatePicker;
