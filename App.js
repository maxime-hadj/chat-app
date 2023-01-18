import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UsersListScreen from './screens/UsersListScreen'
import ChatroomScreen from './screens/ChatroomScreen'

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
      <Stack.Navigator>
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Users" component={UsersListScreen} />
            <Stack.Screen name='Chat' component={ChatroomScreen} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  )
}