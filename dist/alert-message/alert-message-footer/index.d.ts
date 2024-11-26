import * as React from "react";
type AlertMessageFooterProps = {
    footerStart: React.ReactNode;
    isOkButtonVisible: boolean;
    onOkClick: (e: React.MouseEvent<HTMLButtonElement>) => void | boolean;
    okCaption: string;
    closeAlert: () => void;
    isCancelButtonVisible: boolean;
    onCancelClick: (e: React.MouseEvent<HTMLButtonElement>) => void | boolean;
    cancelCaption: string;
};
declare const AlertMessageFooter: React.FC<AlertMessageFooterProps>;
export default AlertMessageFooter;
