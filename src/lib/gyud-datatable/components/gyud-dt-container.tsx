import newStyled from "@emotion/styled";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import GyudDtTbodyTr from "./gyud-dt-tbody-tr";
import GyudDtTable from "./gyud-dt-table";
import { IDataSource } from "../types";
import { useGyudDt } from "../context/gyud-dt-context";

const GyudDtContainer = () => {
  const { setScrollOffset } = useGyudDt((state) => state);
  const dataSource = useGyudDt((state) => state.dataSource);

  return (
    <GyudDtWrapper>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <FixedSizeList
            height={height}
            itemCount={dataSource?.length || 0}
            itemSize={30}
            width={width}
            innerElementType={GyudDtTable}
            className="gyud-scrolling-container"
            onScroll={({ scrollOffset }: { scrollOffset: number }) => {
              setScrollOffset(scrollOffset);
            }}
          >
            {({
              index,
              style,
            }: {
              index: number;
              style: React.CSSProperties;
            }) => (
              <GyudDtTbodyTr
                index={index}
                style={style}
                data={dataSource[index]}
              />
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    </GyudDtWrapper>
  );
};

export default GyudDtContainer;

const GyudDtWrapper = newStyled.div({
  overflow: "hidden",
  height: "100%",
  width: "100%",
  border: "1px solid #c6c6c6",
  "& .gyud-scrolling-container": {
    "&::-webkit-scrollbar": {
      position: "relative",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#5d5d5d",
      backgroundClip: "padding-box",
      border: "4px solid transparent",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 5px 5px 13px #00000030",
    },

    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
  },
});
