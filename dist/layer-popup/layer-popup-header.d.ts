/** @jsxImportSource @emotion/react */
import React from "react";
interface LayerPopupHeaderProps {
    title?: string;
    isMaximized: boolean;
    setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
    backdropRef: React.MutableRefObject<HTMLDivElement | null>;
    position: {
        x: number;
        y: number;
    };
    setPosition: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>;
    size: {
        width: number;
        height: number;
    };
    setSize: React.Dispatch<React.SetStateAction<{
        width: number;
        height: number;
    }>>;
    onCloseClick?: () => void;
}
declare const LayerPopupHeader: React.FC<LayerPopupHeaderProps>;
export default LayerPopupHeader;
