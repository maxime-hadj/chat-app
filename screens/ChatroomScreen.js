import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatroomScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Salut bébé',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
  <GiftedChat
      messages={messages}
      // showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatroomScreen