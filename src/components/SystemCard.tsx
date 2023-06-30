import { BsSend } from "react-icons/bs";
import { Input, useField } from "./ui/Input";
import { dispatch } from "../redux/store";
import { modifyHistory } from "../redux/slices/chatHistorySlice";
import { useEffect } from "react";

import "../styles/system-card.css";

const SystemCard = () => {
  const { onChange, value } = useField<string>("");

  useEffect(() => {
    dispatch(modifyHistory({ systemPrompt: value }));
  }, [value]);

  return (
    <div className="system-card-container">
      <h3 style={{ margin: 0 }}>Sistema</h3>
      <p>
        Para conseguir una respuesta adecuada a tus necesidades, escribe un
        prompt para el sistema
      </p>

      <Input
        type="text"
        placeholder="Escribe un prompt para el sistema"
        postFix={<BsSend className="system-card-container__send-icon" />}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SystemCard;
