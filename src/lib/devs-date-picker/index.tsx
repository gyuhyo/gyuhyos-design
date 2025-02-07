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
  showButton?: boolean | undefined;
}

function DevsDatePicker(props: DevsDatePickerProps) {
  const {
    selectedDate,
    setSelectedDate,
    picker = "month",
    showButton = true,
  } = props;
  const matches = useMediaQuery("(min-width: 1024px)");
  const [monthPickerButtonHidden, setMonthPickerButtonHidden] =
    React.useState(false);

  React.useEffect(() => {
    typeof window !== "undefined" && matches
      ? setMonthPickerButtonHidden(false)
      : setMonthPickerButtonHidden(true);
  }, [matches]);

  const onPrevClick = () => {
    if (picker === "date") {
      setSelectedDate(selectedDate.add(-1, "day"));
    }

    if (picker === "month") {
      setSelectedDate(selectedDate.add(-1, "month"));
    }

    if (picker === "year") {
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

  const onMonthChaged = (e: dayjs.Dayjs, dateString: string | string[]) => {
    if (typeof dateString !== "string") return;

    setSelectedDate(dayjs(dateString));
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
      {showButton && (
        <Tooltip placement="bottom" title={prevTitle}>
          <Button
            icon={<LeftOutlined />}
            onClick={onPrevClick}
            hidden={monthPickerButtonHidden}
          />
        </Tooltip>
      )}
      <Tooltip placement="bottom" title="조회일자">
        <DatePicker
          value={selectedDate}
          onChange={onMonthChaged}
          allowClear={false}
          inputReadOnly={true}
          {...props}
        />
      </Tooltip>
      {showButton && (
        <Tooltip placement="bottom" title={nextTitle}>
          <Button
            icon={<RightOutlined />}
            onClick={onNextClick}
            hidden={monthPickerButtonHidden}
          />
        </Tooltip>
      )}
    </div>
  );
}

export default React.memo(DevsDatePicker);
