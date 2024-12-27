/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import {
  SideMenuItemsChildProps,
  SideMenuItemsProps,
} from "../types/side-menu-item-props";
import { useMenuStore } from "../stores/menu-store";
import Button from "../../button";
import { useMessage } from "../../alert-message/context/message-context";

interface Color3DTextComponentProps {
  errorNo: Number;
  color: string;
}

const Color3DTextComponent: React.FC<Color3DTextComponentProps> = ({
  errorNo,
  color,
}) => {
  return (
    <React.Fragment>
      <h1
        css={css({
          fontSize: "4rem",
          fontWeight: "bold",
          borderBottom: "2px solid transparent",
          borderImage: "linear-gradient(90deg, #fff 0%, #aaa 50%, #fff 100%)",
          borderImageSlice: 1,
          margin: "0px 0px 11px 0px",
          backgroundImage: `linear-gradient(180deg, ${color}80 20%, ${color}, ${color}10 80%)`,
          color: "transparent",
          backgroundClip: "text",
        })}
      >
        {errorNo.toString()}!
      </h1>
    </React.Fragment>
  );
};

interface PageErrorLayoutProps {
  menu: SideMenuItemsProps | SideMenuItemsChildProps;
  errorNo: Number;
}

const PageErrorLayout: React.FC<PageErrorLayoutProps> = ({ menu, errorNo }) => {
  const { showMessage } = useMessage();
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const closeCheckRef = React.useRef<HTMLInputElement>(null);

  let error = {
    message: "알 수 없는 에러가 발생했습니다.",
    color: "#aaaaaa",
  };

  const errorMessage = React.useMemo(() => {
    if (errorNo === 404) {
      error = {
        message: "페이지를 찾을 수 없습니다.",
        color: "#e71986",
      };
    } else if (errorNo === 401) {
      error = {
        message: "페이지 접근 권한이 없습니다.",
        color: "#aaaaaa",
      };
    }

    return error;
  }, [errorNo]);

  return (
    <div
      css={css({
        width: "100%",
        height: "100%",
        position: "relative",
      })}
    >
      <div
        css={css({
          width: 400,
          margin: "0 auto",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          border: "1px solid #ddd",
          padding: "20px 40px",
          borderRadius: "5px",
          boxShadow: "7px 7px 11px #aaaaaa60",
        })}
      >
        <div>
          <Color3DTextComponent errorNo={errorNo} color={errorMessage.color} />
          <h4>{errorMessage.message}</h4>
        </div>
        <div css={css({ alignSelf: "center" })}>
          <Button
            bgColor="#df4873"
            color="#fff"
            css={css({ height: 30, width: 200 })}
            onClick={() => {
              showMessage({
                title: "탭 닫기",
                message: "현재 탭을 닫으시겠습니까?",
                onOkClick: () => closeMenu(menu),
              });
            }}
          >
            현재 페이지 닫기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PageErrorLayout;
