import * as React from "react";
type AlertMessageHeaderProps = {
    type: string;
    title: string;
    isCloseButtonVisible: boolean;
    onCloseClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
    closeAlert: () => void;
};
declare const AlertMessageHeader: React.FC<AlertMessageHeaderProps>;
export default AlertMessageHeader;
