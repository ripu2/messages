import React, { useContext } from "react";

import { DefaultContext } from "messages/utils/types";
import { State } from "../messgingModule/types/types";

export const initialState: State = {
  messages: [],
  currentPage: 1,
  isAtEnd: false,
  currentPageMessages: [],
  paginationArray: []
}

const defaultVal: DefaultContext<State> = {
  state: initialState,
  dispatch: null
}

export const MessengerContext = React.createContext(defaultVal);

export function useMessengerContext() {
  return useContext(MessengerContext)
}