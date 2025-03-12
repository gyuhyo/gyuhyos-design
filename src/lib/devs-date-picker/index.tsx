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
}

function DevsDatePicker(props: DevsDatePickerProps) {
  const {
    selectedDate,
    setSelectedDate,
    picker = "month",
    minDate = "1990-01-01",
  } = props;
  const matches = useMediaQuery("(min-width: 600px)");
  const showButton = matches;
  const [monthPickerButtonHidden, setMonthPickerButtonHidden] =
    React.useState(false);

  React.useEffect(() => {
    typeof window !== "undefined" && matches
      ? setMonthPickerButtonHidden(false)
      : setMonthPickerButtonHidden(true);
  }, [matches]);

  const onPrevClick = () => {
    if (picker === "date" && selectedDate.add(-1, "day") >= dayjs(minDate)) {
      setSelectedDate(selectedDate.add(-1, "day"));
    }

    if (picker === "month" && selectedDate.add(-1, "month") >= dayjs(minDate)) {
      setSelectedDate(selectedDate.add(-1, "month"));
    }

    if (picker === "year" && selectedDate.add(-1, "year") >= dayjs(minDate)) {
      setSelectedDate(selectedDate.add(-1, "year"));
    }
  };

  const onNextClick = () => {
    if (picker === "date") {
      setSelectedDate(selectedDate.add(+1, "day"));
    }

    if (picker === "month") {
      setSelectedDate(selectedDate.add(+1, "month"));
    }

    if (picker === "year") {
      setSelectedDate(selectedDate.add(+1, "year"));
    }
  };

  const onMonthChaged = (e: any, dateString: string | string[]) => {
    setSelectedDate(dayjs(dateString as dayjs.ConfigType));
  };

  const prevTitle = React.useMemo(() => {
    if (picker === "date") {
      return dayjs(selectedDate).add(-1, "day").format("YYYY-MM-DD");
    }

    if (picker === "month") {
      return dayjs(selectedDate).add(-1, "month").format("YYYY-MM");
    }

    if (picker === "year") {
      return dayjs(selectedDate).add(-1, "year").format("YYYY");
    }
  }, [picker, selectedDate]);

  const nextTitle = React.useMemo(() => {
    if (picker === "date") {
      return dayjs(selectedDate).add(+1, "day").format("YYYY-MM-DD");
    }

    if (picker === "month") {
      return dayjs(selectedDate).add(+1, "month").format("YYYY-MM");
    }

    if (picker === "year") {
      return dayjs(selectedDate).add(+1, "year").format("YYYY");
    }
  }, [picker, selectedDate]);

  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        border: showButton ? "1px solid #cecece" : "none",
        "& button, .ant-picker": {
          border: showButton ? "none" : "1px solid #cecece",
        },
        "& button": {
          width: "30px",
          height: "30px",
          "&:hover": {
            borderColor: "inherit !important",
          },
          "&:first-of-type": {
            borderInlineEnd: "1px solid #cecece",
            borderRadius: "5px 0px 0px 5px",
          },
          "&:last-of-type": {
            borderInlineStart: "1px solid #cecece",
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
          value={selectedDate}
          onChange={onMonthChaged}
          allowClear={false}
          inputReadOnly={true}
          minDate={dayjs(minDate)}
          css={css({
            minWidth: "120px !important",
            height: monthPickerButtonHidden ? "26px" : "100%",
          })}
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
