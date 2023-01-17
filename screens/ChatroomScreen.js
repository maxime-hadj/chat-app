import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatroomScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
 



  useEffect(() => {

    const fetchMessages = async () =>    {
      const userToken = await AsyncStorage.getItem('user_token');
      console.log(userToken)
  
        //Fetching the messages from the channel - faudra changer le param en dur avec les props
      fetch('http://10.10.43.219:3000/api/message/1', {
        method: 'GET',
        headers:{ Authorization: 'Bearer ' + userToken },
      })
      .then(response => response.json())
      .then(response =>{
          response.map((element, i) => {console.log(element)})
      })
      .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
      })
  
    }

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