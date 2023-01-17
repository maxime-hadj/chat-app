import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import UsersListScreen from './src/screens/UsersListScreen'
import Navigation from './src/components/Navigation'
import UserContext from './src/UserContext'

export default function App() {

  return (
    <>
      <Navigation/>
    </>
  )
}