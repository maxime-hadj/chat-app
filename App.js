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
import { Ionicons } from '@expo/vector-icons';



//Navigations components
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


const AuthStack = createStackNavigator();
const PrivateStack = createStackNavigator();
const ChatroomStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UsersStack = createStackNavigator();

const AppStack = createBottomTabNavigator();

//Stack for the sign in/ signup
function AuthStackScreen() {
return (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);
}

//Stack for the PrivateChats Screen => Private chats list, private chat room, user profile
function PrivateStackScreen() {
  return(
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Discussions" component={PrivateChatsListScreen} options={{headerLeft: null}} />
      <PrivateStack.Screen name="Private Chat" component={PrivateChatScreen} options={{}} />
      <PrivateStack.Screen name="Profile" component={ProfileScreen} options={{ }} />
    </PrivateStack.Navigator>
  )
}

//Stack for the chatroom screen => chatrooms list, chatroom, chatroom users to add 
function ChatroomStackScreen() {
  return(
    <ChatroomStack.Navigator>
      <ChatroomStack.Screen name="Chatrooms List" component={ChatroomsListScreen} options={{headerLeft: null}}/>
      <ChatroomStack.Screen name="Chatroom" component={ChatroomScreen} options={{}} />
    </ChatroomStack.Navigator>
  )
}

//Stack for the user's profile navigation => profile, update profile, update
function UsersStackScreen() {
  return(
    <UsersStack.Navigator>
      <UsersStack.Screen name="Persons" component={UsersListScreen} options={{}} />
      <UsersStack.Screen name="Profile" component={ProfileScreen} options={{ }} />
      <PrivateStack.Screen name="Private Chat" component={PrivateChatScreen} options={{}} />
    </UsersStack.Navigator>
  )
}

//Stack for the user's profile navigation => profile, update profile, update
function ProfileStackScreen() {
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="My profile" component={ProfileScreen} options={{headerLeft: null}} />
      <ProfileStack.Screen name="Update infos" component={UpdateProfileScreen} options={{ }} />
    </ProfileStack.Navigator>
  )
}




function AppStackScreen() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;

      switch (route.name) {
        case "Private":
          iconName = focused ? "chatbubble-ellipses" : "chatbubbles-outline";
          break;
        case "Chatrooms":
          iconName = focused ? "people-circle" : "people-circle-outline";
          break;
        case "Users":
          iconName = focused ? "people" : "people-outline";
          break;
        case "Profile":
          iconName = focused ? "person-circle" : "person-circle-outline";
          break;
        default:
          iconName = "";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "orange",
    tabBarInactiveTintColor: "black",
    tabBarLabelStyle: {
      fontSize: 12,
    },
    tabBarStyle: {
      backgroundColor: "white",
    },
  });

  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen name="Private" component={PrivateStackScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Chatrooms" component={ChatroomStackScreen} options={{ headerShown: false}} />
      <AppStack.Screen name="Users" component={UsersStackScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false}} />
    </AppStack.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStackScreen}  options={{headerShown: false}} />
        <Stack.Screen name="App" component={AppStackScreen} options={{headerShown: false, headerLeft:null}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


