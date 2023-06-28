import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChatHistory } from "../domain";

export function useFetchAllHistories() {
  const chatHistoriesMap = useSelector(
    (state: RootState) => state.chatHistorySlice.chatHistories
  );
  const histories: ChatHistory[] = [];
  if (chatHistoriesMap !== null && chatHistoriesMap !== undefined) {
    Object.keys(chatHistoriesMap).forEach((chatHistory) =>
      histories.push(chatHistoriesMap[chatHistory])
    );
  }

  return {
    historiesList: histories,
  };
}
