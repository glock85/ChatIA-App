import React, { ChangeEvent, useState } from "react";
import { InputHTMLAttributes } from "react";
import "../../styles/chat.css";

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

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="container-input-chat">
      <span>{props.label}</span>
      <input className="input-chat" style={{ ...props.styles }} {...props} />
      {props.postFix}
    </div>
  );
};
