/** @jsxImportSource @emotion/react */

import * as React from "react";
import { sideSettingSliderContainerStyle } from "./side-setting-slider-style";
import { css } from "@emotion/react";
import Button from "../../button";
import Backdrop from "../backdrop/backdrop";
import { useLayout } from "../contexts/layout-context";
function SideSettingSliderContainer() {
  const [fontSize, setFontSize] = React.useState(0.95);
  const [isShow, setIsShow] = React.useState(false);
  const { customSettings } = useLayout();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.sideSetting = setIsShow;
    }
  }, [setIsShow]);

  const onBackdropClick = (e: any) => {
    e.stopPropagation();
    window.sideSetting(false);
  };

  const onFontSizeUp = React.useCallback(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.fontSize = `${fontSize + 0.05}rem`;
      setFontSize(fontSize + 0.05);
    }
  }, [fontSize]);

  const onFontSizeDown = React.useCallback(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.fontSize = `${fontSize - 0.05}rem`;
      setFontSize(fontSize - 0.05);
    }
  }, [fontSize]);

  return (
    <Backdrop isShow={isShow} onClick={onBackdropClick}>
      <div
        css={sideSettingSliderContainerStyle({ opened: isShow })}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          css={css({
            height: "60px",
            lineHeight: "60px",
            borderBottom: "2px solid #ddd",
            display: "flex",
            flexDirection: "row",
            columnGap: "14px",
            alignItems: "center",
            padding: "0 14px",
          })}
        >
          <span
            style={{ fontSize: 24, cursor: "pointer" }}
            onClick={() => window.sideSetting(false)}
          >
            &#x2715;
          </span>
          <p>Setting</p>
        </div>
        <div
          css={css({
            padding: "30px 14px",
            display: "flex",
            flexDirection: "column",
            rowGap: "14px",
          })}
        >
          <div
            css={css({
              lineHeight: "30px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <p>폰트 크기</p>
            <div
              css={css({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid #ddd",
                fontSize: "0.85rem",
              })}
            >
              <Button
                bgColor="#df4873"
                color="#fff"
                onClick={onFontSizeDown}
                compact={true}
                rounded={false}
              >
                -
              </Button>
              <p
                css={css({
                  padding: "0px 7px",
                  background: "#fff",
                })}
              >
                {fontSize.toFixed(2)}
              </p>
              <Button
                bgColor="#1f619d"
                color="#fff"
                onClick={onFontSizeUp}
                compact={true}
                rounded={false}
              >
                +
              </Button>
            </div>
          </div>
          <div>
            <Button
              bgColor="#df4873"
              color="#fff"
              onClick={() => {
                window.sessionStorage.removeItem("menu-storage");
                window.location.reload();
              }}
              style={{
                width: "100%",
              }}
              rounded={false}
            >
              세션 삭제
            </Button>
            <p style={{ marginTop: 7, fontSize: 11 }}>
              업데이트로 인한 메뉴가 올바르게 작동하지 않을때 클릭
            </p>
          </div>
          {customSettings}
        </div>
      </div>
    </Backdrop>
  );
}

export default SideSettingSliderContainer;
