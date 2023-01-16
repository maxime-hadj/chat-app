import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import BottomTabNavigator from '../navigators/TabNavigator';

//Screen with all the chats between the user and other people in private
const ChatsListScreen = ({ navigation }) => {
    
  return (
    <>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chats list</Text>    
    </View>
    <BottomTabNavigator/>
    </>
  )
};

export default ChatsListScreen