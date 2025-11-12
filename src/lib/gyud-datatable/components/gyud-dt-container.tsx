import newStyled from "@emotion/styled";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import GyudDtTbodyTr from "./gyud-dt-tbody-tr";
import GyudDtTable from "./gyud-dt-table";
import { IDataSource } from "../types";
import { useGyudDt } from "../context/gyud-dt-context";
import { IDtStore } from "../store/create-dt-store";

const GyudDtContainer = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [onLoad, setOnLoad] = React.useState(false);
  const { setScrollOffset } = useGyudDt((state) => state);
  const dataSource = useGyudDt((state) => state.dataSource);
  const store = useGyudDt((state) => state);

  React.useImperativeHandle<
    any,
    {
      store: IDtStore;
    }
  >(
    ref,
    () => ({
      store: store,
    }),
    [store]
  );

  React.useEffect(() => {
    if (onLoad) return;
    setOnLoad(true);
  }, [onLoad]);

  const handleShowLastStickyColShadow = () => {
    const container = document.querySelector(".gyud-virtualized-container");
    if (container) {
      const findLastStickyCol = container.querySelectorAll(
        "th[data-is-last-sticky-col='true'], td[data-is-last-sticky-col='true']"
      );

      if (container.scrollLeft > 0) {
        if (findLastStickyCol) {
          findLastStickyCol.forEach((col) => {
            if (col.classList.contains("gyud-dt-sticky-col-last")) return;
            col.classList.add("gyud-dt-sticky-col-last");
          });
        }
      } else {
        if (findLastStickyCol) {
          findLastStickyCol.forEach((col) => {
            col.classList.remove("gyud-dt-sticky-col-last");
          });
        }
      }
    }
  };

  React.useEffect(() => {
    if (!onLoad) return;
    const container = document.querySelector(".gyud-virtualized-container");

    if (container) {
      container.addEventListener("scroll", handleShowLastStickyColShadow);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleShowLastStickyColShadow);
      }
    };
  }, [onLoad]);

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
            className="gyud-virtualized-container"
            onScroll={({ scrollOffset }: { scrollOffset: number }) => {
              console.log("scroll");
              console.log(scrollOffset);
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
                key={dataSource[index].rowId}
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
});

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
