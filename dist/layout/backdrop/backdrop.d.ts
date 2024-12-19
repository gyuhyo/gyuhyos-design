/** @jsxImportSource @emotion/react */
import * as React from "react";
interface BackdropProps {
    children: React.ReactNode;
    isShow: boolean;
    onClick?: (e: any) => void | undefined;
    styles?: React.CSSProperties;
    backdropStyles?: React.CSSProperties;
}
declare function Backdrop(props: BackdropProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default Backdrop;
