import React from "react";
import useMounted from "./useMounted";

export const useInitDt = ({
  tbody,
  thead,
}: {
  tbody: React.RefObject<HTMLDivElement>;
  thead: React.RefObject<HTMLDivElement>;
}) => {
  const mounted = useMounted();
  const visibleStickyColShadow = () => {
    const lastStickyCols: NodeListOf<Element> = document.querySelectorAll(
      ".devs-dt-sticky-col-last"
    );

    for (let el of lastStickyCols) {
      el.classList.add("devs-dt-sticky-col-last-visible");
    }
  };

  const hiddenStickyColShadow = () => {
    const lastStickyCols = document.querySelectorAll(
      ".devs-dt-sticky-col-last"
    );

    for (let el of lastStickyCols) {
      el.classList.remove("devs-dt-sticky-col-last-visible");
    }
  };

  const hiddenLastColumnBorder = () => {
    const lastColumn = document.querySelectorAll(
      ".devs-dt-thead .devs-dt-th:nth-last-child(3), .devs-dt-tbody .devs-dt-row > .devs-dt-cell:last-child"
    );

    for (let el of lastColumn) {
      el.classList.add("devs-dt-hidden-border");
    }
  };

  const visibleLastColumnBorder = () => {
    const lastColumn = document.querySelectorAll(
      ".devs-dt-thead .devs-dt-th:nth-last-child(3), .devs-dt-tbody .devs-dt-row > .devs-dt-cell:last-child"
    );

    for (let el of lastColumn) {
      el.classList.remove("devs-dt-hidden-border");
    }
  };

  React.useEffect(() => {
    // body 스크롤 시 동시 head 스크롤 적용
    if (!tbody.current || !thead.current) return;

    const tableBodyScrolling = () => {
      thead.current!.scrollLeft = tbody.current!.scrollLeft;

      if (
        tbody.current!.scrollWidth !== tbody.current!.clientWidth &&
        tbody.current!.scrollWidth -
          tbody.current!.clientWidth -
          tbody.current!.scrollLeft ===
          0
      ) {
        hiddenLastColumnBorder();
      } else {
        visibleLastColumnBorder();
      }

      if (tbody.current!.scrollLeft > 0) {
        visibleStickyColShadow();
      } else {
        hiddenStickyColShadow();
      }
    };

    tbody.current.addEventListener("scroll", tableBodyScrolling);

    return () => {
      if (tbody.current) {
        tbody.current.removeEventListener("scroll", tableBodyScrolling);
      }
    };
  }, [mounted]);

  if (mounted && tbody.current && thead.current) {
    const theadStickyCols: NodeListOf<HTMLDivElement> =
      thead.current.querySelectorAll(".devs-dt-row .devs-dt-sticky-col");

    let setLeft = 0;
    // head sticky col 설정
    for (let cell = 0; cell < theadStickyCols.length; cell++) {
      theadStickyCols[cell].style.left = `${setLeft}px`;
      setLeft += theadStickyCols[cell].getBoundingClientRect()?.width;
    }

    // last sticky col shadow 설정
    theadStickyCols[theadStickyCols.length - 1].classList.add(
      "devs-dt-sticky-col-last"
    );

    const tbodyRows = tbody.current.querySelectorAll(".devs-dt-row");

    // body sticky col 설정
    for (let row of tbodyRows) {
      const stickyColsInRow: NodeListOf<HTMLDivElement> = row.querySelectorAll(
        ".devs-dt-sticky-col"
      );

      let setLeft = 0;
      for (let cell = 0; cell < stickyColsInRow.length; cell++) {
        stickyColsInRow[cell].style.left = `${setLeft}px`;
        setLeft += stickyColsInRow[cell].getBoundingClientRect()?.width;

        if (cell === stickyColsInRow.length - 1) {
          // last sticky col shadow 설정
          stickyColsInRow[cell].classList.add("devs-dt-sticky-col-last");
        }
      }
    }
  }

  return true;
};
