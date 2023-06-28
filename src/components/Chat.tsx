import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { VscWand } from "react-icons/vsc";

import CardMessageUser from "./CardMessageUser";
import HeaderChat from "./HeaderChat";
import CardMessageIALoading from "./CardMessageIALoading";
import { Input, useField } from "./ui";
import { useFetchAllMessage, useSubmitMessage } from "../use_cases";
import { RootState, useSelector } from "../redux/store";

interface ChatInputButtonsProps {
  onSendClick: () => void;
}

const ChatInputButtons: React.FC<ChatInputButtonsProps> = ({ onSendClick }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        right: "50px",
        fontSize: "20px",
        gap: "15px",
        cursor: "pointer",
      }}
    >
      <BsSend onClick={() => onSendClick()} color="rgb(249, 115, 22)" />
      <VscWand color="green" />
    </div>
  );
};

interface ChatProps {
  config: {
    apiKey: string;
    chatConfig: {
      messages: string[];
    };
  };
}

const Chat: React.FC<ChatProps> = () => {
  const systemPrompt = useSelector(
    (state: RootState) => state.chatHistorySlice.systemPrompt
  );
  const message = useField<string>("");
  const { fetchMessages, loading, chatHistory } = useFetchAllMessage();
  const { sendMessage } = useSubmitMessage();
  const [remainingTokens, setRemainingTokens] = useState(1001);

  const messagesEndRef = useRef(null as any);

  const countTokens = (text: string): number => {
    // Remueve espacios en blanco y divide el texto en palabras
    const words = text.trim().split(/\s+/);
    // Cuenta la cantidad de palabras
    const wordCount = words.length;
    // Retorna el número total de tokens
    return wordCount;
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [fetchMessages]);

  const submitNewMessage = () => {
    sendMessage(message.value);
    fetchMessages(message.value, systemPrompt).catch((err) => {
      alert("Something wrong happened");
    });
    message.clear();
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitNewMessage();
  };

  useEffect(() => {
    const tokenCount = countTokens(message.value);
    setRemainingTokens(1001 - tokenCount);
    if (tokenCount > 1001) {
      alert("You have exceeded the maximum number of tokens");
      return;
    }
  }, [message.value]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <HeaderChat />

      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
          padding: "10px",
          boxSizing: "border-box",
          paddingBottom: "100px",
        }}
      >
        {chatHistory.map((message, index) => (
          <CardMessageUser key={index} message={message} />
        ))}
        {loading && <CardMessageIALoading />}
        <div ref={messagesEndRef} />
      </div>

      {/*Mover a componente aparte para evitar re render en cada teclado*/}

      <div
        style={{
          display: "grid",
          placeItems: "center",
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "100px",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          background: "white",
        }}
      >
        <form
          onSubmit={handleMessageSubmit}
          style={{
            display: "flex",
            justifyContent: 'space-between',
            width: "100%",
          }}
        >
          <Input
            placeholder="Escribe tu mensaje..."
            {...message}
            postFix={<ChatInputButtons onSendClick={submitNewMessage} />}
          />
          <h4>Tokens restantes: {remainingTokens}</h4>
        </form>
      </div>
    </div>
  );
};

export default Chat;
