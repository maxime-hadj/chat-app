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

  useEffect(() => {
      getAllChatrooms();
  }, []);

  const getAllChatrooms = async () =>    {

      const userToken = await AsyncStorage.getItem('user_token');
      setLoading(true);

      fetch('http://10.10.50.62:3000/api/channel', {
          method: 'GET',
          headers:{ Authorization: 'Bearer ' + userToken },
      })
      .then(response => response.json())
      .then(response =>{
          console.log(response.data)
          setChatrooms(response.data);
          setLoading(false);
      })
      .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
      })
  }

  if (loading) {
      return <Text>Loading...</Text>
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });

  return (
    <View >
      <FlatList
          data={chatrooms}
          renderItem={({ item }) => (
          <View>
              <Text 
                id={item.id_channel} 
                onPress={()=>{props.navigation.navigate('Chatroom',
                {
                  id_channel: item.id_channel
                }
                )}}>{item.channel_name}</Text>
          </View>
          )}
          keyExtractor={item => item.id}
      />
    </View>
  );

};

export default ChatroomsListScreen