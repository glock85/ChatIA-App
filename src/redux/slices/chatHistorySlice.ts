// src/redux/chatHistorySlice.ts
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ChatHistory, ChatIdentifier, ChatMessage } from "../../domain";

interface ChatHistoryState {
  currentHistory: ChatHistory | null;
  messages: ChatMessage[];
  chatHistories: { [key: ChatIdentifier]: ChatHistory };
  systemPrompt: string;
}

const initialState: ChatHistoryState = {
  //Current messages
  messages: [],
  currentHistory: null,
  chatHistories: {},
  systemPrompt: "",
};

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addMessage: (
      state: Draft<ChatHistoryState>,
      action: PayloadAction<ChatMessage>
    ) => {
      if (state.currentHistory) {
        state.currentHistory.messages = [
          ...state.currentHistory.messages,
          action.payload,
        ];
      } else {
        const newHistory = new ChatHistory([action.payload]);
        state.currentHistory = newHistory;
        state.chatHistories[newHistory.id] = newHistory;
      }

      state.messages.push(action.payload);
    },
    resetMessages: () => initialState,
    createNewHistory: (state: Draft<ChatHistoryState>) => {
      state.currentHistory = null;
      state.messages = [];
    },
    selectChat: (
      state: Draft<ChatHistoryState>,
      action: PayloadAction<ChatIdentifier>
    ) => {
      const storedHistory = state.chatHistories[action.payload];
      if (storedHistory) {
        state.messages = storedHistory.messages;
        state.currentHistory = storedHistory;
      }
    },
    deleteChat: (
      state: Draft<ChatHistoryState>,
      action: PayloadAction<ChatIdentifier>
    ) => {
      delete state.chatHistories[action.payload];
      state.currentHistory = null;
      state.messages = [];
    },

    modifyHistory: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const {
  addMessage,
  resetMessages,
  createNewHistory,
  selectChat,
  deleteChat,
  modifyHistory,
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
