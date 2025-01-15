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
  refreshTokenUrl: string;
  menuType?: "slide" | "header" | "multiple";
  calculWidth: string;
  languages: languagesProps[];
  handleLanguageChange: (lang: languagesProps) => void;
  customSettings?: React.ReactNode;
}

const languages = [
  { code: "ko", name: "한국어", flag: "kr" }, // 한국어
  { code: "en", name: "English", flag: "us" }, // 영어
];

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{
  children: React.ReactNode;
  menus: SideMenuItemsProps[];
  authUrl: string;
  refreshTokenUrl: string;
  menuType?: "slide" | "header" | "multiple";
  customSettings?: React.ReactNode;
}> = ({
  children,
  menus,
  refreshTokenUrl,
  authUrl,
  menuType = "slide",
  customSettings,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false); // 클라이언트 체크
  const path = isClient ? window.location.pathname : ""; // 클라이언트에서만 접근
  const user = useUserStore((state) => state.me?.userNo);
  const setInitialMenus = useMenuStore((state) => state.setInitialMenus);

  const calculWidth = React.useMemo(() => {
    return menuType === "slide" || menuType === "multiple"
      ? "calc(100vw - 55px)"
      : "100vw";
  }, [menuType]);

  // 클라이언트 체크
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [isClient]);

  React.useEffect(() => {
    if (!isClient || !authUrl) return;
    if (
      !path.includes("popup") &&
      path !== authUrl &&
      (user === undefined || user === null)
    ) {
      window.sessionStorage.removeItem("menu-storage");
      window.sessionStorage.removeItem("user-storage");
      window.location.href = authUrl;
    }
  }, [user, authUrl, path, isClient]);

  React.useEffect(() => {
    if (!isClient) return;

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
  }, [menus, isClient]);

  React.useEffect(() => {
    if (!isLoaded || !isClient) return;

    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/a220dac585.js";
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isLoaded, isClient]);

  React.useEffect(() => {
    if (!isLoaded || !isClient) return;

    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

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
  }, [isLoaded, isClient]);

  const handleLanguageChange = (lang: languagesProps) => {
    if (!isClient) return;

    const html = document.querySelector("html");
    html?.removeAttribute("translate");

    const value = lang.code;

    const gtCombo = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (gtCombo) {
      gtCombo.value = value;
      gtCombo.dispatchEvent(new Event("change"));
    }
  };

  if (!isClient || path === authUrl || path.includes("popup")) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (!isLoaded || user === undefined || user === null) {
    return null;
  }

  return (
    <LayoutContext.Provider
      value={{
        menuType,
        refreshTokenUrl,
        calculWidth,
        languages,
        handleLanguageChange,
        customSettings,
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
