/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import SideMenuItem from "./side-menu-item";
import { useMenuStore } from "../../stores/menu-store";

interface SideMenuGroupsProps {
  key: string;
  title: string;
  iconType?: "solid" | "regular" | "light" | "thin";
  iconName?: string;
  children?: SideMenuGroupsProps[];
}

interface SideMenuItemGroupProps {
  group: SideMenuGroupsProps;
  isShow: boolean;
}

function SideMenuItemGroup({ group, isShow }: SideMenuItemGroupProps) {
  const [groupOpened, setGroupOpened] = React.useState(false);
  const openMenu = useMenuStore((state) => state.openMenu);

  React.useEffect(() => {
    if (!isShow) {
      setGroupOpened(false);
    }
  }, [isShow]);

  return (
    <li>
      <div
        css={css({
          padding: "0px 17px",
          height: "45px",
          lineHeight: "45px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": {
            color: "#00b5ff",
            cursor: "pointer",
          },
        })}
        onClick={() => {
          if (group.children !== undefined && group.children.length > 0) {
            if (!isShow) {
              window.sideMenu(true);
            }

            setGroupOpened(!groupOpened);
          } else {
            openMenu(group);
          }
        }}
      >
        <span>
          {group.iconName !== undefined && (
            <i
              className={`fa-${
                group.iconType === undefined ? "solid" : group.iconType
              } fa-${group.iconName}`}
              css={css([
                {
                  width: "21px",
                  fontSize: "21px",
                  marginRight: 20,
                },
                !isShow && {
                  "&:hover": {
                    "&::after": {
                      content: `'${group.title}'`,
                      position: "fixed",
                      left: "60px",
                      background: "#000",
                      color: "#fff",
                      fontSize: "12px",
                      padding: "7px 3px",
                      transform: "background-color 200ms linear",
                      zIndex: 1,
                    },
                  },
                },
              ])}
            />
          )}
          {group.title}
        </span>
        {group.children !== undefined && group.children.length > 0 && (
          <i
            className="fa-solid fa-angle-down"
            css={css({
              transform: groupOpened ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease-in-out",
            })}
          />
        )}
      </div>
      <ul
        css={css({
          background: "#002230",
          lineHeight: "40px",
          borderBottom: "#000",
          height: groupOpened
            ? `${(group.children ? group.children.length : 0) * 40}px`
            : "0px",
          transition: "height 200ms ease-in-out",
          overflow: "hidden",
          "& > li:hover": {
            background: "#00000040",
            color: "#00b5ff",
            cursor: "pointer",
          },
        })}
      >
        {group.children &&
          group.children.map((itm) => (
            <SideMenuItem key={`${group.key}-${itm.key}`} item={itm} />
          ))}
      </ul>
    </li>
  );
}

export default SideMenuItemGroup;
