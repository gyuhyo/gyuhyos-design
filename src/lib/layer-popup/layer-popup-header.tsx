/** @jsxImportSource @emotion/react */
import React from "react";

interface LayerPopupHeaderProps {
  title?: string;
  isMaximized: boolean;
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  backdropRef: React.MutableRefObject<HTMLDivElement | null>;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  onCloseClick?: () => void;
}

const LayerPopupHeader: React.FC<LayerPopupHeaderProps> = React.memo(
  (props) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
    const [beforeMaximizedSize, setBeforeMaximizedSize] = React.useState({
      width: 800,
      height: 500,
    });
    const [beforeMaximizedPosition, setBeforeMaximizedPosition] =
      React.useState({
        x: 0,
        y: 0,
      });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      setStartPos({
        x: e.clientX - props.position.x,
        y: e.clientY - props.position.y,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || props.isMaximized) return;

      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;

      if (newX < 0 || newY < 0 || !props.backdropRef.current) return;

      const backdrop = props.backdropRef.current.getBoundingClientRect();

      if (
        backdrop.height < newY + props.size.height / 2 ||
        backdrop.width < newX + props.size.width / 2
      )
        return;

      props.setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    React.useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging]);

    const onMaximizedClick = () => {
      if (!props.backdropRef.current || props.isMaximized) return;

      const container = document.querySelector(
        "div[data-name='layer-popup-container']"
      );

      if (
        container &&
        !props.isMaximized &&
        !container.classList.contains("softResizing")
      ) {
        container.classList.add("softResizing");
      }

      const { width: backdropWidth, height: backdropHeight } =
        props.backdropRef.current.getBoundingClientRect();

      props.setIsMaximized(true);

      setBeforeMaximizedPosition({
        x: props.position.x,
        y: props.position.y,
      });

      setBeforeMaximizedSize({
        width: props.size.width,
        height: props.size.height,
      });

      props.setSize({
        width: backdropWidth - 14,
        height: backdropHeight - 14,
      });

      props.setPosition({
        x: 7,
        y: 7,
      });
    };

    const onMinimizedClick = () => {
      if (!props.isMaximized) return;
      if (beforeMaximizedSize.width === 0 || beforeMaximizedSize.height === 0)
        return;

      props.setIsMaximized(false);

      props.setSize({
        width: beforeMaximizedSize.width,
        height: beforeMaximizedSize.height,
      });

      props.setPosition({
        x: beforeMaximizedPosition.x,
        y: beforeMaximizedPosition.y,
      });

      // 상태 업데이트 이후 DOM 클래스 변경
      const timer = setTimeout(() => {
        const container = document.querySelector(
          "div[data-name='layer-popup-container']"
        );
        if (container) {
          container.classList.remove("softResizing");
        }
      }, 200);

      return () => clearTimeout(timer);
    };

    return (
      <div data-name="layer-popup-header">
        <p
          onDoubleClick={
            props.isMaximized ? onMinimizedClick : onMaximizedClick
          }
          onMouseDown={handleMouseDown}
        >
          {props.title ?? "Un Titled"}
        </p>
        <div data-name="layer-popup-header-buttons">
          <i className="fa-solid fa-compress" onClick={onMinimizedClick}></i>
          <i className="fa-solid fa-expand" onClick={onMaximizedClick}></i>
          <i className="fa-solid fa-xmark" onClick={props.onCloseClick}></i>
        </div>
      </div>
    );
  }
);

export default LayerPopupHeader;
