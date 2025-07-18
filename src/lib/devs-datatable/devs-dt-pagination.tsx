/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { useDt } from "./context/devs-dt-context";

const DevsDtPagination: React.FC<any> = () => {
  const { dataSource, options, currentPage, setCurrentPage } = useDt();
  const numberContainerRef = React.useRef<HTMLDivElement>(null);
  const buttonContainerRef = React.useRef<HTMLDivElement>(null);
  const dataLength: number =
    dataSource?.filter((x) => x.mode !== "c").length ?? 0;
  const totalPageCount = Math.ceil(
    dataLength / (options?.paginationLimit ?? 20)
  );

  React.useEffect(() => {
    if (!numberContainerRef.current) return;

    if (currentPage >= 5) {
      numberContainerRef.current.scrollTo({
        left: 27 * (currentPage - 5) + 27,
        behavior: "smooth",
      });
    } else {
      numberContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onPrevPageMoveClick = React.useCallback(() => {
    if (currentPage - 7 < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 7);
    }
  }, [currentPage]);

  const onNextPageMoveClick = React.useCallback(() => {
    if (currentPage + 7 > totalPageCount) {
      setCurrentPage(totalPageCount);
    } else {
      setCurrentPage(currentPage + 7);
    }
  }, [currentPage, totalPageCount]);

  const countPageLabel = React.useMemo(() => {
    if (options?.pagination) {
      return `총 <strong>${dataLength}</strong>건 (<strong>${totalPageCount}</strong>${" "}
        페이지)`;
    }

    return `총 <strong>${dataLength}</strong>건`;
  }, [dataLength, options?.pagination, totalPageCount]);

  React.useEffect(() => {
    if (!buttonContainerRef.current) return;
    buttonContainerRef.current.classList.add("pagination-container-bling");
  }, []);

  if (options?.showFooter === false) return null;

  return (
    <Pagination.Container>
      <Pagination.DataCountLabel
        dangerouslySetInnerHTML={{ __html: countPageLabel }}
      />
      {options?.pagination && (
        <Pagination.PageButtonContainer ref={buttonContainerRef}>
          <Pagination.PageButton
            data-disabled={currentPage <= 4}
            onClick={() => onChangePage(1)}
          >
            &lt;&lt;
          </Pagination.PageButton>
          <Pagination.PageButton
            data-disabled={currentPage <= 4}
            onClick={onPrevPageMoveClick}
          >
            &lt;
          </Pagination.PageButton>
          <Pagination.PageNumberContainer
            ref={numberContainerRef}
            className="smooth-scrolling"
          >
            {dataLength === 0 && (
              <Pagination.NumberButton data-is-current={true}>
                1
              </Pagination.NumberButton>
            )}
            {Array.from({ length: totalPageCount }, (n, i) => (
              <Pagination.NumberButton
                key={`page-${i + 1}`}
                data-is-current={i + 1 === currentPage}
                onClick={() => onChangePage(i + 1)}
              >
                {i + 1}
              </Pagination.NumberButton>
            ))}
          </Pagination.PageNumberContainer>
          <Pagination.PageButton
            data-disabled={currentPage >= totalPageCount - 3}
            onClick={onNextPageMoveClick}
          >
            &gt;
          </Pagination.PageButton>
          <Pagination.PageButton
            data-disabled={currentPage >= totalPageCount - 3}
            onClick={() => onChangePage(totalPageCount)}
          >
            &gt;&gt;
          </Pagination.PageButton>
        </Pagination.PageButtonContainer>
      )}
    </Pagination.Container>
  );
};

export default React.memo(DevsDtPagination);

const Pagination = {
  Container: styled.div({
    borderTop: "1px solid var(--border-color)",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 12px",
    "@media (max-width: 600px)": {
      height: "auto",
      justifyContent: "center",
    },
  }),
  DataCountLabel: styled.p(),
  PageButtonContainer: styled.div({
    display: "flex",
    flexDirection: "row",
  }),
  PageButton: styled.div({
    width: 30,
    height: 30,
    textAlign: "center",
    alignContent: "center",
    fontWeight: "bold",
    "&:last-of-type": {
      borderInlineEnd: "none",
    },
    "&[data-disabled='false']:hover": {
      background: "#dddddd",
      cursor: "pointer",
    },
    "&[data-disabled='false']:active": {
      background: "#c5c5c5",
    },
    "&[data-disabled='true']": {
      color: "#ddd",
      pointerEvents: "none",
    },
  }),
  PageNumberContainer: styled.div({
    maxWidth: "189px",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    columnGap: "7px",
    padding: "0px 3px",
    overflow: "hidden",
    position: "relative",
  }),
  NumberButton: styled.div({
    minWidth: 20,
    width: 20,
    height: 20,
    textAlign: "center",
    alignContent: "center",
    "&:not([data-is-current='true']):hover": {
      cursor: "pointer",
      border: "1px solid #c7c7c7",
      background: "#e5e5e5",
      color: "#000",
      borderRadius: "3px",
    },
    "&[data-is-current='true']": {
      border: "1px solid #4469d1",
      background: "#6b82c3",
      color: "#fff",
      borderRadius: "3px",
    },
  }),
};
