import React from "react";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context/gyud-dt-context";

const GyudDtTBody = ({ children }: { children: React.ReactNode }) => {
  const { tbodyRef } = useGyudDt((state) => state);
  return <GyudDtTBodyWrapper ref={tbodyRef}>{children}</GyudDtTBodyWrapper>;
};

export default GyudDtTBody;

const GyudDtTBodyWrapper = newStyled.tbody({
  position: "relative",
  display: "table-row-group",
  height: "100%",
  width: "100%",
});
