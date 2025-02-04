/** @jsxImportSource @emotion/react */
import React, { SetStateAction } from "react";
import {
  IDataTableButtons,
  IDataTableOptions,
  IDataTableProps,
} from "./_types";
import { css } from "@emotion/react";
import DevsDtButtons from "./devs-dt-component/buttons";

interface DevsDtHeaderProps
  extends Pick<IDataTableProps, "title" | "buttons" | "options"> {
  title: string;
  buttons?: IDataTableButtons;
  options?: IDataTableOptions;
  setInnerLoading: React.Dispatch<SetStateAction<boolean>>;
}

const DevsDtHeader: React.FC<DevsDtHeaderProps> = (props) => {
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
            flex: "none",
            minHeight: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
            flexWrap: "wrap",
            gap: "7px",
            background:
              "linear-gradient(180deg, rgb(231, 231, 231), rgb(215, 215, 215), rgb(231, 231, 231))",
            border: "1px solid rgb(199, 199, 199)",

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
              })}
            >
              {typeof props.title === "string" && props.title !== "" ? (
                <p style={{ fontSize: 18, fontWeight: "bold" }}>
                  &#x27a4; {props.title}
                </p>
              ) : (
                props.title
              )}
              {(props.options?.readonly === undefined ||
                props.options.readonly === false) && (
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
                  (<span style={{ color: "#000" }}>*</span>) 입력 가능 (
                  <span style={{ color: "red" }}>*</span>) 필수입력
                </span>
              )}
            </div>
          )}
          <DevsDtButtons
            buttons={props.buttons}
            options={props.options}
            setInnerLoading={props.setInnerLoading}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(DevsDtHeader);
