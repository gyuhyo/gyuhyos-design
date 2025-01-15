/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

export type ContextMenuProps = {
  children: React.ReactNode;
  list?: {
    label: string;
    onClick: () => void;
  }[];
};

const ContextMenu = ({ children, list }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!list) return;

    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    // const menuWidth = 150; // 메뉴 예상 너비
    // const menuHeight = 100; // 메뉴 예상 높이

    // const adjustedX =
    //   x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : x;
    // const adjustedY =
    //   y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : y;

    setPosition({ x: x, y: y });
    setIsOpen(true);

    window.addEventListener("click", () => {
      setIsOpen(false);
    });

    return () => {
      window.removeEventListener("click", () => {
        setIsOpen(false);
      });
    };
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {list && isOpen && (
        <ul
          css={css({
            position: "fixed",
            top: position.y,
            left: position.x,
            zIndex: 99999,
            backgroundColor: "white",
            border: "1px solid #cccccc",
            borderRadius: "4px",
            padding: "7px",
            listStyle: "none",
            minWidth: "150px",
            boxShadow: "1px 1px 13px 0 rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          })}
        >
          {list.map((item) => (
            <li
              key={item.label}
              onClick={item.onClick}
              css={css({
                padding: "6px 7px",
                borderRadius: "4px",
                fontSize: "13px",
                "&:hover": {
                  backgroundColor: "#35ffbe",
                },
              })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContextMenu;
