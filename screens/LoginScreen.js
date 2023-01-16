import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import BottomTabNavigator from '../navigators/TabNavigator';
 

//Screen to login
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    // console.log('hello')
    fetch('http://10.10.3.96:3000/api/users/login', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(data => data.json())
    .then(data =>  { 
      console.log(data.success)
        if(data.error) {
          Alert.alert(data.error)
        } else if (data.success == 1) {
          {navigation.navigate('ChatsListScreen')}
        }
      }
    )
  }
    
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Input
        placeholder='Enter your Email'
        label='Email'
        leftIcon={{ type: 'material', name:'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
      /> 
      <Input
        placeholder='Enter your Password'
        label='Password'
        leftIcon={{ type: 'material', name:'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      
      <Button title='Sign In' onPress={()=> login()} />
        <Text onPress={()=>{navigation.navigate('Register')}} style={{ fontSize: 15 }}>
          Not registered ? Sign up here !
        </Text>
    </View>
  )
};

export default LoginScreen