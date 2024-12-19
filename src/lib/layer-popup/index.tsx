/** @jsxImportSource @emotion/react */
import React from "react";
import { layerPopupStyles } from "./layer-popup-styles";
import { css } from "@emotion/react";
import "./animation.styles.css";
import LayerPopupHeader from "./layer-popup-header";
import LayerPopupBody from "./layer-popup-body";
import LayerPopupFooter from "./layer-popup.footer";
import LayerPopupResizingBox from "./layer-popup-resizing-box";

export interface LayoutPopupProps {
  width?: number;
  height?: number;
  title?: string;
  children?: any;
  footer?: any;
  onCloseClick?: () => void;
}

const LayerPopup: React.FC<LayoutPopupProps> = React.memo((props) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  // 팝업 위치 상태
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [isMaximized, setIsMaximized] = React.useState<boolean>(false);
  const [size, setSize] = React.useState({
    width: props.width ?? 800,
    height: props.height ?? 500,
  });

  React.useEffect(() => {
    if (backdropRef.current) {
      const backdrop = backdropRef.current.getBoundingClientRect();
      setPosition({
        x: backdrop.width / 2 - (props.width ?? 800) / 2,
        y: backdrop.height / 2 - (props.height ?? 500) / 2,
      });
    }
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = (e.target as HTMLDivElement).querySelector(
      "div[data-name='layer-popup-container']"
    ) as HTMLDivElement;

    if (container) {
      container.classList.add("popupShakeIt");

      setTimeout(() => {
        container.classList.remove("popupShakeIt");

        // 애니메이션 속성 초기화
        container.style.animation = "none";
      }, 500);
    }
  };

  return (
    <div
      ref={backdropRef}
      data-name="layer-popup-backdrop"
      css={layerPopupStyles}
      onClick={onBackdropClick}
    >
      <div
        data-name="layer-popup-container"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <LayerPopupHeader
          backdropRef={backdropRef}
          title={props.title}
          isMaximized={isMaximized}
          setIsMaximized={setIsMaximized}
          position={position}
          setPosition={setPosition}
          size={size}
          setSize={setSize}
          onCloseClick={props.onCloseClick}
        />
        <LayerPopupBody>{props.children}</LayerPopupBody>
        {props.footer && <LayerPopupFooter>{props.footer}</LayerPopupFooter>}
        <LayerPopupResizingBox
          isMaximized={isMaximized}
          setIsMaximized={setIsMaximized}
          size={size}
          setSize={setSize}
        />
      </div>
    </div>
  );
});

export default LayerPopup;
