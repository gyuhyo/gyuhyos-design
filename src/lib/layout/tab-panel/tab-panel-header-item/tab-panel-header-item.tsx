/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import { useMessage } from "../../../alert-message/context/message-context";
import { useMenuStore } from "../../stores/menu-store";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../../types/side-menu-item-props";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
function TabPanelHeaderItem({
  menu,
  active,
  hasClose,
  dragProvided,
  dragSnapshot,
}: {
  menu: SideMenuItemsProps | SideMenuItemsChildProps;
  active?: boolean;
  hasClose?: boolean;
  dragProvided: DraggableProvided;
  dragSnapshot: DraggableStateSnapshot;
}) {
  const { showMessage } = useMessage();
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const changeSelectedMenu = useMenuStore((state) => state.changeSelectedMenu);

  const onTabCloseClick = (e: any) => {
    e.stopPropagation();

    showMessage({
      title: "탭 닫기",
      message: "탭 페이지를 닫으시겠습니까?",
      okCaption: "닫기",
      onOkClick: () => closeMenu(menu),
    });
  };

  const onTabClick = () => {
    changeSelectedMenu(menu);
  };

  const isVisibilityCloseButton = React.useMemo(() => {
    if (typeof hasClose === "undefined") {
      return true;
    } else {
      return hasClose;
    }
  }, [hasClose]);

  return (
    <div
      onClick={onTabClick}
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      style={{
        ...dragProvided.draggableProps.style,
      }}
      css={css({
        whiteSpace: "nowrap",
        position: "relative",
        height: "100%",
        padding: isVisibilityCloseButton ? "0px 7px" : "0px 7px",
        borderInline: `1px solid rgba(var(--panel-border-color), ${
          active ? "0.9" : "0"
        })`,
        borderBottom: `1px solid rgba(var(--background-color), ${
          active ? "1" : "0"
        })`,
        background: "rgba(var(--background-color), 0.9)",
        alignContent: "center",
        zIndex: active ? 2 : "",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          borderTop: active ? "6px solid rgb(var(--panel-border-color))" : "",
          borderRight: active ? "1px solid rgb(var(--panel-border-color))" : "",
          borderLeft: active ? "1px solid rgb(var(--panel-border-color))" : "",
          transition: "border 200ms linear",
        },
        "&::after": {
          content: "''",
          visibility: active ? "hidden" : "visible",
          width: "1px",
          height: "60%",
          right: 0,
          left: "-2px",
          position: "absolute",
          background: "#d2d2d2",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:hover": {
          background: active ? "" : "var(--panel-hover-color)",
          transition: "background-color 200ms linear",
        },
      })}
    >
      <p
        {...dragProvided.dragHandleProps}
        css={css({
          width: "100%",
          textAlign: "left",
          cursor: "pointer !important",
        })}
      >
        {menu.title}
      </p>
      {(menu.hasClose === undefined || menu.hasClose === true) && (
        <p
          css={css({
            width: "22px",
            textAlign: "center",
            color: "#f40077",
            fontFamily: "cursive",
            WebkitTextStrokeWidth: "medium",
            cursor: "pointer !important",
            "&:hover": {
              background: "#fbdcdc",
              borderRadius: "7px",
              padding: "0px 3px",
            },
          })}
          onClick={onTabCloseClick}
        >
          &#x2715;
        </p>
      )}
    </div>
  );
}

export default React.memo(TabPanelHeaderItem);
