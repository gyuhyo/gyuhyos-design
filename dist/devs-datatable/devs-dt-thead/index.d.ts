import React from "react";
type TDevsDtThead = {
    thead: React.MutableRefObject<HTMLDivElement | null>;
    setHeaderWidth: React.Dispatch<React.SetStateAction<number>>;
};
declare function DevsDtTHead({ thead, setHeaderWidth }: TDevsDtThead): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DevsDtTHead>;
export default _default;
