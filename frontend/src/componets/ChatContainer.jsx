import React, { useEffect } from 'react'
import { useChatStore } from '../store/UseChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
      } = useChatStore();

      useEffect(()=>{
        getMessages(selectedUser._id)
      },[selectedUser._id,getMessages])
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      

      <MessageInput/>
    </div>
  )
}

export default ChatContainer
