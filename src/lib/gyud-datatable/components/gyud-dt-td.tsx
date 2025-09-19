import React from "react";
import newStyled from "@emotion/styled";
import { IDataTableColumn } from "../types";

const GyudDtTd = ({
  column,
  data,
}: {
  column: IDataTableColumn;
  data: any;
}) => {
  return (
    <GyudDtTdWrapper
      key={column.field}
      className="gyud-dt-td gyud-dt-cell"
      data-field={column.field}
      style={{
        position: column.sticky ? "sticky" : "static",
        left: column.sticky ? 0 : "auto",
        width: `${column.width || 100}px`,
      }}
    >
      {data}
    </GyudDtTdWrapper>
  );
};

export default GyudDtTd;

const GyudDtTdWrapper = newStyled.td({
  display: "table-cell",
  padding: "0px 3px",
  alignContent: "center",
});
