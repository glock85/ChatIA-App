import { IoIosAddCircleOutline } from "react-icons/io";
import { useCreateNewChatHistory } from "../use_cases/create_new_chat_history";

const HeaderChat = () => {
  const { createNewHistory } = useCreateNewChatHistory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "10px",
      }}
    >
      <h3>Odama Chat</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          background: "rgb(249, 115, 22)",
          borderRadius: "5px",
          padding: "0 10px 0 10px",
          color: "white",
        }}
        onClick={createNewHistory}
      >
        <IoIosAddCircleOutline fontSize={20} />
        <p>Nueva Búsqueda</p>
      </div>
    </div>
  );
};

export default HeaderChat;
