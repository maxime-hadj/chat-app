import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import jwt_decode from "jwt-decode";

//Register screen
const RegisterScreen = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_validation, setPasswordValidation] = useState('');


  const register = () => {

    if(password != password_validation){
      alert.alert("Your passwords doesn't match.")
    } else {
      fetch('http://10.10.59.176:3000/api/users', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        })
      })
      .then(data => data.json())
      .then(data =>  { 
          if(data.error) {
            Alert.alert(data.error)
          } else if (data.success == 1) {
            Alert.alert(
              "Successfully registered",
              "Press OK to login",
              [
                { text: "OK", onPress: () =>{props.navigation.navigate('Login')} }
              ]
            )
          }
      })
    }
  }

 
  
  return (

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Input
        placeholder='Enter your First Name'
        label='First Name'
        leftIcon={{ type: 'material', name:'face'}}
        value={firstname}
        onChangeText={text => setFirstname(text)}
        id={firstname}
      /> 
      <Input
        placeholder='Enter your Last Name'
        label='Last Name'
        leftIcon={{ type: 'material', name:'face'}}
        value={lastname}
        onChangeText={text => setLastname(text)}
        id={lastname}
      />
      <Input
        placeholder='Enter your Email'
        label='Email'
        leftIcon={{ type: 'material', name:'email'}}
        value={email}
        onChangeText={text => setEmail(text)}
        id={email}
      /> 
      <Input
        placeholder='Enter your Password'
        label='Password'
        leftIcon={{ type: 'material', name:'lock'}}
        value={password}
        onChangeText={text => setPassword(text)}
        id={password}
        secureTextEntry
      />

      <Input
        placeholder='Confirm your Password'
        label='Password validation'
        leftIcon={{ type: 'material', name:'lock'}}
        value={password_validation}
        onChangeText={text => setPasswordValidation(text)}
        id={password_validation}
        secureTextEntry
      />
      
      <Button title='Register' onPress={()=> register()} />
        <Text onPress={()=>{props.navigation.navigate('Login')}} style={{ fontSize: 15 }}>
          Got an account ? Login here !
        </Text>
    </View>
  )
}


export default RegisterScreen