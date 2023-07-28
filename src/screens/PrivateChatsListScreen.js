import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import io from 'socket.io-client';

const socket = io.connect('http://192.168.0.14:3000')

//Ecran PrivateChatsListScreen => écran de la liste des conversations privées de l'utilisateur (comme sur Messenger)
// Quand on clique sur un des éléments, on est envoyé vers la conversation privée ( donc PrivateChatScreen)

const PrivateChatsListScreen = (props) => {
  const [discussions, setDiscussions] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')
  const [userFirstname, setUserFirstname] = useState('')

  

  useLayoutEffect(() => {
    socket.on('privateMessageResponse', (data) => {
      console.log('private message received')
      getAllDiscussions();
    });
    getAllDiscussions();
  }, [socket]);

  const [darkMode, setDarkMode] = useState(false);

  
  const getAllDiscussions = async () =>    {

    const userToken = await AsyncStorage.getItem('user_token');
    setToken(userToken)
    const decodedToken = jwt_decode(userToken)
    const userId = decodedToken.result.id_user
    setUserId (userId)
    setUserFirstname(decodedToken.result.firstname)

    
    const array = []
    const discussionsMess = []
    const unknownAvatar = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg'
    
    setLoading(true);

    let api = 'http://192.168.0.14:3000/api/message/discussions/'
    const apiUrl = api + userId

    fetch(apiUrl, {
        method: 'GET',
        headers:{ Authorization: 'Bearer ' + userToken },
    })
    .then(response => response.json())
    .then(response =>{
       
      for (let i=0; i < response.data.length; i++) {
        array.push(response.data[i]) 
      } 
            
      for (let k=0; k < array.length; k++) {  

        for (let l = 0 ; l < response.data.length ; l ++)  {

          if ( 
              (array[k].id_user_from == response.data[l].id_user_from 
                && array[k].id_user_to == response.data[l].id_user_to
                && array[k].date <= response.data[l].date
                && array[k].id_users_messages < response.data[l].id_users_messages
              ) 

              || 

              (array[k].id_user_from == response.data[l].id_user_to
                && array[k].id_user_to == response.data[l].id_user_from
                && array[k].date <= response.data[l].date
                && array[k].id_users_messages < response.data[l].id_users_messages
              ) 
  
            ) {
              array[k] = "undefined"  
            } 
        }

      } 

      for ( let m = 0 ; m < array.length ; m ++) {
        if(array[m] != "undefined") {
          discussionsMess.push(array[m])
        }
      }

      const processedUsers = discussionsMess.map(user => {
        if (!user.avatar_from && !user.avatar_to) {
          return { 
            ...user,
            avatar_from:  unknownAvatar,
            avatar_to:unknownAvatar
          }
        } else if (!user.avatar_to) {
          return { 
            ...user,
            avatar_to: unknownAvatar,
            avatar_from: user.avatar_from.replace("localhost", "192.168.0.14")
          }    
        } else if (!user.avatar_from) {
          return { 
            ...user,
            avatar_from: unknownAvatar,
            avatar_to: user.avatar_to.replace("localhost", "192.168.0.14")
          }    
        } else {
          return { 
            ...user,
            avatar_from: user.avatar_from.replace("localhost", "192.168.0.14"),
            avatar_to: user.avatar_to.replace("localhost", "192.168.0.14")
          }
        }
      });

      setLoading(false);
      setDiscussions(processedUsers);
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    })
  }

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

  if (loading) {
      return <Text>Loading...</Text>
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    discussionsContainer: {
      flex: 1,
      flexDirection:'row',
      margin: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
    },
    userTo: {
      fontSize: 14,
      marginLeft: 20,
      paddingTop:'2%',
      fontWeight:'900',
      marginBottom: 4
    },
    userText: {
      flex:1,
      flexDirection:'column'
    },
    lastMess: {
      paddingLeft: 20,
      fontWeight:'400',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginColor: '#black',
    },
  });

  return (

    <View>
      <FlatList
        data={discussions}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.discussionsContainer}
            onPress={() => {
              props.navigation.navigate('Private Chat', {
                id_user: item.id_user_to == userId ? item.id_user_from : item.id_user_to,
                token: token
              });
            }}
          >
            <Image 
              style={styles.avatar}
              source={{uri: item.id_user_to == userId ? item.avatar_from : item.avatar_to }} 
            />
            <View style={styles.userText}>
              <Text style={styles.userTo}>
                {item.id_user_to == userId ? item.firstname_from + ' ' + item.lastname_from  + ' : ': item.firstname_to + ' ' + item.lastname_to + ' : '}
              </Text>
              <Text style={styles.lastMess}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id_users_messages}
      />
    </View>


  );
};

export default PrivateChatsListScreen