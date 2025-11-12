/** @jsxImportSource @emotion/react */
import React, { SetStateAction } from "react";
import {
  IDataTableButtons,
  IDataTableOptions,
  IDataTableProps,
} from "./_types";
import { css } from "@emotion/react";
import DevsDtButtons from "./devs-dt-component/buttons";
import Button from "../button";

interface DevsDtHeaderProps
  extends Pick<IDataTableProps, "title" | "buttons" | "options"> {
  title: string;
  description?: any;
  buttons?: IDataTableButtons;
  options?: IDataTableOptions;
  setInnerLoading: React.Dispatch<SetStateAction<boolean>>;
}

const DevsDtHeader: React.FC<DevsDtHeaderProps> = (props) => {
  const [isDetailSearchFormOpen, setIsDetailSearchFormOpen] =
    React.useState<boolean>(false);

  return (
    <React.Fragment>
      {(props.title !== undefined ||
        (typeof props.title === "string" && props.title !== "") ||
        props.buttons?.onAddClick !== undefined ||
        props.buttons?.onSearchClick !== undefined ||
        props.buttons?.onSaveClick !== undefined ||
        props.buttons?.onCancelClick !== undefined ||
        props.buttons?.onDeleteClick !== undefined ||
        props.buttons?.custom !== undefined) && (
        <div
          style={{
            position: "relative",
            flex: "none",
            minHeight: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
            flexWrap: "wrap",
            gap: "7px",
            background: "var(--dt-header-color)",
            border: "1px solid var(--border-color)",
            padding: "0.5rem 0.75rem",
          }}
        >
          {props.title !== undefined && (
            <div
              css={css({
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                columnGap: 7,
                textWrap: "nowrap",
              })}
            >
              {typeof props.title === "string" && props.title !== "" ? (
                <p style={{ fontSize: 18, fontWeight: "bold" }}>
                  &#x27a4; {props.title}
                </p>
              ) : (
                props.title
              )}
              {props.description && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#7a7a7a",
                    marginLeft:
                      props.title !== undefined && props.title !== ""
                        ? "7px"
                        : "0px",
                  }}
                >
                  {props.description}
                </div>
              )}
              {(props.options?.readonly === undefined ||
                props.options.readonly === false) &&
                !props.description && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#7a7a7a",
                      marginLeft:
                        props.title !== undefined && props.title !== ""
                          ? "7px"
                          : "0px",
                    }}
                  >
                    (<span style={{ color: "var(--text-color)" }}>*</span>) 입력
                    가능 (<span style={{ color: "red" }}>*</span>) 필수입력
                  </span>
                )}
            </div>
          )}
          <DevsDtButtons
            buttons={props.buttons}
            options={props.options}
            setInnerLoading={props.setInnerLoading}
            isDetailSearchFormOpen={isDetailSearchFormOpen}
            setIsDetailSearchFormOpen={setIsDetailSearchFormOpen}
          />
          <DetailSearchForm
            isDetailSearchFormOpen={isDetailSearchFormOpen}
            setIsDetailSearchFormOpen={setIsDetailSearchFormOpen}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(DevsDtHeader);

const DetailSearchForm = ({
  isDetailSearchFormOpen,
  setIsDetailSearchFormOpen,
}: {
  isDetailSearchFormOpen: boolean;
  setIsDetailSearchFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const [searchSize, setSearchSize] = React.useState(0);

  let timer: NodeJS.Timeout;
  React.useEffect(() => {
    if (!formRef.current) return;

    if (isDetailSearchFormOpen) {
      formRef.current.style.visibility = "visible";
    } else {
      timer = setTimeout(() => {
        formRef.current!.style.visibility = "hidden";
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [isDetailSearchFormOpen]);

  return (
    <div
      ref={React.useCallback((node: HTMLDivElement) => {
        if (!node) return;
        formRef.current = node;
        setSearchSize(node.getBoundingClientRect().height);
      }, [])}
      css={css({
        position: "absolute",
        right: 7,
        bottom: isDetailSearchFormOpen
          ? searchSize * -1 - 15
          : searchSize * -1 + 20,
        width: "auto",
        height: "auto",
        overflow: "hidden",
        background: "#fff",
        zIndex: 4,
        transition: "opacity 300ms ease-in-out, bottom 300ms ease-out",
        border: "1px solid #c6c6c6",
        boxShadow: "3px 3px 12px #00000050",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        rowGap: 14,
      })}
      style={{
        opacity: isDetailSearchFormOpen ? 1 : 0,
      }}
    >
      <div
        css={css({
          position: "relative",
          flex: "none",
          minHeight: "50px",
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "7px",
          background:
            "linear-gradient(rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
          border: "1px solid rgb(199, 199, 199)",
          padding: "0.5rem 0.75rem",
        })}
      >
        <h3 style={{ margin: 0 }}>상세 검색 조건 설정</h3>
        <Button
          border={true}
          bgColor="#df4873"
          borderColor="#f15151"
          color="#fff"
          css={css({
            fontWeight: "bold",
            width: 25,
            height: 25,
            padding: 0,
          })}
          onClick={() => setIsDetailSearchFormOpen(false)}
        >
          ✕
        </Button>
      </div>
      <div>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
        <p>123asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda</p>
      </div>
    </div>
  );
};
