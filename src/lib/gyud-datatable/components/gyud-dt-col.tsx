import React from "react";
import { IDataTableColumn } from "../types";
import newStyled from "@emotion/styled";

const GyudDtCol = ({ column }: { column: IDataTableColumn }) => {
  return (
    <GyudDtColWrapper
      key={column.field}
      data-field={column.field}
      style={{
        width:
          typeof column.width === "string"
            ? column.width
            : `${column.width || 100}px`,
      }}
    />
  );
};

export default GyudDtCol;

const GyudDtColWrapper = newStyled.col({
  display: "table-column",
});
