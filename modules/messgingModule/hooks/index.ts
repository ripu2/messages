import { Dispatch, useReducer, useState } from "react";
import { MessageBodyType, State } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState, useMessengerContext } from "messages/modules/context";

import { apiService } from "messages/services/API/apiServices";

const reducer = {
  setMessages: function (
    state: State,
    action: PayloadAction<MessageBodyType[]>
  ) {
    state.messages = action.payload;
    const chunkSize = 10;
    const selectedMessage = action.payload.slice(0, chunkSize);
    state.currentPageMessages = selectedMessage;
    const numberOfPages = Math.floor(action.payload.length / 10) + 1;
    let arr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arr.push(i);
    }
    state.paginationArray = arr;
  },
  setCurrentPageMessages: function (
    state: State,
    action: PayloadAction<number>
  ) {
    const chunkSize = action.payload * 10;
    const selectedMessage = state.messages.slice(0, chunkSize);
    state.currentPageMessages = selectedMessage;
    state.isAtEnd = selectedMessage.length === state.messages.length;
  },
};

const slice = createSlice({
  initialState,
  name: "messenger",
  reducers: reducer,
});

export const messengerActions = slice.actions;

export function useMessengerReducer() {
  return useReducer(slice.reducer, initialState);
}

export function useMessenger(dispatch: Dispatch<any> | null) {
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [deletingMessages, setDeletingMessage] = useState(false);

  const { state } = useMessengerContext();

  const getMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await apiService.get();
      if (response && dispatch)
        dispatch(messengerActions.setMessages(response));
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async (
    messageBody: {
      text: string;
    },
    callBack?: () => void
  ) => {
    try {
      const response = await fetch(
        "https://mapi.harmoney.dev/api/v1/messages/",
        {
          method: "POST",
          headers: {
            // 'Accept': 'application/json',
            Authorization: "n5Vpg1xAG3PtxKg7",
            "content-type": "application/json",
          },
          body: JSON.stringify(messageBody),
        }
      );
      if (response) {
        const responseData = await response.json();
        const messages = [...state.messages, responseData];
        if (dispatch) dispatch(messengerActions.setMessages(messages));
        if (callBack) callBack();
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const deleteMessage = async (messageId: number) => {
    try {
      setDeletingMessage(true);
      await apiService.delete(String(messageId));
      const res = state.messages.filter(
        (messages: MessageBodyType) => messages.id !== messageId
      );
      if (dispatch) dispatch(messengerActions.setMessages(res));
    } catch (error) {
      console.log("err", error);
    } finally {
      setDeletingMessage(false);
    }
  };

  const sortMessages = (messages: MessageBodyType[]) => {
    const data = messages || []
    const sortedMessages = data?.slice().sort(
      (a: MessageBodyType, b: MessageBodyType) => {
        var old = new Date(a.timestamp);
        var newDate = new Date(b.timestamp);
        if (old > newDate) return -1;
        if (old < newDate) return 1;
        return 0;
      }
    );

    if(dispatch) dispatch(messengerActions.setMessages(sortedMessages));
  };

  return {
    getMessages,
    sendMessage,
    deleteMessage,
    loadingMessages,
    deletingMessages,
    sortMessages
  };
}
