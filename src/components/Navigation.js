import React from 'react';

//Navigations components
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, Dimensions} from 'react-native'

//Import screens

import ChatroomScreen from '../screens/ChatroomScreen';
import ChatroomsListScreen from '../screens/ChatroomsListScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UsersListScreen from '../screens/UsersListScreen';
import PrivateChatScreen from '../screens/PrivateChatScreen';


const Stack = createStackNavigator()

function RegisterStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

function LoginStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    )
}


function ProfileStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}


function ChatsroomsStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Chatrooms list" component={ChatroomsListScreen}/>
            <Stack.Screen name="Chatroom" component={ChatroomScreen} />
        </Stack.Navigator>
    )
}

function ChatsListStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Discussions" component={ChatsListScreen}/>
            <Stack.Screen name="Discussion" component={PrivateChatScreen}/>
        </Stack.Navigator>
    )
}

function UsersListStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Users List" component={UsersListScreen}/>
            <Stack.Screen name="Discussion" component={PrivateChatScreen}/>
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator()

export default function Navigation(props)  {

    const userToken = AsyncStorage.getItem('user_token');

    console.log('user')
    console.log(userToken)

    if (userToken._A == null) {
        return  (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return(
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        headerTitle:() =><Text>Header</Text>,
                        tabBarIcon: ({focused, color, size, padding}) => {
                            let iconName;
                            if(route.name === 'Private discussions') {
                                iconName = 'comment-discussion'
                            } else if (route.name === 'Persons') {
                                iconName = 'person'
                            } else if (route.name === 'Chatroom') {
                                iconName = 'persons'
                            } else if (route.name === 'Profile') {
                                iconName = 'profile'
                            }

                            return (
                                <Icon 
                                    name={iconName} 
                                    size={size} 
                                    color={color} 
                                    style={{paddingBottom: padding}} 
                                />
                            )
                        }
                    })}
                    
                    tabBarOptions ={{
                        activeTintColor: 'lightseagreen',
                        inactiveTintColor: 'grey',
                        labelStyle: {fontSize:16},
                        // style:{width: fullScreenWidth},
                    }}
                >
                    <Tab.Screen name="Private discussions" component={ChatsListStackScreen} />
                    <Tab.Screen name="Persons" component={UsersListStackScreen} />
                    <Tab.Screen name="Chatrooms" component={ChatsroomsStackScreen} />
                    <Tab.Screen name="Profile" component={ProfileStackScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )

    }
}


