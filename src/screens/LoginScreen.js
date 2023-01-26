import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

//Screen to login
const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const login = async () => {

    fetch('http://10.10.63.34:3000/api/users/login', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(data => data.json())
    .then(data =>  { 
        if(data.error) {
          Alert.alert(data.error)
        } else if (data.success == 1) {
          const decodedToken = jwt_decode(data.token)
          AsyncStorage.setItem('user_token', data.token);
          props.navigation.navigate('App',{
            screen: 'Chatrooms',
            params: {
              token: data.token,
            },
          })
        }
      }
    ).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    input: {
      width: '80%',
      margin: 10,
      padding: 15,
      fontSize: 16,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      borderRadius: 5,
    },
    button: {
      margin: 10,
      padding: 15,
      backgroundColor: '#0064e1',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
      fontSize: 16,
    },
    registerText: {
      margin: 10,
      fontSize: 15,
      color: '#0064e1',
      textAlign: 'center',
    },
  });
    
  return (
<View style={styles.container} >
  <Input
    placeholder='Enter your Email'
    label='Email'
    leftIcon={{ type: 'material', name:'email'}}
    value={email}
    onChangeText={text => setEmail(text)}
    style={styles.input}
  /> 
  <Input
    placeholder='Enter your Password'
    label='Password'
    leftIcon={{ type: 'material', name:'lock'}}
    value={password}
    onChangeText={text => setPassword(text)}
    secureTextEntry
    style={styles.input}
  />
  
  <Button title='Sign In' onPress={()=> login()} style={styles.button} buttonStyle={styles.buttonText} />
    <Text onPress={()=>{props.navigation.navigate('Register')}} style={styles.registerText}>
      Not registered ? Sign up here !
    </Text>
</View>
  )
};

export default LoginScreen