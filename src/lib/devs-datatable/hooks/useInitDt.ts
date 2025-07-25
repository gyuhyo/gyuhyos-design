import React from "react";
import useMounted from "./useMounted";
import { IDataTableColumn } from "../_types";

export const useInitDt = ({
  table,
  tbody,
  thead,
  columnsStyleForceUpdate,
}: {
  table: React.MutableRefObject<HTMLDivElement | null>;
  tbody: React.MutableRefObject<HTMLDivElement | null>;
  thead: React.MutableRefObject<HTMLDivElement | null>;
  columnsStyleForceUpdate: boolean;
}) => {
  const mounted = useMounted();
  const visibleStickyColShadow = () => {
    const lastStickyCols: NodeListOf<Element> = table.current!.querySelectorAll(
      ".devs-dt-sticky-col-last"
    );

    for (let el of lastStickyCols) {
      el.classList.add("devs-dt-sticky-col-last-visible");
    }
  };

  const hiddenStickyColShadow = () => {
    const lastStickyCols = table.current!.querySelectorAll(
      ".devs-dt-sticky-col-last"
    );

    for (let el of lastStickyCols) {
      el.classList.remove("devs-dt-sticky-col-last-visible");
    }
  };

  React.useEffect(() => {
    // body 스크롤 시 동시 head 스크롤 적용
    if (!tbody.current || !thead.current) return;

    const tableBodyScrolling = () => {
      thead.current!.scrollLeft = tbody.current!.scrollLeft;

      if (tbody.current!.scrollLeft > 0) {
        visibleStickyColShadow();
      } else {
        hiddenStickyColShadow();
      }

      if (tbody.current!.scrollTop > 0) {
        thead.current!.style.transition = "box-shadow 200ms ease-in-out";
        thead.current!.style.boxShadow = "0px 5px 12px #00000050";
        thead.current!.style.zIndex = "5";
      } else {
        thead.current!.style.transition = "box-shadow 200ms ease-in-out";
        thead.current!.style.boxShadow = "none";
        thead.current!.style.zIndex = "unset";
      }

      const tfoot = tbody.current?.querySelector(
        "table[data-table-type='devs-dt-tfoot']"
      );

      const scrollPosition =
        tbody.current!.scrollHeight -
        tbody.current!.clientHeight -
        tbody.current!.scrollTop;
      if (tfoot) {
        const tf = tfoot as HTMLTableElement;
        tf.style.transition = "box-shadow 200ms ease-in-out";

        const tfTds = tf.querySelectorAll("td");

        if (
          tbody.current!.scrollHeight !== tbody.current!.clientHeight &&
          scrollPosition > 1
        ) {
          tf.style.boxShadow = "0px -5px 12px #00000050";
          // for (const td of tfTds) {
          //   td.style.borderTop = "1px solid #c6c6c6";
          // }
        } else {
          tf.style.boxShadow = "none";
          // for (const td of tfTds) {
          //   td.style.borderTop = "none";
          // }
        }
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
    if (typeof window === "undefined") return true;
    if (window.screen.width <= 650) return true;

    const theadStickyCols: NodeListOf<HTMLDivElement> =
      thead.current.querySelectorAll(".devs-dt-row .devs-dt-sticky-col");

    let setLeft = 0;
    // head sticky col 설정
    for (let cell = 0; cell < theadStickyCols.length; cell++) {
      theadStickyCols[cell].style.left = `${setLeft}px`;
      setLeft += theadStickyCols[cell].getBoundingClientRect()?.width;
    }

    if (theadStickyCols.length > 0) {
      // last sticky col shadow 설정
      theadStickyCols[theadStickyCols.length - 1].classList.add(
        "devs-dt-sticky-col-last"
      );
    }

    const tbodyRows = tbody.current.querySelectorAll(".devs-dt-row");

    // body sticky col 설정
    for (let row of tbodyRows) {
      const stickyColsInRow: NodeListOf<HTMLDivElement> = row.querySelectorAll(
        ".devs-dt-sticky-col"
      );

      let setLeft = 0;
      for (let cell = 0; cell < stickyColsInRow.length; cell++) {
        stickyColsInRow[cell].style.left = `${setLeft}px`;
        if (stickyColsInRow[cell].dataset.hidden === "true") {
          setLeft += parseFloat(
            stickyColsInRow[cell].dataset.width?.toString() ?? "100"
          );
        } else {
          setLeft += stickyColsInRow[cell].getBoundingClientRect()?.width;
        }

        if (cell === stickyColsInRow.length - 1) {
          // last sticky col shadow 설정
          stickyColsInRow[cell].classList.add("devs-dt-sticky-col-last");
        }
      }
    }
  }

  return true;
};
