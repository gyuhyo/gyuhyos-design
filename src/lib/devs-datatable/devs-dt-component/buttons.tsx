import React from "react";
import Button from "../../button";
import { FaFileExport } from "react-icons/fa6";
import { MdAdd, MdCancel, MdDelete, MdSave, MdSearch } from "react-icons/md";
import { IDataTableButtons, IDataTableOptions } from "../_types";

interface IDataTableButtonsProps {
  options?: IDataTableOptions | undefined;
  buttons?: IDataTableButtons | undefined;
  setInnerLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DevsDtButtons: React.FC<IDataTableButtonsProps> = (props) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      // buttonRef와 popoverRef 외부 클릭 감지
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    if (visible && buttonRef.current && popoverRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const popover = popoverRef.current;

      let top = buttonRect.bottom + 10; // 버튼 아래
      let left = buttonRect.right - popover.offsetWidth; // 버튼 우측 끝 기준

      // 화면 경계 처리 (상하좌우)
      if (top + popover.offsetHeight > window.innerHeight) {
        top = buttonRect.top - popover.offsetHeight - 10; // Popover를 버튼 위로
      }
      if (left + popover.offsetWidth > window.innerWidth) {
        left = window.innerWidth - popover.offsetWidth - 10; // Popover를 화면 안으로
      }
      if (left < 0) {
        left = 10; // 최소 여백
      }

      setPosition({ top, left });

      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [visible]);

  if (props.buttons?.isVisible === false) {
    return null;
  }

  if (props.buttons?.custom !== undefined) {
    return props.buttons.custom;
  }

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
        columnGap: 3,
      }}
    >
      {(props.buttons!.isSearchVisible === undefined ||
        props.buttons!.isSearchVisible === true) && (
        <Button
          border={true}
          compact
          style={{ padding: "5px 7px" }}
          onClick={() =>
            ButtonEventBeforeShowLoading(props.buttons?.onSearchClick)
          }
        >
          <MdSearch /> 조회
        </Button>
      )}
      {(props.buttons!.isAddVisible === undefined ||
        props.buttons!.isAddVisible === true) && (
        <Button
          border={true}
          compact
          style={{ padding: "5px 7px" }}
          onClick={props.buttons?.onAddClick}
        >
          <MdAdd /> 추가
        </Button>
      )}
      {(props.buttons!.isSaveVisible === undefined ||
        props.buttons!.isSaveVisible === true) && (
        <Button
          border={true}
          compact
          style={{ padding: "5px 7px" }}
          onClick={props.buttons?.onSaveClick}
        >
          <MdSave />{" "}
          {props.options?.enabledRowCheck === true ? "선택 저장" : "저장"}
        </Button>
      )}
      {(props.buttons!.isDeleteVisible === undefined ||
        props.buttons!.isDeleteVisible === true) && (
        <Button
          border={true}
          compact
          style={{ padding: "5px 7px" }}
          bgColor="#df4873"
          color="#fff"
          onClick={props.buttons?.onDeleteClick}
        >
          <MdDelete /> 선택 삭제
        </Button>
      )}
      {(props.buttons!.isCancelVisible === undefined ||
        props.buttons!.isCancelVisible === true) && (
        <Button
          border={true}
          compact
          style={{ padding: "5px 7px" }}
          onClick={props.buttons?.onCancelClick}
        >
          <MdCancel /> 취소
        </Button>
      )}
      {props.buttons!.export?.visible === true && (
        <Button
          btnref={buttonRef}
          border={true}
          compact
          style={{ padding: "5px 7px", position: "relative" }}
          onClick={() => setVisible((prev) => !prev)}
        >
          <FaFileExport /> Export
          {visible && (
            <div
              ref={popoverRef}
              style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                padding: "10px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 100,
              }}
            >
              <Button
                border={true}
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                }}
              >
                Excel
              </Button>
              <Button
                border={true}
                style={{ width: "100%", marginTop: 7 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                }}
              >
                Print
              </Button>
            </div>
          )}
        </Button>
      )}
    </div>
  );
};

export default DevsDtButtons;
