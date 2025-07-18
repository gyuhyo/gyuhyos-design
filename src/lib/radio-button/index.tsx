/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import newStyled from "@emotion/styled";
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

const RadioButton: React.FC<TRadioButton> = ({
  rounded = true,
  background = "#aaaaaa",
  color = "#000",
  defaultValue,
  onChange,
  items,
  styles,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(defaultValue);

  const handleChangeValue = (value: string | number) => {
    setSelectedItem(value);

    if (onChange) onChange(value);
  };

  if (!items || items.length === 0) return <></>;

  return (
    <RadioButtonGroup
      className="gyud-radio-button-group"
      isRounded={rounded}
      backgroundColor={background}
      css={styles ? css(styles) : null}
    >
      {items &&
        items.map((item) => (
          <RadioButtonItem
            key={item.value}
            className="gyud-radio-button-item"
            isSelected={selectedItem === item.value}
            onClick={() => handleChangeValue(item.value)}
            backgroundColor={background}
            textColor={color}
          >
            <div className="gyud-radio-button-item-label">{item.label}</div>
          </RadioButtonItem>
        ))}
    </RadioButtonGroup>
  );
};

export default RadioButton;

type TRadioButtonGroup = {
  isRounded: boolean;
  backgroundColor: string;
};

const RadioButtonGroup = newStyled.div<TRadioButtonGroup>((props) => {
  return {
    display: "flex",
    flexDirection: "row",
    border: `1px solid ${props.backgroundColor}`,
    borderRadius: "5px",
  };
});

type TRadioButtonItem = {
  isSelected: boolean;
  backgroundColor: string;
  textColor: string;
};

const RadioButtonItem = newStyled.div<TRadioButtonItem>((props) => {
  const selectedBg = `linear-gradient(180deg, ${props.backgroundColor}90 0%, ${props.backgroundColor} 50%, ${props.backgroundColor}90 100%)`;
  const unSelectedBg = `linear-gradient(180deg, ${props.backgroundColor}30 0%, ${props.backgroundColor}50 50%, ${props.backgroundColor}30 100%)`;
  const hoverBg = `linear-gradient(180deg, ${props.backgroundColor}50 0%, ${props.backgroundColor}70 50%, ${props.backgroundColor}50 100%)`;

  return {
    overflow: "hidden",
    alignContent: "center",
    padding: "5px 12px",
    minWidth: "30px",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    background: props.isSelected ? selectedBg : unSelectedBg,
    "&:hover": {
      background: props.isSelected ? selectedBg : hoverBg,
    },
    "&:not(:last-of-type)": {
      borderInlineEnd: `1px solid ${props.backgroundColor}`,
    },
    "& .gyud-radio-button-item-label": {
      color: props.isSelected ? props.textColor : "var(--text-color)",
    },
  };
});
