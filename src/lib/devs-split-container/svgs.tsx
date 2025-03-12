/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const LeftArrow = () => {
  return (
    <div
      css={css({
        position: "absolute",
        top: "50%",
        left: -9,
        transform: "translate(-50%, -50%)",
        zIndex: 4,
        pointerEvents: "fill",
        cursor: "pointer",
        "&:hover": {
          color: "#007bff",
        },
      })}
      onClick={(e) => alert("as")}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="left"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
      </svg>
    </div>
  );
};

export const RightArrow = () => {
  return (
    <div
      css={css({
        position: "absolute",
        top: "50%",
        left: 18,
        transform: "translate(-50%, -50%)",
        zIndex: 4,
      })}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
      </svg>
    </div>
  );
};

export const UpArrow = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="up"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
    </svg>
  );
};

export const DownArrow = () => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="down"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
    </svg>
  );
};
