import { useDispatch } from "../redux/store";
import { createNewHistory as createNewHistoryAction } from "../redux/slices/chatHistorySlice";

export function useCreateNewChatHistory() {
  const dispatch = useDispatch();
  const createNewHistory = () => {
    dispatch(createNewHistoryAction());
  };

  return {
    createNewHistory,
  };
}
