import { BsSend } from "react-icons/bs";
import { Input, useField } from "./ui/Input";
import { dispatch } from "../redux/store";
import { modifyHistory } from "../redux/slices/chatHistorySlice";
import { useEffect } from "react";

const SystemCard = () => {
  const { onChange, value } = useField<string>("");

  useEffect(() => {
    dispatch(modifyHistory({ systemPrompt: value }));
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: "white",
        borderRadius: "5px",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>Sistema</h3>
      <p>
        Para conseguir una respuesta adecuada a tus necesidades, escribe un
        prompt para el sistema
      </p>

      <Input
        type="text"
        placeholder="Escribe un prompt para el sistema"
        postFix={
          <BsSend
            style={{
              position: "absolute",
              right: "20px",
              fontSize: "20px",
              color: "rgb(249, 115, 22)",
            }}
          />
        }
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SystemCard;
