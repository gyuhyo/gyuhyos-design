/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import "../message.styles.css";

export interface IToastMessageComponent {
  id: string;
  length: number;
  type: "success" | "error" | "warnning" | "info";
  align: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  title: string;
  message: string;
  duration: number;
  startAt: number;
  endAt: number;
  removeToastMessage: (alertId: string) => void;
}

const ToastMessage: React.FC<IToastMessageComponent> = React.memo((props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [pauseStartTime, setPauseStartTime] = React.useState(0);
  const [pauseTime, setPauseTime] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);

  const closeToastMessage = () => {
    const leftRight = props.align.includes("Right")
      ? "closeRightToastMessage"
      : "closeLeftToastMessage";

    if (
      containerRef.current &&
      containerRef.current.hasAttribute("class") &&
      !containerRef.current!.classList.contains(leftRight)
    ) {
      containerRef.current!.classList.add(leftRight);
    }
    setTimeout(() => {
      props.removeToastMessage(props.id);
    }, 300);
  };

  let timer: NodeJS.Timer;
  React.useEffect(() => {
    if (isHover) return;

    timer = setInterval(() => {
      const percent =
        ((props.endAt + pauseTime - Date.now()) / props.duration) * 100;

      if (progressRef.current) {
        progressRef.current.style.width = `${percent}%`;
      }

      if (percent <= 0) {
        closeToastMessage();
        return;
      }
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, [isHover, pauseTime]);

  return (
    <ToastMessageContainer
      ref={containerRef}
      align={props.align}
      length={props.length}
      type={props.type}
      setIsHover={setIsHover}
      setPauseStartTime={setPauseStartTime}
      setPauseTime={setPauseTime}
      pauseStartTime={pauseStartTime}
    >
      <ToastMessageHeader type={props.type}>
        <p style={{ fontWeight: "bold" }}>{props.title}</p>
        <ToastMessageHeaderCloseButton onClick={closeToastMessage} />
      </ToastMessageHeader>
      <ToastMessageBody>{props.message}</ToastMessageBody>
      <ToastMessageProgress ref={progressRef} type={props.type} />
    </ToastMessageContainer>
  );
});

const ToastMessageBody = styled.div({
  padding: 12,
  hiteSpace: "pre-wrap",
  flex: 1,
  alignContent: "center",
});

const ToastMessageHeaderCloseButton = styled.div({
  cursor: "pointer",
  "&::after": {
    content: '"\\2715"',
    color: "#f40077",
    fontWeight: "bold",
    padding: "4px 7px",
    textAlign: "center",
  },
  "&:hover::after": {
    background: "#fbdcdc",
    borderRadius: 7,
  },
});

interface IToastMessageHeader {
  type: "success" | "error" | "warnning" | "info";
}
const ToastMessageHeader = styled.div<IToastMessageHeader>((props) => {
  let borderImage =
    "linear-gradient(90deg, #0d6f9b20 0%, #0d6f9b 50%, #0d6f9b20 100%)";

  if (props.type === "error") {
    borderImage =
      "linear-gradient(90deg, #ff2c5a20 0%, #ff2c5a 50%, #ff2c5a20 100%)";
  }

  if (props.type === "warnning") {
    borderImage =
      "linear-gradient(90deg, #dc983620 0%, #dc9836 50%, #dc983620 100%)";
  }

  if (props.type === "success") {
    borderImage =
      "linear-gradient(90deg, #45bf2d20 0%, #45bf2d 50%, #45bf2d20 100%)";
  }
  return {
    flex: "none",
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid transparent",
    borderImage: borderImage,
    borderImageSlice: 1,
    boxShadow: "0px 2px 11px #00000030",
  };
});

interface IToastMessageProgress {
  type: "success" | "error" | "warnning" | "info";
}
const ToastMessageProgress = styled.div<IToastMessageProgress>((props) => {
  let borderImage = "#0d6f9b90";

  if (props.type === "error") {
    borderImage = "#ff2c5a90";
  }

  if (props.type === "warnning") {
    borderImage = "#dc983690";
  }

  if (props.type === "success") {
    borderImage = " #45bf2d90";
  }

  return {
    flex: "none",
    width: "100%",
    background: borderImage,
    height: 3,
    borderRadius: "5px",
  };
});

interface IToastMessageContainer {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  type: "success" | "error" | "warnning" | "info";
  align: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  length: number;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  pauseStartTime: number;
  setPauseStartTime: React.Dispatch<React.SetStateAction<number>>;
  setPauseTime: React.Dispatch<React.SetStateAction<number>>;
  children: any;
}

const ToastMessageContainer: React.FC<IToastMessageContainer> = (props) => {
  const DEFAULT_POSITION = 7;
  const HEIGHT = 130;
  const topBottomPosition =
    DEFAULT_POSITION +
    HEIGHT * (props.length - 1) +
    (props.length - 1) * 14 +
    7;
  const leftRight = props.align.includes("Right")
    ? "showRightToastMessage"
    : "showLeftToastMessage";

  let position;
  if (props.align === "topLeft") {
    position = {
      top: topBottomPosition,
      left: 7,
    };
  } else if (props.align === "topRight") {
    position = {
      top: topBottomPosition,
      right: 7,
    };
  } else if (props.align === "bottomLeft") {
    position = {
      bottom: topBottomPosition,
      left: 7,
    };
  } else {
    position = {
      bottom: topBottomPosition,
      right: 7,
    };
  }

  return (
    <div
      onMouseEnter={() => {
        props.setPauseStartTime(Date.now());
        props.setIsHover(true);
      }}
      onMouseLeave={() => {
        props.setPauseTime(
          (prev) => prev + (Date.now() - props.pauseStartTime)
        );
        props.setIsHover(false);
      }}
      ref={props.ref}
      css={css({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        minWidth: "300px",
        height: `${HEIGHT}px`,
        background: "#ffffff90",
        borderRadius: "5px",
        zIndex: 4,
        transition: "top 200ms ease-in, left 200ms ease-in",
        backdropFilter: "blur(12px)",
        boxShadow: "5px 5px 12px #00000070",
      })}
      style={position}
      className={leftRight}
    >
      {props.children}
    </div>
  );
};

export default ToastMessage;
