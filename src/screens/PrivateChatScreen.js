import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

// Ecran PrivateChatScreen => écran d'une conversation privée entre deux utilisateurs
// Quand on fait précédent, on est envoyé vers le PrivateChatsListScreen
// Si on clique sur le nom de l'utilisateur, on peut voir son profil (écran à créer)

const PrivateChatScreen = (props) => {


  console.log(props.route.params)
    
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Private Chat</Text>
    </View>
  )
};

export default PrivateChatScreen