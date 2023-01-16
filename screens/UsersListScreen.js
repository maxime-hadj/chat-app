import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

//Screen with all the users where the current user can select one to chat
const UsersListScreen =  async ({ navigation }) => {

  const value = await AsyncStorage.getItem('user_token');

  if (value !== null) {
    // We have data!!
    console.log(value);
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Users</Text>
    </View>
  )
};

export default UsersListScreen