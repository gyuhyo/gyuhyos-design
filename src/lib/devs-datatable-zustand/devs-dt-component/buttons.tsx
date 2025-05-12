/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Button from "../../button";
import {
  IDataTableButtons,
  IDataTableColumn,
  IDataTableOptions,
} from "../_types";
import { useDt } from "../context/devs-dt-context";
import { Select } from "antd";
import { useMessage } from "../../alert-message/context/message-context";
import { useResizeObserver } from "../hooks/useResizeObserver";
import messages from "../../utils/messages";

interface IDataTableButtonsProps {
  options?: IDataTableOptions | undefined;
  buttons?: IDataTableButtons | undefined;
  setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDetailSearchFormOpen: boolean;
  setIsDetailSearchFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type TButtonLabel = {
  width: number;
};
const ButtonLabel = styled.span<TButtonLabel>((props) => ({
  display: props.width <= 650 ? "none" : "block",
}));

const DevsDtButtons: React.FC<IDataTableButtonsProps> = (props) => {
  const { showMessage } = useMessage();
  const {
    setDataSource,
    setFocusedRow,
    setFocusedCell,
    sliderFormOpen,
    setFocusedRowForm,
    setSliderFormOpen,
    setEditMode,
    originalColumns,
    setColumns,
    editCount,
    focusedCellChanged,
    focusedRowChanged,
    options,
    tbody,
  } = useDt();
  const { width, height } = useResizeObserver(tbody);

  const getLastNodes = (columns: IDataTableColumn[]): IDataTableColumn[] => {
    let lastNodes: IDataTableColumn[] = [];

    const findLastNodes = (column: IDataTableColumn) => {
      if (column.children && column.children.length > 0) {
        column.children.forEach(findLastNodes);
      } else {
        lastNodes.push(column);
      }
    };

    columns.forEach(findLastNodes);
    return lastNodes;
  };

  const lastNode = React.useMemo(
    () => getLastNodes(originalColumns),
    [originalColumns]
  );

  const updateColumnWidth = (
    columns: IDataTableColumn[],
    targetField: string,
    newWidth: number
  ): IDataTableColumn[] => {
    return columns.map((column) => {
      // 컬럼이 자식 컬럼을 가지는 경우
      if (column.children) {
        return {
          ...column,
          children: updateColumnWidth(column.children, targetField, newWidth),
        };
      }

      // field가 일치하는 컬럼을 찾아서 width 업데이트
      if (column.field === targetField) {
        return { ...column, width: newWidth };
      }

      return column;
    });
  };

  const ButtonEventBeforeShowLoading = (event: any) => {
    props.setInnerLoading(true);
    const timer = setTimeout(() => {
      if (event !== undefined) {
        (event as Function)();
      }
      for (const col of lastNode) {
        setColumns((prev) =>
          updateColumnWidth(prev, col.field, col.width ?? 100)
        );
      }

      props.setInnerLoading(false);
      setFocusedRow(null);
      setFocusedCell(null);
      setFocusedRowForm(null);
      focusedRowChanged?.(null);
      focusedCellChanged?.({ row: null, field: null });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  };

  const sleep = () => new Promise((resolve) => setTimeout(resolve, 200));

  return (
    <React.Fragment>
      {(props.buttons?.onAddClick !== undefined ||
        props.buttons?.onSearchClick !== undefined ||
        props.buttons?.onSaveClick !== undefined ||
        props.buttons?.onCancelClick !== undefined ||
        props.buttons?.onDeleteClick !== undefined ||
        props.buttons?.custom !== undefined) && (
        <div
          className="devs-dt-button-container"
          css={css({
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            columnGap: 5,
            width: "100%",
            "& > button": {
              fontSize: "18px !important",
              padding: "3px 11px !important",
              lineHeight: "26px !important",
            },
            "@media (min-width: 650px)":
              props.buttons?.isDisabledMobileStyle === true
                ? {}
                : {
                    width: "auto",
                    "& > button": {
                      fontSize: "1.0rem !important",
                      padding: "2px 7px !important",
                    },
                  },
          })}
        >
          {props.buttons?.custom !== undefined && props.buttons.custom}
          {props.options?.showEditModeSelector && (
            <div
              css={css({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
              })}
            >
              <p
                css={css({
                  padding: "0px 11px",
                  height: "100%",
                  borderRight: "1px solid #d9d9d9",
                })}
              >
                수정 모드
              </p>
              <div
                css={css({
                  "& .ant-select": { width: "100px" },
                  "& .ant-select > .ant-select-selector": { border: "none" },
                })}
              >
                <Select
                  defaultValue={"grid"}
                  onChange={(v: "grid" | "slider") => setEditMode(v)}
                >
                  <Select.Option value="grid">그리드</Select.Option>
                  <Select.Option value="slider">슬라이더</Select.Option>
                </Select>
              </div>
            </div>
          )}
          <Button
            border={true}
            compact
            onClick={() => props.setIsDetailSearchFormOpen((prev) => !prev)}
            style={{ display: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 113.65"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              height="1em"
              width="1em"
            >
              <path
                css={css({ fillRule: "evenodd" })}
                d="M56.26,0a50.59,50.59,0,0,1,50.46,63.44A49.92,49.92,0,0,1,102,75.25L122.19,96a2.43,2.43,0,0,1,0,3.42L108.2,113a2.42,2.42,0,0,1-3.42,0l-19.35-20A50.34,50.34,0,0,1,61.24,101a11.54,11.54,0,0,0,1.35-9.55,11.19,11.19,0,0,0,2.23-1.15,40.34,40.34,0,1,0-46.51-47.9A11.36,11.36,0,0,0,7.76,43.61a49.69,49.69,0,0,1,2.77-10.92A50.45,50.45,0,0,1,56.26,0Zm-5,53.3,4.27,4.5a3,3,0,0,1-.1,4.2l-3.63,3.44a23.38,23.38,0,0,1,2,5.91l4.58.11a3,3,0,0,1,2.9,3.05l-.16,6.21a3,3,0,0,1-3,2.89l-5-.13a23.42,23.42,0,0,1-2.74,5.62l3.16,3.32a3,3,0,0,1-.11,4.2l-4.5,4.28a3,3,0,0,1-4.2-.11L41.25,97.2a23.38,23.38,0,0,1-5.91,2l-.11,4.58a3,3,0,0,1-3,2.9L26,106.56a3,3,0,0,1-2.89-3l.13-5a24,24,0,0,1-5.62-2.74l-3.32,3.16a3,3,0,0,1-4.2-.11l-4.28-4.5a3,3,0,0,1,.11-4.2l3.62-3.44a23.81,23.81,0,0,1-2-5.91L2.9,80.66a3,3,0,0,1-2.9-3l.16-6.21a3,3,0,0,1,3.05-2.89l5,.12A23.35,23.35,0,0,1,10.94,63L7.78,59.7a3,3,0,0,1,.11-4.2l4.5-4.27a3,3,0,0,1,4.2.1L20,55a23.51,23.51,0,0,1,5.91-2.05l.12-4.57a3,3,0,0,1,3-2.9l6.21.16a3,3,0,0,1,2.89,3l-.12,5a23.53,23.53,0,0,1,5.61,2.74L47,53.22a3,3,0,0,1,4.21.11ZM31,63.88A12.2,12.2,0,1,1,18.44,75.77,12.2,12.2,0,0,1,31,63.88Z"
              />
            </svg>
            <ButtonLabel width={width}>
              {props.buttons?.searchText ?? "상세 검색 조건"}
            </ButtonLabel>
          </Button>
          {props.buttons?.onSearchClick !== undefined && (
            <Button
              border={true}
              compact
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                ButtonEventBeforeShowLoading(props.buttons?.onSearchClick);
                setDataSource((prev) =>
                  prev.map((x) => ({ ...x, checked: false }))
                );
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.searchText ?? "조회"}
              </ButtonLabel>
            </Button>
          )}
          {props.buttons?.onAddClick !== undefined && (
            <Button
              border={true}
              compact
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                if (props.options?.multipleEdit === false) {
                  if (editCount > 0) {
                    await showMessage({
                      title: "경고",
                      type: "warnning",
                      message:
                        "다른 데이터를 수정할 경우\n기존 데이터 수정이 중단되며 복구할 수 없습니다.\n\n현재 데이터 수정을 중단 하시겠습니까?",
                      onOkClick: () => {
                        setDataSource((prev) =>
                          prev
                            .filter((f) => f.mode !== "c")
                            .map((p) => ({ ...p, checked: false, mode: "r" }))
                        );
                        (props.buttons?.onAddClick as Function)();
                      },
                      onCancelClick: () => {},
                    });

                    return;
                  }
                }

                (props.buttons?.onAddClick as Function)();
                setFocusedRow(null);
                setFocusedCell(null);
                setFocusedRowForm(null);
                focusedRowChanged?.(null);
                focusedCellChanged?.({ row: null, field: null });
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.addText ?? "추가"}
              </ButtonLabel>
            </Button>
          )}
          {props.buttons?.onSaveClick !== undefined && (
            <Button
              border={true}
              compact
              bgColor="#22cb5f"
              color="#ffffff"
              borderColor="#03cf00"
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                ButtonEventBeforeShowLoading(props.buttons?.onSaveClick);
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.saveText ??
                props.options?.enabledRowCheck === true
                  ? "선택 저장"
                  : "저장"}
              </ButtonLabel>
            </Button>
          )}
          {props.buttons?.onDeleteClick !== undefined && (
            <Button
              border={true}
              compact
              bgColor="#df4873"
              borderColor="#f15151"
              color="#fff"
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                await showMessage({
                  type: "warnning",
                  title: messages.delete.confirm.title,
                  message: messages.delete.confirm.body,
                  onOkClick: () => {
                    ButtonEventBeforeShowLoading(props.buttons?.onDeleteClick);
                  },
                });
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.deleteText ?? "선택 삭제"}
              </ButtonLabel>
            </Button>
          )}
          {props.buttons?.onCancelClick !== undefined && (
            <Button
              border={true}
              compact
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                ButtonEventBeforeShowLoading(props.buttons?.onCancelClick);
                setDataSource((prev) =>
                  prev.map((x) => ({ ...x, checked: false }))
                );
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.cancelText ?? "취소"}
              </ButtonLabel>
            </Button>
          )}
          {props.buttons?.export?.visible === true && (
            <Button
              border={true}
              compact
              onClick={async () => {
                if (sliderFormOpen) {
                  setFocusedRowForm(null);
                  setSliderFormOpen(false);
                  await sleep();
                }
                (props.buttons?.onExportClick as Function)();
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"></path>
              </svg>
              <ButtonLabel width={width}>
                {props.buttons?.export?.exportText ?? "Export"}
              </ButtonLabel>
            </Button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default DevsDtButtons;
