import { ColumnFlex, HeaderTypography, MessageBodyTypography, ParentContainer, RowFlex } from './styles'
import React, { useCallback } from 'react'

import ChatIcon from '@mui/icons-material/Chat';
import { CircularProgress } from '@mui/material';
import { MessageBodyType } from '../../types/types'
import moment from 'moment';
import { useMessenger } from '../../hooks';
import { useMessengerContext } from 'messages/modules/context';

function MessageCell(props: MessageBodyType) {
  const { text, source, timestamp, id } = props;

  const {dispatch} = useMessengerContext();
  const {deleteMessage, deletingMessages} = useMessenger(dispatch)

  const onDeleteClick = useCallback(() => {
    if(!deletingMessages)deleteMessage(id)
  }, [deleteMessage, deletingMessages, id])

  return (
    <ParentContainer>
      <RowFlex>
        <ChatIcon />
        <ColumnFlex>
          <RowFlex>
            <HeaderTypography>
              ~{source} {'\t'} 
            </HeaderTypography>
            <HeaderTypography style={{color: 'gray'}}>
              - {moment(timestamp).format('LTS')}
            </HeaderTypography>
            {
              deletingMessages ? <CircularProgress size={20} style={{marginLeft: 10, marginTop: 5}} /> : <HeaderTypography style={{color: 'blue', textDecoration: 'underline'}} onClick={onDeleteClick}>
              Delete
            </HeaderTypography>
            }
          </RowFlex>
          <MessageBodyTypography>
            {text}
          </MessageBodyTypography>
        </ColumnFlex>
      </RowFlex>
    </ParentContainer>
  )
}

export default React.memo(MessageCell)