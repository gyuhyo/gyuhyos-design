import { useGyudDt } from "../context/gyud-dt-context";
import { GyudDtThWrapper } from "./gyud-dt-th";

export const GyudDtRowNumberHeaderCell = () => {
  const { getMaxDepth } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();

  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell gyud-dt-sticky-col"
      style={
        {
          "--sticky-col-left": "0px",
          top: 0,
          zIndex: 2,
          borderBlockEndWidth: "2px",
        } as React.CSSProperties
      }
      rowSpan={maxDepth}
      colSpan={1}
    >
      No
    </GyudDtThWrapper>
  );
};

export const GyudDtRowNumberCell = ({ index }: { index: number }) => {
  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell gyud-dt-sticky-col gyud-dt-index-cell"
      style={
        {
          "--sticky-col-left": "0px",
          width: "55px",
          height: "30px",
          zIndex: 1,
        } as React.CSSProperties
      }
      rowSpan={1}
      colSpan={1}
    >
      {index + 1}
    </GyudDtThWrapper>
  );
};

export const GyudDtEmptyHeaderCell = () => {
  const { getMaxDepth } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();

  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell gyud-dt-sticky-col"
      style={{
        top: 0,
        borderBlockEndWidth: "2px",
      }}
      rowSpan={maxDepth}
      colSpan={1}
    />
  );
};

export const GyudDtRowCheckHeaderCell = () => {
  const { getMaxDepth, options } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();

  const left = options.isShowRowNumber ? "55px" : "0px";

  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell gyud-dt-sticky-col"
      style={
        {
          "--sticky-col-left": left,
          top: 0,
          zIndex: 2,
          borderBlockEndWidth: "2px",
        } as React.CSSProperties
      }
      rowSpan={maxDepth}
      colSpan={1}
    >
      <input type="checkbox" />
    </GyudDtThWrapper>
  );
};

export const GyudDtRowCheckCell = () => {
  const { getMaxDepth, options } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();

  const left = options.isShowRowNumber ? "55px" : "0px";

  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell gyud-dt-sticky-col"
      style={
        {
          "--sticky-col-left": left,
          top: 0,
          width: "25px",
          height: "30px",
          zIndex: 1,
          alignContent: "center",
        } as React.CSSProperties
      }
      colSpan={1}
    >
      <input type="checkbox" />
    </GyudDtThWrapper>
  );
};
