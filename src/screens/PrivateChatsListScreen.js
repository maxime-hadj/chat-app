import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

//Ecran PrivateChatsListScreen => écran de la liste des conversations privées de l'utilisateur (comme sur Messenger)
// Quand on clique sur un des éléments, on est envoyé vers la conversation privée ( donc PrivateChatScreen)

const PrivateChatsListScreen = (props) => {
  const [discussions, setDiscussions] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')
  const [userFirstname, setUserFirstname] = useState('')

  useEffect(() => {
    getAllDiscussions();
    retrieveDarkMode().then(value => {
    setDarkMode(value)});
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   // retrieveDarkMode().then(value => {
  //   //   setDarkMode(value);
  //   // });
  // }, []);


  const getAllDiscussions = async () =>    {

    const userToken = await AsyncStorage.getItem('user_token');
    setToken(userToken)
    const decodedToken = jwt_decode(userToken)
    const userId = decodedToken.result.id_user
    setUserId (userId)
    setUserFirstname(decodedToken.result.firstname)

    
    const array = []
    const discussionsMess = []
    
    setLoading(true);

    fetch('http://192.168.0.12:3000/api/message', {
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

      setLoading(false);
      setDiscussions(discussionsMess);
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode ? 'black' : 'white',
    },
    discussionsContainer: {
      margin: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
    },
    userTo: {
      fontSize: 18,
    },
    DarkBtn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode ? 'black' : 'white',
    },
  });

  return (

    <View>
      <FlatList
        data={discussions}
        renderItem={({ item }) => (
          <View style={styles.discussionsContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Private Chat', {
                  id_user: item.id_user_to == userId ? item.id_user_from : item.id_user_to,
                  token: token
                });
              }}
            >
              <Text style={{fontWeight: 'bold'}}>
                {item.id_user_to == userId ? item.firstname_from + ' ' + item.lastname_from  + ' : ': item.firstname_to + ' ' + item.lastname_to + ' : '}
              </Text>
              <Text style={styles.userTo}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id_users_messages}
      />
          {/* <Button 
      title={darkMode ? 'Dark Mode On' : 'Dark Mode Off'} 
      onPress={() => {
        setDarkMode(!darkMode);

        saveDarkMode(!darkMode);
      }} 
      buttonStyle={{
        backgroundColor: darkMode ? 'green' : 'blue',
        borderRadius: 50,
        padding: 10,
      }}
    /> */}
      </View>

  );
};

export default PrivateChatsListScreen