/** @jsxImportSource @emotion/react */
import React from "react";

const LayerPopupBody: React.FC<{ children: any }> = React.memo((props) => {
  return <div data-name="layer-popup-body">{props.children}</div>;
});

export default LayerPopupBody;
