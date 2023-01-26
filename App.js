import React from 'react'
import 'react-native-gesture-handler';
import ChatroomScreen from './src/screens/ChatroomScreen';
import ChatroomsListScreen from './src/screens/ChatroomsListScreen';
import PrivateChatsListScreen from './src/screens/PrivateChatsListScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UsersListScreen from './src/screens/UsersListScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';


//Navigations components
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Private Chats" component={PrivateChatsListScreen} options={{ tabBarLabel: 'Private Chat List' }} />
      <AppStack.Screen name="Private Chat" component={PrivateChatScreen} options={{ tabBarLabel: 'Private Chat' }} />
      <AppStack.Screen name="Chatrooms" component={ChatroomsListScreen} options={{ tabBarLabel: 'Chatrooms' }}  />
      <AppStack.Screen name="Chatroom" component={ChatroomScreen} options={{ tabBarLabel: 'Chatroom' }} />
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
      <AppStack.Screen name="Users" component={UsersListScreen} options={{ tabBarLabel: 'Persons' }} />
      <AppStack.Screen name="Update Profile" component={UpdateProfileScreen} options={{ tabBarLabel: 'Update Profile' }} />
    </AppStack.Navigator>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStackScreen} />
        <Stack.Screen name="App" component={AppStackScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


