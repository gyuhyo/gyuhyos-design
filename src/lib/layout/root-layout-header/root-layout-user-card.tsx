/** @jsxImportSource @emotion/react */

import React from "react";
import Button from "../../button";
import { css } from "@emotion/react";
import { useUserStore } from "../stores/user-store";
import { useMessage } from "../../alert-message/context/message-context";
import RootLayoutUserSignTime from "./root-layout-user-sign-time";
import { useLayout } from "../contexts/layout-context";

const RootLayoutUserCard: React.FC<any> = React.memo(() => {
  const signOut = useUserStore((state) => state.signOut);
  const user = useUserStore((state) => state.me);
  const { showMessage } = useMessage();
  const { onAuthRefreshClick, languages, handleLanguageChange } = useLayout();

  const onSignOutClick = () => {
    showMessage({
      title: "로그아웃 확인",
      message: "정말 로그아웃 하시겠습니까?",
      onOkClick: () => {
        signOut();
      },
    });
  };

  const onRefreshClick = React.useCallback(() => {
    if (!user.refreshToken) return;

    onAuthRefreshClick({
      refreshToken: user.refreshToken,
      login24h: user.login24h ?? false,
    });
  }, [user]);

  return (
    <div>
      <div
        css={css({
          lineHeight: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px solid #ddd",
          fontSize: "20px",
          padding: "3px 5px",
        })}
      >
        {languages.map((x) => (
          <div
            key={x.flag}
            css={css({
              background: `url('https://cdn.weglot.com/flags/square/${x.flag}.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "24px",
              width: "30px",
              border: "2px solid transparent",
              "&:hover": {
                cursor: "pointer",
                mixBlendMode: "darken",
              },
            })}
            onClick={() => handleLanguageChange(x)}
          />
        ))}
      </div>
      <div
        css={css({
          lineHeight: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px solid #ddd",
          fontSize: "0.85rem",
        })}
      >
        <RootLayoutUserSignTime />
        <Button
          bgColor="#1f619d"
          color="#fff"
          compact={true}
          rounded={false}
          onClick={onRefreshClick}
        >
          연장
        </Button>
        <Button
          bgColor="#df4873"
          color="#fff"
          compact={true}
          rounded={false}
          border={false}
          onClick={onSignOutClick}
        >
          로그아웃
        </Button>
      </div>
      <div
        css={css({
          lineHeight: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px solid #ddd",
          fontSize: "0.85rem",
        })}
      >
        <p
          css={css({
            padding: "0px 7px",
            background: "#fff",
          })}
        >
          {`${user.userName}님`}
        </p>
        <Button
          bgColor="#a0a0a0"
          color="#fff"
          onClick={() => window.sideSetting(true)}
          compact={true}
          rounded={false}
        >
          설정
        </Button>
      </div>
    </div>
  );
});

export default RootLayoutUserCard;
