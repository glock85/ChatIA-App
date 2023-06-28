import React, { ChangeEvent, useState } from "react";
import { InputHTMLAttributes } from "react";

export function useField<T>(initValue: T) {
  const [value, setValue] = useState(initValue);

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value as T);
  };

  const clear = () => {
    setValue(initValue);
  };

  return {
    value,
    onChange,
    setValue,
    clear,
  };
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  postFix?: React.ReactNode;
  styles?: any;

  clear?: () => void;
}

const inputStyle = {
  width: "100%",
  height: "30px",
  borderRadius: "5px",
  border: "1px solid black",
  padding: "5px",
  margin: "5px",
};
export const Input: React.FC<InputProps> = (props) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span>{props.label}</span>
      <input style={{ ...inputStyle, ...props.styles }} {...props} />
      {props.postFix}
    </div>
  );
};
