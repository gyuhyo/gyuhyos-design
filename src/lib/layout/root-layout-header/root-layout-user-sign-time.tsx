/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { useUserStore } from "../stores/user-store";
import { useMessage } from "../../alert-message/context/message-context";

const RootLayoutUserSignTime: React.FC<any> = React.memo(() => {
  const signOut = useUserStore((state) => state.signOut);
  const user = useUserStore((state) => state.me);
  const { showMessage } = useMessage();
  const [expiredTime, setExpiredTime] = React.useState<string>("00:00");
  const [refreshExpiredTime, setRefreshExpiredTime] =
    React.useState<string>("00:00");

  React.useEffect(() => {
    if (!user.tokenInExpire) return;

    const end = user.tokenInExpire;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diffTime = end - now;

      if (diffTime <= 0) {
        signOut();
        return;
      }

      var h = Math.floor(diffTime / 1000 / 3600);
      var m = Math.floor(((diffTime / 1000) % 3600) / 60);

      setExpiredTime(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [user.tokenInExpire]);

  React.useEffect(() => {
    if (!user.refreshTokenInExpire) return;

    const end = user.refreshTokenInExpire;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diffTime = end - now;

      if (diffTime <= 0) {
        signOut();
        return;
      }

      var h = Math.floor(diffTime / 1000 / 3600);
      var m = Math.floor(((diffTime / 1000) % 3600) / 60);

      setRefreshExpiredTime(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [user.refreshTokenInExpire]);

  return (
    <p
      css={css({
        padding: "0px 7px",
        background: "#fff",
      })}
    >
      {expiredTime} 남음
    </p>
  );
});

export default RootLayoutUserSignTime;
