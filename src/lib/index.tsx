import "./styles.css";
import React from "react";
import { DevsDataTableRef } from "./devs-datatable/_types";

export type { DevsDataTableRef } from "./devs-datatable/_types";
export { default as DevsDataTable } from "./devs-datatable";
export type {
  IDataTableSelectorOptionsProps,
  IDataTableColumn,
  IDataSource,
  IDataTableButtons,
  IDataTableProps,
  IFormsRef,
  IDataTableProviderProps,
  IDataTableContextProps,
  ICellProps,
} from "./devs-datatable/_types";
export { default as Button, MesButton } from "./button";
export type { ButtonProps, MesButtonProps } from "./button";
export {
  useMessage,
  MessageProvider,
} from "./alert-message/context/message-context";
export { LayoutProvider } from "./layout/contexts/layout-context";
export type {
  SideMenuItemsProps,
  SideMenuItemsChildProps,
} from "./layout/types/side-menu-item-props";
export { useMenuStore } from "./layout/stores/menu-store";
export { useUserStore } from "./layout/stores/user-store";
export type {
  IUser,
  TSetUser,
  IUserStore,
  TUpdateAccess,
  TUpdateRefresh,
} from "./layout/stores/user-store";
export { moveUrl, setDefaultTitle } from "./layout/utils/moveUrl";
export { default as LayerPopup } from "./layer-popup";
export type { LayoutPopupProps } from "./layer-popup";
export { default as ContextMenu } from "./context-menu";
export type { ContextMenuProps } from "./context-menu";
export { GyudAccessProvider } from "./access-context";
export { default as DevsDatePicker } from "./devs-date-picker";
export type { DevsDatePickerProps } from "./devs-date-picker";
export { default as DevsSplitContainer } from "./devs-split-container";
export type { TDevsSplitContainer } from "./devs-split-container";
export { default as messages } from "./utils/messages";
export { sleep } from "./utils/sleep";
export { useIntersectionObserver, useDevsXlsx } from "./hooks";
export const useDataTableRef = () => {
  return React.useRef<DevsDataTableRef>(null);
};
