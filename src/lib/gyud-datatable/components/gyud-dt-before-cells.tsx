import { useGyudDt } from "../context/gyud-dt-context";
import { GyudDtThWrapper } from "./gyud-dt-th";

export const GyudDtRowNumberHeaderCell = () => {
  const { getMaxDepth } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();

  return (
    <GyudDtThWrapper
      className="gyud-dt-th gyud-dt-cell"
      style={{
        position: "sticky",
        left: 0,
        top: 0,
        zIndex: 2,
        borderBlockEndWidth: "2px",
      }}
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
      className="gyud-dt-th gyud-dt-cell"
      style={{
        position: "sticky",
        left: 0,
        width: "55px",
        height: "30px",
        zIndex: 1,
      }}
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
      className="gyud-dt-th gyud-dt-cell"
      style={{
        position: "sticky",
        top: 0,
        borderBlockEndWidth: "2px",
      }}
      rowSpan={maxDepth}
      colSpan={1}
    />
  );
};
