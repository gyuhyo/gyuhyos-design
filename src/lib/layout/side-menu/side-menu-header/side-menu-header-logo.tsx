import emotionStyled from "@emotion/styled";

export const SideMenuHeaderLogoDiv = emotionStyled.div((props) => ({
  background: "url('http://sqw.iptime.org:8085/header_logo_left1.png')",
  backgroundSize: "cover",
  filter: "invert(0.5)",
  height: "25.98px",
  width: "60px",
  cursor: "pointer",
}));

export const SideMenuHeaderLogo = () => {
  const onLogoClick = () => {
    window.location.href = "/";
  };
  return <SideMenuHeaderLogoDiv onClick={onLogoClick} />;
};
