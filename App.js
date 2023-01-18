import 'react-native-gesture-handler';
import React, { Component } from 'react'
import ChatroomScreen from './src/screens/ChatroomScreen';
import ChatroomsListScreen from './src/screens/ChatroomsListScreen';
import ChatsListScreen from './src/screens/ChatsListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UsersListScreen from './src/screens/UsersListScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';
import {StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

//Navigations components
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons'
import Navigation from './src/components/Navigation';

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="PrivateChat" component={ChatroomsListScreen} options={{ tabBarLabel: 'Chat' }} />
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
      <AppStack.Screen name="Users" component={UsersListScreen} options={{ tabBarLabel: 'Users' }} />
    </AppStack.Navigator>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStackScreen} />
        <Stack.Screen name="App" component={AppStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



