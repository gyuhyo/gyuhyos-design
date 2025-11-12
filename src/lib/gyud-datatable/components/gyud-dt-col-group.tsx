import newStyled from "@emotion/styled";
import React from "react";
import { useGyudDt } from "../context";
import GyudDtCol from "./gyud-dt-col";

const GyudDtColGroup = () => {
  const { getLastNodes, options } = useGyudDt((state) => state);
  const columns = getLastNodes();
  return (
    <GyudDtColGroupWrapper>
      {options.isShowRowNumber && (
        <GyudDtCol
          column={{ field: "rowNumber", title: "Row Number", width: 55 }}
        />
      )}
      {options.isRowCheckable && (
        <GyudDtCol
          column={{ field: "rowCheck", title: "Row Check", width: 25 }}
        />
      )}
      {columns.map((column) => (
        <GyudDtCol key={column.field} column={column} />
      ))}
      <GyudDtCol column={{ field: "empty-cell", title: "", width: "100%" }} />
    </GyudDtColGroupWrapper>
  );
};

export default GyudDtColGroup;

const GyudDtColGroupWrapper = newStyled.colgroup({
  display: "table-column-group",
});
