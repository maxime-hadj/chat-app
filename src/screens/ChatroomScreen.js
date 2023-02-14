import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode";
import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://10.10.22.129:3000')

// Ecran ChatroomScreen => écran avec le contenu de conversation d'un channel 
// Si on clique sur le nom du channel qui sera en haut de la page, 
// on est envoyé vers la liste des participants du channel (ChatroomUsersScreen)

const ChatroomScreen = (props) => {

  useEffect(() => {
    retrieveDarkMode().then(value => {
      setDarkMode(value);
    });
  }, []);

  const apiMessage = 'http://10.10.22.129:3000/api/message/'

  const idChannel = props.route.params.id_channel
  const token = props.route.params.token
  const decodedToken = jwt_decode(token)
  const userId = decodedToken.result.id_user
  const userName = decodedToken.result.firstname + ' ' + decodedToken.result.lastname

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
            avatar: 'https://placeimg.com/140/140/any'
          },
        }))
      )
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  //Sending messages in database
  const sendMessagesInDb =  async(text) => {
    fetch('http://10.10.63.34:3000/api/message', {
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
          Alert.alert(data.error)
        } else if (data.success == 1) {
          socket.emit('message', {
            text: text,
            name: userName,
            id: '${socket.id}${Math.random()}',
            socketID: socket.id
          })
        }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }


  //Call fetching previous messages with layoutEffect
  useLayoutEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    getMessagesFromDb()
    retrieveDarkMode().then(value => {
      setDarkMode(value);
    });
  }, [socket, messages]);

  //Call sending messages in db and then messages from db to reload the discussion
  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user,} = messages[0]
    sendMessagesInDb(messages[0].text)
  }, []);
  
  const saveDarkMode = async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem('darkMode');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
              _id: userId,
              name: userName,
              avatar: 'https://placeimg.com/140/140/any'
          }}
      />
  );


}

export default ChatroomScreen