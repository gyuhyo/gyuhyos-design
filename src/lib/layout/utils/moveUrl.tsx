let defaultTitle = "";

export const setDefaultTitle = (title: string) => (defaultTitle = title);

export const moveUrl = (url: string, title: string) => {
  const assignTitle =
    typeof window === undefined || defaultTitle === ""
      ? ""
      : `${defaultTitle} `;
  window.history.pushState(
    { gm: url },
    `${assignTitle}MES - ${title}`,
    `/?gm=${encodeURIComponent(url)}`
  );
  document.title = `${assignTitle}MES - ${title}`;
};
