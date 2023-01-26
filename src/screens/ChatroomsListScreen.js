import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ecran ChatroomsListScreen => écran avec liste des channels
// Si on clique sur un channel, on est envoyé sur le channel en question 
// ( donc ChatroomScreen)

const ChatroomsListScreen = (props) => {

  const [chatrooms, setChatrooms] = useState('');
  const [loading, setLoading] = useState(true);

  const userToken = props.route.params.token

  useEffect(() => {
      getAllChatrooms();
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    retrieveDarkMode().then(value => {
      setDarkMode(value);
    });
  }, []);

  const getAllChatrooms = async () =>    {

    setLoading(true);

    fetch('http://10.10.63.34:3000/api/channel', {
        method: 'GET',
        headers:{ Authorization: 'Bearer ' + userToken },
    })
    .then(response => response.json())
    .then(response =>{
        setChatrooms(response.data);
        setLoading(false);
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
    chatroomContainer: {
      margin: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#d3d3d3',
    },
    chatroomName: {
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
//<ScrollView>
<View>
  <FlatList
    data={chatrooms}
    renderItem={({ item }) => (
      <View style={styles.chatroomContainer}>
        <Text 
          style={styles.chatroomName}
          onPress={() => {
            props.navigation.navigate('Chatroom', {
              id_channel: item.id_channel,
              token: props.route.params.token
            });
          }}
        >
          {item.channel_name}
        </Text>
      </View>
    )}
    keyExtractor={item => item.id_channel}
  />
      <Button 
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
/>
  </View>
//</ScrollView>
  );

};

export default ChatroomsListScreen