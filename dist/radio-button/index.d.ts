import { CSSInterpolation } from "@emotion/serialize";
import React from "react";
export type TRadioButtonItems = {
    value: string | number;
    label: any;
};
export type TRadioButton = {
    rounded?: boolean;
    background?: string;
    color?: string;
    defaultValue?: string | number;
    onChange?: (value: string | number) => void;
    items: TRadioButtonItems[];
    styles?: CSSInterpolation;
};
declare const RadioButton: React.FC<TRadioButton>;
export default RadioButton;
