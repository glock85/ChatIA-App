import { IoIosAddCircleOutline } from "react-icons/io";
import { useCreateNewChatHistory } from "../use_cases/create_new_chat_history";

const HeaderChat = () => {
  const { createNewHistory } = useCreateNewChatHistory();
  return (
    <div className="header-chat">
      <h3>Odama Chat</h3>
      <div className="new-search-button" onClick={createNewHistory}>
        <IoIosAddCircleOutline fontSize={20} />
        <p>Nueva Búsqueda</p>
      </div>
    </div>
  );
};

export default HeaderChat;
