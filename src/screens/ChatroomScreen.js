import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode";
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

import { nanoid } from 'nanoid/non-secure';
const socket = io.connect('http://192.168.1.8:3000')

// Ecran ChatroomScreen => écran avec le contenu de conversation d'un channel 
// Si on clique sur le nom du channel qui sera en haut de la page, 
// on est envoyé vers la liste des participants du channel (ChatroomUsersScreen)

const ChatroomScreen = (props) => {

  const apiMessage = 'http://192.168.1.8:3000/api/message/channel/'

  const idChannel = props.route.params.id_channel
  const token = props.route.params.token
  const decodedToken = jwt_decode(token)
  const userId = decodedToken.result.id_user
  const unknownAvatar = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg'
  const userName = decodedToken.result.firstname + ' ' + decodedToken.result.lastname
  const userAvatar = decodedToken.result.avatar && decodedToken.result.avatar.replace("localhost", "192.168.1.8") || unknownAvatar;

  let apiUrl 

  const [messages, setMessages] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  

  //Fetching previous messages
  const getMessagesFromDb = async () => {

    apiUrl = apiMessage + idChannel

    fetch(apiUrl, { 
      method: 'GET', 
      headers:{ Authorization: 'Bearer ' + token },
    })
    .then(response => response.json())
    .then(response => {

      let array = response.data
      setMessages(
        array.map(data => ({ 
          _id : data.id_message,
          createdAt: data.date,
          text: data.text,
          user: {
            _id: data.id_user,
            name: data.firstname + ' ' + data.lastname,
            avatar: data.avatar ? data.avatar.replace("localhost", "192.168.1.8") : unknownAvatar
            
          }
        }))
      )
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  //Sending messages in database
  const sendMessagesInDb =  async(text) => {
    fetch('http://192.168.1.8:3000/api/message', {
      method:'POST',
      headers: { 'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
      body: JSON.stringify({
        channel_id: idChannel,
        text: text,
      })
    })
    .then(data => data.json())
    .then(data =>  { 
        if(data.error) {
          alert(data.error)
        } else if (data.succes == 1) {
          console.log(data)
          socket.emit('private message', createMessage(text));
        }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }


  const createMessage = (text) => {
    const newMessage = {
      _id: nanoid(), 
      text: text,
      createdAt: new Date(), 
      user: {
        _id: userId,
        name: userName,
        avatar: userAvatar,
      },
    };
    return newMessage;
  };


  //Call sending messages in db and then messages from db to reload the discussion
  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user,} = messages[0]
    sendMessagesInDb(messages[0].text)
    getMessagesFromDb();
  }, []);
  
  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages((previousMessages) => GiftedChat.append(previousMessages, data)));
    getMessagesFromDb();
  
    return () => {
      socket.off('messageResponse');
    };
  }, []);

  return (
      <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
              _id: userId,
              name: userName,
              avatar: userAvatar
          }}
      />
  );


}

export default ChatroomScreen