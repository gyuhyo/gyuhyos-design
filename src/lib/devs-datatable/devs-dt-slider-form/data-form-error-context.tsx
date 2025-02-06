import React from "react";
import { FieldErrors } from "react-hook-form";
import { IDataSource } from "../_types";

const DataFormErrorContext = React.createContext<
  undefined | FieldErrors<IDataSource>
>(undefined);

export const DataFormErrorProvider: React.FC<any> = React.memo(
  ({ children, errors }) => {
    return (
      <DataFormErrorContext.Provider value={errors}>
        {children}
      </DataFormErrorContext.Provider>
    );
  }
);

export const useFormErrors = () => {
  const context = React.useContext(DataFormErrorContext);

  if (context === undefined) throw new Error("not found data form context");

  return context;
};
