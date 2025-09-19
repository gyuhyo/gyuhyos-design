import newStyled from "@emotion/styled";
import React from "react";

const GyudDtTheadTr = ({ children }: { children: React.ReactNode }) => {
  return <GyudDtTrWrapper className="gyud-dt-row">{children}</GyudDtTrWrapper>;
};

export default React.memo(GyudDtTheadTr);

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
