import { useDispatch } from "../redux/store";
import { addMessage } from "../redux/slices/chatHistorySlice";

export function useSubmitMessage() {
  const dispatch = useDispatch();

  const sendMessage = (message: string) => {
    if (message !== "") {
      dispatch(addMessage({ role: "user", content: message }));
    }
  };

  return {
    sendMessage,
  };
}
