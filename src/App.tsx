import { useState } from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import HistoryList from "./components/HistoryList";
import SystemCard from "./components/SystemCard";

const App: React.FC = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY || "";

  const chatConfig = {
    messages: ["Hola"],
  };
  const [toggle, setToggle] = useState(true);

  const onToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <>
      <Header callback={onToggle} isToggle={toggle} />

      <div
        style={{
          display: "flex",
          backgroundColor: "rgba(248,250,252,255)",
          margin: "30px",
          gap: "30px",
        }}
      >
        {toggle && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "35%",
            }}
          >
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
