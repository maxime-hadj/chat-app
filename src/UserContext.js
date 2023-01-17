 
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = React.createContext({
    userData:null,
})

export default UserContext