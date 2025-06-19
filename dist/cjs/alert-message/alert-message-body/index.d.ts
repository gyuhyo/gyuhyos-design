import * as React from "react";
type AlertMessageBodyProps = {
    message: React.ReactNode;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    input: boolean;
    inputOption: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & React.AriaAttributes;
};
declare const AlertMessageBody: React.FC<AlertMessageBodyProps>;
export default AlertMessageBody;
