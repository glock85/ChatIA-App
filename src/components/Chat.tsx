import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { VscWand } from "react-icons/vsc";

import CardMessageUser from "./CardMessageUser";
import HeaderChat from "./HeaderChat";
import CardMessageIALoading from "./CardMessageIALoading";
import { Input, useField } from "./ui";
import { useFetchAllMessage, useSubmitMessage } from "../use_cases";
import { RootState, useSelector } from "../redux/store";
import "../styles/chat.css";

interface ChatInputButtonsProps {
  onSendClick: () => void;
}

const ChatInputButtons: React.FC<ChatInputButtonsProps> = ({ onSendClick }) => {
  return (
    <div className="chat-input-buttons">
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
  const { fetchMessages, loading, chatHistory } = useFetchAllMessage();
  const { sendMessage } = useSubmitMessage();
  const [remainingTokens, setRemainingTokens] = useState(1001);

  const message = useField<string>("");
  const messagesEndRef = useRef(null as any);

  const countTokens = (text: string): number => {
    // Remueve espacios en blanco y divide el texto en palabras
    const words = text.trim().split(/\s+/);
    // Cuenta la cantidad de palabras
    const wordCount = words.length;
    // Retorna el número total de tokens
    return wordCount;
  };

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
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [fetchMessages]);

  useEffect(() => {
    const tokenCount = countTokens(message.value);
    setRemainingTokens(1001 - tokenCount);
    if (tokenCount > 1001) {
      alert("You have exceeded the maximum number of tokens");
      return;
    }
  }, [message.value]);

  return (
    <div className="chat-container">
      <HeaderChat />

      <div className="card-container">
        {chatHistory.map((message, index) => (
          <CardMessageUser key={index} message={message} />
        ))}
        {loading && <CardMessageIALoading />}
        <div ref={messagesEndRef} />
      </div>

      <div className="form-container">
        <form onSubmit={handleMessageSubmit} className="form-chat">
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
