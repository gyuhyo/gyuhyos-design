import React from "react";
import newStyled from "@emotion/styled";
import { useGyudDt } from "../context";
import GyudDtTheadTr from "./gyud-dt-thead-tr";
import GyudDtTh from "./gyud-dt-th";
import { IDataTableColumn } from "../types";
import {
  GyudDtEmptyHeaderCell,
  GyudDtRowCheckHeaderCell,
  GyudDtRowNumberHeaderCell,
} from "./gyud-dt-before-cells";

const GyudTheadTrInner = React.memo(
  ({ children, depth }: { children: React.ReactNode; depth: number }) => {
    const { options } = useGyudDt((state) => state);

    return (
      <GyudDtTheadTr key={depth}>
        {depth === 1 && options.isShowRowNumber && (
          <GyudDtRowNumberHeaderCell />
        )}
        {depth === 1 && options.isRowCheckable && <GyudDtRowCheckHeaderCell />}
        {children}
        {depth === 1 && <GyudDtEmptyHeaderCell />}
      </GyudDtTheadTr>
    );
  }
);

const GyudDtThead = () => {
  const {
    getMaxDepth,
    getFlatColumns,
    getLastNodes,
    scrollOffset,
    setTheadRef,
  } = useGyudDt((state) => state);
  const maxDepth = getMaxDepth();
  const columns = getFlatColumns();
  const lastNodes = getLastNodes();

  const genRows = React.useCallback(
    (columns: IDataTableColumn[]): JSX.Element[] => {
      return Array.from({ length: maxDepth }, (_, depth) => depth + 1).map(
        (depth) => (
          <GyudTheadTrInner depth={depth} key={depth}>
            {columns &&
              columns
                .filter((column) => column.depth === depth)
                .map((column) => (
                  <GyudDtTh
                    key={column.field}
                    column={column}
                    rowSpan={column.rowSpan || 1}
                    colSpan={column.colSpan || 1}
                    isLastNode={lastNodes.includes(column)}
                  />
                ))}
          </GyudTheadTrInner>
        )
      );
    },
    [columns, maxDepth]
  );

  return (
    <GyudDtTHead
      className="gyud-dt-thead"
      scrollOffset={scrollOffset}
      ref={(ref) => setTheadRef(ref)}
    >
      {genRows(columns).map((row) => row)}
    </GyudDtTHead>
  );
};

export default GyudDtThead;

const GyudDtTHead = newStyled.thead(
  ({ scrollOffset }: { scrollOffset: number }) =>
    ({
      display: "table-header-group",
      position: "sticky",
      top: 0,
      boxShadow: scrollOffset > 0 ? "0px 5px 12px #00000050" : "none",
      zIndex: 2,
      transition: "box-shadow 200ms ease-in-out",
    } as any)
);
