import newStyled from "@emotion/styled";
import React from "react";
import GyudDtColGroup from "./gyud-dt-col-group";
import GyudDtTBody from "./gyud-dt-tbody";
import GyudDtThead from "./gyud-dt-thead";
import { useGyudDt } from "../context/gyud-dt-context";
import EmptySvg from "../../devs-datatable/assets/empty.svg";

const GyudDtTableEmptyWrapper = () => {
  return (
    <tr>
      <td colSpan={100} style={{ height: "100%" }}>
        <EmptySvg />
      </td>
    </tr>
  );
};

const GyudDtTable = ({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) => {
  const { setTableRef } = useGyudDt((state) => state);

  const isEmpty =
    !children || (Array.isArray(children) && children.length === 0);
  return (
    <GyudDtTableWrapper
      style={{
        ...style,
        width: "none",
        height: isEmpty ? "100%" : style.height,
      }}
      {...rest}
      ref={(ref) => setTableRef(ref)}
    >
      <GyudDtColGroup />
      <GyudDtThead />
      <GyudDtTBody>
        {isEmpty ? <GyudDtTableEmptyWrapper /> : children}
      </GyudDtTBody>
    </GyudDtTableWrapper>
  );
};

export default GyudDtTable;

const GyudDtTableWrapper = newStyled.table({
  display: "table",
  width: "fit-content",
  borderCollapse: "separate",
  borderSpacing: 0,
  tableLayout: "fixed",
  height: "100%",
  "& .gyud-dt-td": {
    height: "inherit",
    padding: "0px 3px",
  },
  "& .gyud-dt-cell": {
    borderInlineEnd: "1px solid #c6c6c6",
    borderBlockEnd: "1px solid #c6c6c6",
  },
  "& .gyud-dt-th[data-is-last-node='true']": {
    borderBlockEndWidth: "2px",
  },
});
