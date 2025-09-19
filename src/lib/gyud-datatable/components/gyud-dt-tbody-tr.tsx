import React from "react";
import { IDataSource } from "../types";
import { useGyudDt } from "../context";
import newStyled from "@emotion/styled";
import GyudDtTd from "./gyud-dt-td";
import { GyudDtRowNumberCell } from "./gyud-dt-before-cells";

const GyudDtTbodyTr = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: IDataSource;
}) => {
  const { getLastNodes, getMaxDepth, options } = useGyudDt((state) => state);
  const columns = getLastNodes();
  const maxDepth = getMaxDepth();
  return (
    <GyudDtTrWrapper
      key={index}
      className={`gyud-dt-row ${
        index % 2 === 0 ? "gyud-dt-even-row" : "gyud-dt-odd-row"
      }`}
      style={{
        ...style,
        width: "max-content",
      }}
    >
      {!options.isShowRowNumber && <GyudDtRowNumberCell index={index} />}
      {columns &&
        columns.map((column) => (
          <GyudDtTd
            key={column.field}
            column={column}
            data={data[column.field]}
          />
        ))}
    </GyudDtTrWrapper>
  );
};

export default React.memo(GyudDtTbodyTr);

const GyudDtTrWrapper = newStyled.tr({
  display: "table-row",
  "&.gyud-dt-odd-row > .gyud-dt-cell": {
    backgroundColor: "#e6e6e6",
  },
  "&.gyud-dt-even-row > .gyud-dt-cell": {
    backgroundColor: "#fff",
  },
  "&:hover > .gyud-dt-td": {
    backgroundColor: "#dff3ff",
  },
});
