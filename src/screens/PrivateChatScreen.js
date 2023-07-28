import React, { useState, useCallback, useLayoutEffect} from 'react';
import { View, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import jwt_decode from "jwt-decode";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';

import io from 'socket.io-client';
const socket = io.connect('http://192.168.1.8:3000')


// Ecran PrivateChatScreen => écran d'une conversation privée entre deux utilisateurs
// Quand on fait précédent, on est envoyé vers le PrivateChatsListScreen
// Si on clique sur le nom de l'utilisateur, on peut voir son profil (écran à créer)

const PrivateChatScreen = (props) => {

  const apiMessage = 'http://192.168.1.8:3000/api/message/private/'

  const towardUserId = props.route.params.id_user
  const token = props.route.params.token
  const decodedToken = jwt_decode(token)
  const userId = decodedToken.result.id_user

  const userName = decodedToken.result.firstname + ' ' + decodedToken.result.lastname
  const unknownAvatar = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg'
  const userAvatar = decodedToken.result.avatar && decodedToken.result.avatar.replace("localhost", "192.168.1.8") || unknownAvatar;
  



  let apiUrl 

  const [messages, setMessages] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  //Fetching previous messages
  const getMessagesFromDb = async () => {

    apiUrl = apiMessage + towardUserId

    fetch(apiUrl, { 
      method: 'GET', 
      headers:{ Authorization: 'Bearer ' + token },
    })
    .then(response => response.json())
    .then(response => {
      let array = response.data
      setMessages(
        array.map(data => 
          ({ 
          _id : data.id_message,
          createdAt: data.date,
          text: data.text,
          user: {
            _id: data.id_user_from,
            name: data.firstname + ' ' + data.lastname,
            avatar: data.avatar_from ? data.avatar_from.replace("localhost", "192.168.1.8") : unknownAvatar
          },
        })
        )
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
        text: text,
      })
    })
    .then(data => data.json())
    .then(data =>  { 
        console.log(data)
        if(data.error) {
          Alert.alert(data.error)
        } else if (data.succes == 1) {
          fetch('http://192.168.1.8:3000/api/message/private', {
            method:'POST',
            headers: { 'Authorization': 'Bearer ' + token,
                      'Content-Type': 'application/json'
                    },
            body: JSON.stringify({
              id_user_from: userId,
              id_user_to: towardUserId,
              id_message: data.data.insertId,
            })
          })
          .then(data => data.json())
          .then(data =>  { 
              if(data.error) {
                Alert.alert(data.error)
              } else if (data.succes == 1) {
                socket.emit('private message', createMessage(text));   
              }
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          }); 
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

  const avatarPressed = (id) => {
    props.navigation.navigate('Profile', {
      id_user: id
    });
  }


  const handlePrivateMessageResponse = useCallback((data) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, data));
  }, []);

  useLayoutEffect(() => {
    socket.on('privateMessageResponse', handlePrivateMessageResponse);
    getMessagesFromDb();

    return () => {
      socket.off('privateMessageResponse', handlePrivateMessageResponse);
    };
  }, [handlePrivateMessageResponse]);

 
  const onSend = useCallback((messages = []) => {
    const { text } = messages[0];
    sendMessagesInDb(text);

  }, []);


  const styles = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });
  

  return (
      <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: userId,
            name: userName,
            avatar: userAvatar,
          }}
          renderAvatar={props => {
            const id  = props.currentMessage.user._id;
            return (
              <TouchableOpacity onPress={() => avatarPressed(id)}>
              <Image
                style={styles.avatar}
                source={{ uri: props.currentMessage.user.avatar }}
              />
            </TouchableOpacity>
            )
          }}
      />
  );

};

export default PrivateChatScreen