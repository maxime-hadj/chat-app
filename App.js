import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
// import RegisterScreen from './screens/RegisterScreen'
import UsersListScreen from './screens/UsersListScreen'
import ChatroomScreen from './screens/ChatroomScreen'

const Stack = createStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Users" component={UsersListScreen} />
            <Stack.Screen name='Chat' component={ChatroomScreen} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  )
}