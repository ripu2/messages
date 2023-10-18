import { CustomButton, InputBox, RowFlex } from './styles'
import React, { useCallback, useState } from 'react'

import { useMessenger } from '../../hooks'
import { useMessengerContext } from 'messages/modules/context'

function MessageInputBox(props: {
  scrollToBottom: () => void
}) {
  const [message, setMessage] = useState<string>('')

  const {state, dispatch} = useMessengerContext()
  const {sendMessage, sortMessages} = useMessenger(dispatch)

  const onMessageChanges = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }, [])

  const postMessage = useCallback(() => {
    if(Boolean(message.length)) sendMessage({
      text: message
    }, () => {
      setMessage('')
    })
  }, [message, sendMessage])

  const sortMessagesHandler = useCallback(() => {
    sortMessages(state.messages)
    props.scrollToBottom()
  }, [props, sortMessages, state.messages])

  return (
    <RowFlex>
      <InputBox value={message} onChange={onMessageChanges} />
      <CustomButton variant="contained" onClick={postMessage} >Post!</CustomButton>
      <CustomButton variant="contained" style={{color: 'red'}} onClick={() => {
        alert('No API')
      }} >Delete All</CustomButton>
      <CustomButton variant="contained" onClick={sortMessagesHandler} >Sort</CustomButton>
    </RowFlex>
  )
}

export default MessageInputBox