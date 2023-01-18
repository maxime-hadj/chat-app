import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

// Ecran ChatroomsListScreen => écran avec liste des channels
// Si on clique sur un channel, on est envoyé sur le channel en question 
// ( donc ChatroomScreen)

const ChatroomsListScreen = (props) => {
    
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chatroomlist</Text>
    </View>
  )
};

export default ChatroomsListScreen