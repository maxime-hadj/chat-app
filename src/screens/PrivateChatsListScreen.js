import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from '../component/header';

//Ecran PrivateChatsListScreen => écran de la liste des conversations privées de l'utilisateur (comme sur Messenger)
// Quand on clique sur un des éléments, on est envoyé vers la conversation privée ( donc PrivateChatScreen)

const PrivateChatsListScreen = (props) => {


  return (
    <>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chats list</Text>    
    </View>
    </>
  )
};

export default PrivateChatsListScreen