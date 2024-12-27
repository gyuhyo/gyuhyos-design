import React from "react";
import Button from "../../button";
import { IDataTableButtons, IDataTableOptions } from "../_types";
import { useDt } from "../context/devs-dt-context";

interface IDataTableButtonsProps {
  options?: IDataTableOptions | undefined;
  buttons?: IDataTableButtons | undefined;
  setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DevsDtButtons: React.FC<IDataTableButtonsProps> = (props) => {
  const { setDataSource, setFocusedRow, setFocusedCell } = useDt();
  const ButtonEventBeforeShowLoading = (event: any) => {
    props.setInnerLoading(true);

    const timer = setTimeout(() => {
      if (event !== undefined) {
        (event as Function)();
      }
      props.setInnerLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 5,
      }}
    >
      {props.buttons?.custom !== undefined && props.buttons.custom}
      {props.buttons?.onSearchClick !== undefined && (
        <Button
          border={true}
          compact
          style={{ padding: "2px 7px", lineHeight: "26px" }}
          onClick={() => {
            ButtonEventBeforeShowLoading(props.buttons?.onSearchClick);
            setDataSource((prev) =>
              prev.map((x) => ({ ...x, checked: false }))
            );
            setFocusedRow(null);
            setFocusedCell(null);
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
          <span>{props.buttons?.searchText ?? "조회"}</span>
        </Button>
      )}
      {props.buttons?.onAddClick !== undefined && (
        <Button
          border={true}
          compact
          style={{ padding: "2px 7px", lineHeight: "26px" }}
          onClick={props.buttons?.onAddClick}
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
          <span>{props.buttons?.addText ?? "추가"}</span>
        </Button>
      )}
      {props.buttons?.onSaveClick !== undefined && (
        <Button
          border={true}
          compact
          style={{ padding: "2px 7px", lineHeight: "26px" }}
          onClick={() => {
            ButtonEventBeforeShowLoading(props.buttons?.onSaveClick);
            setFocusedRow(null);
            setFocusedCell(null);
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
          <span>
            {props.buttons?.saveText ?? props.options?.enabledRowCheck === true
              ? "선택 저장"
              : "저장"}
          </span>
        </Button>
      )}
      {props.buttons?.onDeleteClick !== undefined && (
        <Button
          border={true}
          compact
          style={{ padding: "2px 7px", lineHeight: "26px" }}
          bgColor="#df4873"
          color="#fff"
          onClick={() => {
            ButtonEventBeforeShowLoading(props.buttons?.onDeleteClick);
            setFocusedRow(null);
            setFocusedCell(null);
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
          <span>{props.buttons?.deleteText ?? "선택 삭제"}</span>
        </Button>
      )}
      {props.buttons?.onCancelClick !== undefined && (
        <Button
          border={true}
          compact
          style={{ padding: "2px 7px", lineHeight: "26px" }}
          onClick={() => {
            ButtonEventBeforeShowLoading(props.buttons?.onCancelClick);
            setDataSource((prev) =>
              prev.map((x) => ({ ...x, checked: false }))
            );
            setFocusedRow(null);
            setFocusedCell(null);
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
          <span>{props.buttons?.cancelText ?? "취소"}</span>
        </Button>
      )}
      {props.buttons?.export?.visible === true && (
        <Button
          border={true}
          compact
          style={{
            padding: "2px 7px",
            lineHeight: "26px",
            position: "relative",
          }}
          onClick={props.buttons?.onExportClick}
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
          <span>{props.buttons?.export?.exportText ?? "Export"}</span>
        </Button>
      )}
    </div>
  );
};

export default DevsDtButtons;
