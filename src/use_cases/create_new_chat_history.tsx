import { RootState, useDispatch } from "../redux/store";
import { createNewHistory as createNewHistoryAction } from "../redux/slices/chatHistorySlice";
import { useSelector } from "react-redux";

export function useCreateNewChatHistory() {
  const dispatch = useDispatch();
  const createNewHistory = () => {
    dispatch(createNewHistoryAction());
  };

  return {
    createNewHistory,
  };
}
