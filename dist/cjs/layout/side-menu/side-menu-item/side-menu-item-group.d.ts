/** @jsxImportSource @emotion/react */
interface SideMenuGroupsProps {
    key: string;
    title: string;
    iconType?: "solid" | "regular" | "light" | "thin";
    iconName?: string;
    children?: SideMenuGroupsProps[];
}
interface SideMenuItemGroupProps {
    group: SideMenuGroupsProps;
    isShow: boolean;
}
declare function SideMenuItemGroup({ group, isShow }: SideMenuItemGroupProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default SideMenuItemGroup;
