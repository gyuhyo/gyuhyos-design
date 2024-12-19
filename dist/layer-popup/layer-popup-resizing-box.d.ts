import React from "react";
interface LayerPopupResizingBoxProps {
    isMaximized: boolean;
    setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
    size: {
        width: number;
        height: number;
    };
    setSize: React.Dispatch<React.SetStateAction<{
        width: number;
        height: number;
    }>>;
}
declare const LayerPopupResizingBox: React.FC<LayerPopupResizingBoxProps>;
export default LayerPopupResizingBox;
