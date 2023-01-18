import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Profile screen
const ProfileScreen = (props) => {

  const logout = async (props) => {
    try {
        await AsyncStorage.removeItem('user_token');
        return true;
    }
    catch(exception) {
        return false;
    }
  }

  const usertoken = async (props) => {
      let userToken = await AsyncStorage.getItem('user_token');
      console.log(userToken)
  }
  
    
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
        <Button title='Logout' onPress={()=> logout()} />
        <Button title='usertoken' onPress={()=> usertoken()} />
    </View>
  )
};

export default ProfileScreen