import { CircularProgress, Typography } from '@mui/material'
/* eslint-disable react/no-unescaped-entities */
import { HeaderTypography, LoaderContainer, MessageListContainer, PaginationContainer, PaginationTypography, SubHeaderTypography } from './styles'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { messengerActions, useMessenger } from '../../hooks'

import { MessageBodyType } from '../../types/types'
import MessageCell from '../MessageCell'
import MessageInputBox from '../MessageInputBox'
import { useMessengerContext } from 'messages/modules/context'

function MessengerComponent() {
  const { state, dispatch } = useMessengerContext()
  const bottomEl = useRef<any>(null);

  const { getMessages, loadingMessages, sortMessages } = useMessenger(dispatch);

  const fetchMessages = useCallback(() => {
    getMessages()
  }, [getMessages])

  useEffect(() => {
    fetchMessages()
  }, [])

  const renderMessages = useMemo(() => {
    if (loadingMessages || !state.messages.length) return <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
    else {
      return state.currentPageMessages.map((messageData: MessageBodyType, index: number) => {
        return <React.Fragment key={index} >
          <MessageCell {...messageData} />
          <div ref={bottomEl}></div>
        </React.Fragment>
      })
    }
  }, [loadingMessages, state.currentPageMessages, state.messages.length])


  const changePageData = useCallback((pageNumber: number) => {
    if (dispatch) dispatch(messengerActions.setCurrentPageMessages(pageNumber))
    scrollToBottom()
  }, [dispatch])

  const renderPagination = useMemo(() => {
    return state.paginationArray.map((data: number, index: number) => {
      return <PaginationTypography key={index} onClick={() => { changePageData(data) }}>{data}</PaginationTypography>
    })
  }, [changePageData, state.paginationArray])

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <HeaderTypography>
        Chatter
      </HeaderTypography>
      <SubHeaderTypography>
        Type something in the box below, then hit "Post"
      </SubHeaderTypography>
      <button onClick={scrollToBottom} style={{ marginLeft: '8px' }}>
        Scroll to bottom
      </button>
      <MessageInputBox scrollToBottom={scrollToBottom} />
      <MessageListContainer>
        {
          renderMessages
        }
      </MessageListContainer>
      <PaginationContainer>
        {renderPagination}
      </PaginationContainer>
    </React.Fragment>
  )
}

export default React.memo(MessengerComponent)