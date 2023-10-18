import React, { useEffect } from 'react'
import { useMessenger, useMessengerReducer } from '../hooks'

import MessengerComponent from '../components/MessengerComponent'
import { MessengerContext } from 'messages/modules/context';
import { ParentContainer } from './styles';

function MessageScreen() {
  const [state, dispatch] = useMessengerReducer()

  return (
    <MessengerContext.Provider value={{state, dispatch}}>
    <ParentContainer>
      <MessengerComponent />
    </ParentContainer>
    </MessengerContext.Provider>
  )
}

export default MessageScreen