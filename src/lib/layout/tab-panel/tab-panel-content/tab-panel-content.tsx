/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
function TabPanelContent({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") {
    return <>loading...</>;
  }

  return (
    <div
      css={css({
        flex: "1 1 0%",
        marginTop: "-1px",
        borderTop: "1px solid rgb(var(--panel-border-color))",
        position: "relative",
        overflow: "hidden",
      })}
    >
      <main css={css({ height: "100%" })}>{children}</main>
    </div>
  );
}

export default React.memo(TabPanelContent);
