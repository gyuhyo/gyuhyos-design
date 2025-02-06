/** @jsxImportSource @emotion/react */
import React from "react";
import "./animation.styles.css";
export interface LayoutPopupProps {
    width?: number;
    height?: number;
    title?: string;
    children?: any;
    footer?: any;
    onCloseClick?: () => void;
}
declare const LayerPopup: React.FC<LayoutPopupProps>;
export default LayerPopup;
