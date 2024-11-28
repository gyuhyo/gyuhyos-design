import React from "react";
type TDevsDtThead = {
    thead: React.RefObject<HTMLDivElement>;
    setHeaderWidth: React.Dispatch<React.SetStateAction<number>>;
};
declare function DevsDtTHead({ thead, setHeaderWidth }: TDevsDtThead): import("@emotion/react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DevsDtTHead>;
export default _default;
