import React from "react";

interface SideMenuOnClickProps {
  key: string;
  title: string;
  group: string;
  hasChildren: boolean;
  hasComponent: boolean;
}

interface SideMenuItemsProps {
  main?: boolean;
  key: string;
  shortKey?: string;
  group: string;
  iconType?: "solid" | "regular" | "light" | "thin";
  iconName: string;
  title: string;
  onClick?: ({
    key,
    title,
    group,
    hasChildren,
    hasComponent,
  }: SideMenuOnClickProps) => void;
  component?: React.FunctionComponent | React.FC<any>;
  hasClose?: boolean;
  children?: SideMenuItemsChildProps[];
  visible?: boolean;
}

interface SideMenuItemsChildProps
  extends Omit<SideMenuItemsProps, "iconType" | "iconName"> {}

export type { SideMenuItemsProps, SideMenuItemsChildProps };
