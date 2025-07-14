import React from "react";

const GyudAccessContext = React.createContext<{ result: boolean } | undefined>(
  undefined
);

export const GyudAccessProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isAccess, setIsAccess] = React.useState({ result: false });

  React.useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/gyuhyo/gyud-access/master/access-host?timestamp=${new Date().getTime()}`,
      { method: "GET", cache: "no-cache" }
    )
      .then((res) => res.text())
      .then((res) => {
        const accessHosts = res.trim().split("\n");
        const myHost = `${window.location.protocol}//${window.location.host}`;

        let access: boolean = false;
        if (accessHosts.includes("*")) {
          access = true;
          setIsAccess({ result: true });
        } else {
          access = accessHosts.includes(myHost);
          setIsAccess({ result: access });
        }
        setIsSuccess(true);
        if (!access) {
          throw new Error("You do not have permission to use package 'gyud'.");
        }
      });
  }, []);

  if (!isSuccess || !isAccess) return null;

  return (
    <GyudAccessContext.Provider value={isAccess}>
      {children}
    </GyudAccessContext.Provider>
  );
};

export const useGyudAccess = (): { result: boolean } => {
  const context = React.useContext(GyudAccessContext);

  if (!context) {
    throw new Error("Component Not Found: GyudAccessProvider");
  }
  return context;
};
