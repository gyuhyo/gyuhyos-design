import React, { createContext, useContext, useState, ReactNode } from "react";

interface BackdropContextProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const BackdropContext = createContext<BackdropContextProps | undefined>(
  undefined
);

export const BackdropProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <BackdropContext.Provider value={{ isShow, setIsShow }}>
      {children}
    </BackdropContext.Provider>
  );
};

export const useBackdrop = (): BackdropContextProps => {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error("useBackdrop must be used within a BackdropProvider");
  }
  return context;
};
