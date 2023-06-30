import { useState } from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import HistoryList from "./components/HistoryList";
import SystemCard from "./components/SystemCard";
import "./styles/app.css";

const App: React.FC = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY || "";

  const chatConfig = {
    messages: ["Hola"],
  };
  const [toggle, setToggle] = useState(true);

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Header callback={onToggle} isToggle={toggle} />
      <div className="container-app">
        {toggle && (
          <div className="sidebar">
            <SystemCard />
            <HistoryList />
          </div>
        )}

        <Chat config={{ apiKey, chatConfig }} />
      </div>
    </>
  );
};

export default App;
