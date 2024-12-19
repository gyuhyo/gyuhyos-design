import React, { createContext, useContext } from "react";
import RootLayout from "../page/root-layout/root-layout";
import { SideMenuItemsProps } from "../types/side-menu-item-props";
import { useMenuStore } from "../stores/menu-store";
import { useUserStore } from "../stores/user-store";

interface languagesProps {
  code: string;
  name: string;
  flag: string;
}

interface LayoutContextProps {
  onAuthRefreshClick: ({
    refreshToken,
    login24h,
  }: {
    refreshToken: string;
    login24h: boolean;
  }) => void;
  menuType?: "slide" | "header" | "multiple";
  calculWidth: string;
  languages: languagesProps[];
  handleLanguageChange: (lang: languagesProps) => void;
}

const languages = [
  { code: "ko", name: "한국어", flag: "kr" }, // 한국어
  { code: "en", name: "English", flag: "us" }, // 영어
];

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{
  children: React.ReactNode;
  onAuthRefreshClick: ({
    refreshToken,
    login24h,
  }: {
    refreshToken: string;
    login24h: boolean;
  }) => void;
  menus: SideMenuItemsProps[];
  authUrl: string;
  menuType?: "slide" | "header" | "multiple";
}> = ({ children, menus, onAuthRefreshClick, authUrl, menuType = "slide" }) => {
  const path = window.location.pathname;
  const user = useUserStore((state) => state.me.userNo);
  const setInitialMenus = useMenuStore((state) => state.setInitialMenus);
  const calculWidth = React.useMemo(() => {
    return menuType === "slide" || menuType === "multiple"
      ? "calc(100vw - 55px)"
      : "100vw";
  }, [menuType]);
  React.useEffect(() => {
    if (!authUrl) {
      throw new Error("Please Add Auth Url From LayoutProvider Props.");
    }

    if (
      path !== authUrl &&
      (user === undefined || user === null) &&
      process.env.NODE_ENV !== "production" &&
      window.location.port !== "3000"
    ) {
      window.sessionStorage.removeItem("menu-storage");
      window.sessionStorage.removeItem("user-storage");
      window.location.href = authUrl;
    }
  }, [user, authUrl]);

  React.useEffect(() => {
    if (menus === undefined || menus.length === 0) {
      throw new Error(
        "메뉴가 등록되지 않았습니다.\n메뉴를 먼저 등록 후 레이아웃을 사용해 주세요."
      );
    }

    const flatMenus = menus.flatMap((x) =>
      x.children === undefined ? x : x.children
    );
    const mainMenu = flatMenus.find((x) => x.main === true);

    if (!mainMenu) {
      throw new Error("반드시 한개의 메인 메뉴가 존재해야 합니다.");
    }

    setInitialMenus(menus);
  }, [menus]);

  React.useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://kit.fontawesome.com/a220dac585.js";
      script.crossOrigin = "anonymous";

      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    if (document.readyState === "complete") {
      loadScript();
    } else {
      window.addEventListener("load", loadScript);
      return () => window.removeEventListener("load", loadScript);
    }
  }, []);

  React.useEffect(() => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const loadScript = () => {
      deleteCookie("googtrans");

      const addGoogleTranslateScript = document.createElement("script");
      addGoogleTranslateScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addGoogleTranslateScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ko",
            includedLanguages: "ko,en",
            autoDisplay: true,
          },
          "google_translate_element"
        );
      };

      return () => {
        if (document.body.contains(addGoogleTranslateScript)) {
          document.body.removeChild(addGoogleTranslateScript);
        }
      };
    };

    if (document.readyState === "complete") {
      loadScript();
    } else {
      window.addEventListener("load", loadScript);
      return () => window.removeEventListener("load", loadScript);
    }
  }, []);

  const handleLanguageChange = (lang: languagesProps) => {
    const html = document.querySelector("html");
    html?.removeAttribute("translate");

    const value = lang.code;

    const gtCombo = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (gtCombo) {
      console.dir(gtCombo);
      if (value === "ko") {
        gtCombo.value = value;
        gtCombo.dispatchEvent(new Event("change"));
      } else {
        gtCombo.value = value;
      }
      gtCombo.dispatchEvent(new Event("change"));
    }
  };

  if (path === authUrl) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (
    (user === undefined || user === null) &&
    process.env.NODE_ENV !== "production" &&
    window.location.port !== "3000"
  ) {
    return <></>;
  }

  return (
    <LayoutContext.Provider
      value={{
        menuType,
        onAuthRefreshClick,
        calculWidth,
        languages,
        handleLanguageChange,
      }}
    >
      <div id="google_translate_element"></div>
      <RootLayout />
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextProps => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
